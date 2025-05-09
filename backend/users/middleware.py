from firebase_admin import auth as firebase_auth
from django.http import JsonResponse

class FirebaseAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        id_token = request.headers.get('Authorization')
        if id_token:
            try:
                token = id_token.split(' ')[1]
                decoded_token = firebase_auth.verify_id_token(token)
                request.firebase_user = decoded_token
            except Exception as e:
                return JsonResponse({'error': 'Invalid token', 'exception': str(e)}, status=401)
        else:
            request.firebase_user = None

        return self.get_response(request)
