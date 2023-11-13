from django.contrib.auth import password_validation
from django.utils.translation import gettext_lazy as _

from rest_framework import serializers
from .models import CustomUser
from django.core.validators import RegexValidator
from django.core.validators import EmailValidator

alpha = RegexValidator(r'^[a-zA-Z. ]*$', 'Only Alphabet Letters are allowed!')

#User serializer also contains its fields for its profile
class CustomUserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(required=True, validators=[alpha])
    last_name = serializers.CharField(required=True, validators=[alpha])
    email = serializers.EmailField(validators=[EmailValidator(message="Enter a valid email address.")], required=True)
    password = serializers.CharField(required=True, write_only=True)
    avatar = serializers.ImageField(required=False, default='defaultAvatar.png')

    class Meta:
        model = CustomUser
        fields = {
            'first_name',
            'last_name',
            'email',
            'password',
            'avatar',
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': "Password Fields don't match!"})
        if len(attrs['password']) < 8 and len(attrs['password2']) < 8:
            raise serializers.ValidationError(_('Password should be 8 characters or more.'))
        return attrs
    
    def create(self, validated_data):
        user = CustomUser.objects.create(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name=validated_data['last_name'],
            avatar=validated_data['avatar'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

#Serializer for Updating User
class UpdateProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False, validators=[alpha])
    last_name = serializers.CharField(required=False, validators=[alpha])
    avatar = serializers.ImageField(required=False, default='defaultAvatar.png')

    class Meta:
        model = CustomUser
        fields = (
            'first_name',
            'last_name',
            'avatar',
        )
    
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        return super(UpdateProfileSerializer, self).__init__(*args, **kwargs)

    def update_user(self, instance, validated_data):
        # import pdb; pdb.set_trace()
        user = self.request.user

        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": "Unauthorized Access."})
        
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.avatar = validated_data['avatar']

        instance.save()

        return instance


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=128, write_only=True, required=True)
    new_password1 = serializers.CharField(max_length=128, write_only=True, required=True)
    new_password2 = serializers.CharField(max_length=128, write_only=True, required=True)

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super().__init__(*args, **kwargs)

    def validate_old_password(self, value):
        user = self.request.user
        if not user.check_password(value):
            raise serializers.ValidationError(_('Old password entered was incorrect.'))
        return value

    def validate(self, attrs):
        if attrs['new_password1'] != attrs['new_password2']:
            raise serializers.ValidationError({'new_password2': _("The two new password fields didn't match.")})

        if len(attrs['new_password1']) < 8 and len(attrs['new_password2']) < 8:
            raise serializers.ValidationError(_('Password should be 8 characters or more.'))

        password_validation.validate_password(attrs['new_password1'], self.request.user)

        return attrs

    def save(self):
        user = self.request.user
        password = self.validated_data['new_password1']
        user.set_password(password)
        user.save()

        return user


class SellerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'id',
            'first_name',
            'last_name',
            'avatar',
        )