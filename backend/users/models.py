from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, firebase_uid, email, username, **extra_fields):
        if not firebase_uid:
            raise ValueError('The Firebase UID must be set')
        if not email:
            raise ValueError('The Email must be set')
        
        email = self.normalize_email(email)

        user = self.model(
            firebase_uid = firebase_uid,
            email = email,
            username = username,
            **extra_fields
        )

        user.save(using = self._db)
        return user
    
    def create_superuser(self, firebase_uid, email, username, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(firebase_uid, email, username, **extra_fields)
    
class CustomUser(AbstractBaseUser, PermissionsMixin):
    firebase_uid = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, unique=True)

    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)

    date_of_birth = models.DateField(blank=True, null=True)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    @property
    def age(self):
        if self.date_of_birth:
            return timezone.now().year - self.date_of_birth.year
        return None
    
    major = models.CharField(max_length=50, blank=True)
    year = models.CharField(max_length=10, blank=True)

    phone_number = models.CharField(max_length=15, blank=True)

    bio = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    profile_image = models.URLField(blank=True, null=True)

    interests = models.TextField(blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'firebase_uid'
    REQUIRED_FIELDS = ['email', 'username']

    def __str__(self):
        return self.username

class RecentActivity(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='recent_activities')
    activity_type = models.CharField(max_length=50)  # e.g., 'login', 'profile_update', etc.
    timestamp = models.DateTimeField(auto_now_add=True)

    @property
    def time_ago(self):
        return timezone.now() - self.timestamp

    def __str__(self):
        return f"{self.user.username} - {self.activity_type} - {self.timestamp}"