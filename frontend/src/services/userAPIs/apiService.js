import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const register = async (data) => {
  try {
    const toastId = toast.loading("Creating your account...");

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    await updateProfile(userCredential.user, {
      displayName: data.username,
    });

    const user = userCredential.user;
    const id_token = await user.getIdToken();

    await sendEmailVerification(user);

    const response = await axios.post(`${BASE_URL}/users/register/`, {
      token: id_token,
      username: data.username,
      bio: data.bio || "",
      location: data.location || "",
    });

    toast.success("Registration successful!", { id: toastId });
    return response.data;
  } catch (error) {
    toast.error("Registration failed. Please try again.");
    console.error("Error registering user:", error);
    return null;
  }
};

export const login = async (data) => {
  const toastId = toast.loading("Logging in...");

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;
    const id_token = await user.getIdToken();

    const response = await axios.post(`${BASE_URL}/users/login/`, {
      token: id_token,
    });

    toast.success("Login successful!", { id: toastId });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Login failed. Please check your credentials.", {
      id: toastId,
    });
    throw error;
  }
};

export const logout = async () => {
  const toastId = toast.loading("Logging out...");

  try {
    await auth.signOut();
    toast.success("Logout successful!", { id: toastId });
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Logout failed. Please try again.", { id: toastId });
  }
};

export const checkVerification = async () => {
  try {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user?.emailVerified) {
        return true;
      } else if (user && !user?.emailVerified) {
        return false;
      }
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error checking email verification:", error);
    return false;
  }
};

const waitForUser = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) resolve(user);
      else reject(new Error("No authenticated user"));
    });
  });

export const getCurrentUser = async () => {
  try {
    const user = await waitForUser();
    const idToken = await user.getIdToken();

    const response = await axios.get(`${BASE_URL}/users/me/`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    console.log("User data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const updateUser = async (data) => {
  const toastId = toast.loading("Saving User Data...");

  try {
    const user = await waitForUser();
    const id_token = await user.getIdToken();

    const response = await axios.put(
      `${BASE_URL}/users/update_profile/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response) {
      toast.success("Successfully updated user details", { id: toastId });
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error Updating the data", error);
    toast.error("Error updating the user details", { id: toastId });
  }
};
