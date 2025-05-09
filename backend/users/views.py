from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth as firebase_auth
from .serializers import FirebaseRegisterSerializer, ProfileUpdateSerializer
from .models import CustomUser
from django.utils.timezone import now
from django.views.decorators.csrf import csrf_exempt
from cloudinary.uploader import upload

# Create your views here.
@csrf_exempt
@api_view(['POST'])
def register_user(request):
    try:
        id_token = request.data.get('token')

        if not id_token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        decoded_token = firebase_auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        email = decoded_token['email']
        username = request.data.get('username', f"user_{uid[:6]}")
        picture = decoded_token.get('picture', None)

        if CustomUser.objects.filter(firebase_uid=uid).exists():
            return Response({'error': 'User already exists'}, status=status.HTTP_409_CONFLICT)
        

        data = {
            'username': username,
            'email': email,
            'firebase_uid': uid,
            'profile_image': picture,
            'bio': request.data.get('bio', ''),
            'location': request.data.get('location', ''),
        }
        serializer = FirebaseRegisterSerializer(data=data)

        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'User registered successfully',
                'user': FirebaseRegisterSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def login_user(request):
    try:
        id_token = request.data.get('token')

        if not id_token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        decoded_token = firebase_auth.verify_id_token(id_token=id_token)
        print(decoded_token)
        uid = decoded_token['uid']
        email = decoded_token.get('email')
        username = decoded_token.get('displayName', f"user_{uid[:6]}")
        picture = decoded_token.get('picture', None)

        try:
            user = CustomUser.objects.get(email=email)
            # Update Firebase UID if needed (optional)
            if user.firebase_uid != uid:
                user.firebase_uid = uid
                user.save(update_fields=['firebase_uid'])

        except CustomUser.DoesNotExist:
            # Create user only if email is truly new
            user = CustomUser.objects.create(
                firebase_uid=uid,
                email=email,
                username=username,
                profile_image=picture,
            )

        user.last_login = now()
        user.save(update_fields=['last_login'])

        return Response({
            'message': 'Login successful',
            'user': FirebaseRegisterSerializer(user).data
        }, status=status.HTTP_200_OK)
    
    except firebase_auth.ExpiredIdTokenError:
        return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
    
    except firebase_auth.InvalidIdTokenError:
        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@csrf_exempt
@api_view(['GET'])
def get_current_user(request):
    try:
        userId = request.firebase_user.get('uid')

        user = CustomUser.objects.get(firebase_uid = userId)
        serializer = FirebaseRegisterSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['PUT'])
def update_profile(request):
    try:
        userId = request.firebase_user.get('uid')
        user = CustomUser.objects.get(firebase_uid = userId)

        data = request.data.copy()


        print(request.FILES)

        if 'profile_picture' in request.FILES:
            uploaded_file = request.FILES['profile_picture']

            upload_result = upload(
                uploaded_file,
                folder='profile_pictures',
                use_filename=True,
                unique_filename=False,
                overwrite=True,
            )

            data['profile_image'] = upload_result['secure_url']

        serializer = ProfileUpdateSerializer(user, data = data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)