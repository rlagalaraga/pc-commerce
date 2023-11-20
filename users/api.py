from django.shortcuts import render
from rest_framework import viewsets, response, exceptions, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from core.custom_permissions import IsAuthenticatedAndOwner
from rest_framework.authentication import SessionAuthentication 

from users.models import CustomUser
from users.serializers import *
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import login, logout, authenticate

class UsersViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    #Gets all user from database
    def get_all_users(self, request, *args, **kwargs):
        user = CustomUser.objects.all()
        serializer = SellerListSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    #Registers a user
    def register_user(self, request, *args, **kwargs):
        serializer = CustomUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)

        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    #login user
    def user_login(self, request, *args, **kwargs):
        # import pdb; pdb.set_trace()
        email = request.data.get('email')
        password = request.data.get('password')

        
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            login(request, user)
            print("Logged In Successfuly")
            return Response(status = status.HTTP_200_OK)

        else:
            return Response(status = status.HTTP_400_BAD_REQUEST)
        
    #Get specific user and its data
    def get_user_by_id(self, request, user_id, *args, **kwargs):
        user_instance = CustomUser.objects.get(id=user_id)
        if not user_instance:
            return Response(
                {"res": "Object with user id does not exist!"},
                status = status.HTTP_400_BAD_REQUEST
            )
        serializer = CustomUserSerializer(user_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    #logout user
    def user_logout(self, request, *args, **kwargs):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class LoggedUserViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticatedAndOwner]
    authentication_classes = [SessionAuthentication]

    def get_user(self,request):
        serializer = CustomUserSerializer(request.user)
        response_data = {'user': serializer.data}
        return Response(response_data, status=status.HTTP_200_OK)

    # change password
    def change_pass(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data = self.request.data, request = request)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            user = serializer.save()
            return Response(status=status.HTTP_200_OK)

    def update_profile(self, request, pk=None , *args, **kwargs):
        user = self.request.user
        serializer = UpdateProfileSerializer(data = self.request.data, request = self.request, instance = user, partial=True)
        if self.request.user.id == self.kwargs.get('user_id'):
            if serializer.is_valid():
                user = serializer.save()
                return Response(status=status.HTTP_200_OK)      
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)