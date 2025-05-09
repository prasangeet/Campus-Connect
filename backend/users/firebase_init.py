import os
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv

load_dotenv()

def initialize_firebase():

    # debugging the env

#     print("FIREBASE_TYPE:", os.getenv("FIREBASE_TYPE"))
#     print("FIREBASE_PROJECT_ID:", os.getenv("FIREBASE_PROJECT_ID"))
#     print("FIREBASE_PRIVATE_KEY_ID:", os.getenv("FIREBASE_PRIVATE_KEY_ID"))
#     print("FIREBASE_PRIVATE_KEY:", os.getenv("FIREBASE_PRIVATE_KEY"))
#     print("FIREBASE_CLIENT_EMAIL:", os.getenv("FIREBASE_CLIENT_EMAIL"))
#     print("FIREBASE_CLIENT_ID:", os.getenv("FIREBASE_CLIENT_ID"))
#     print("FIREBASE_AUTH_URI:", os.getenv("FIREBASE_AUTH_URI"))
#     print("FIREBASE_TOKEN_URI:", os
# .getenv("FIREBASE_TOKEN_URI"))
#     print("FIREBASE_AUTH_PROVIDER:", os.getenv("FIREBASE_AUTH_PROVIDER"))
#     print("FIREBASE_CLIENT:", os.getenv("FIREBASE_CLIENT"))

    if not firebase_admin._apps:
        cred = credentials.Certificate({
            "type": os.getenv("FIREBASE_TYPE", "service_account"),
            "project_id": os.getenv("FIREBASE_PROJECT_ID"),
            "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
            "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace("\\n", "\n"),
            "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
            "client_id": os.getenv("FIREBASE_CLIENT_ID"),
            "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
            "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
            "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER"),
            "client_x509_cert_url": os.getenv("FIREBASE_CLIENT"),
            "universe_domain": os.getenv("FIREBASE_UNIVERSE_DOMAIN")
        })

        firebase_admin.initialize_app(cred)
