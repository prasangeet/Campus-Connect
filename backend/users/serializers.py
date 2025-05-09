from rest_framework import serializers
from .models import CustomUser

class FirebaseRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'profile_image', 'firebase_uid', 'bio', 'location', 'phone_number', 'date_of_birth',
                   'first_name', 'last_name', 'full_name', 'age', 'major', 'year', 'is_active', 'is_staff', 'date_joined',
                     'last_login', 'interests']

    def create(self, validated_data):
        # During creation, validated_data already contains all necessary fields (including firebase_uid, email, etc.)
        return CustomUser.objects.create(**validated_data)

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'profile_image', 'bio', 'location', 'phone_number', 'date_of_birth', 'first_name', 'last_name', 'major', 'year', 'interests']

    def update(self, instance, validated_data):
        # Update the user instance with the provided data
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance