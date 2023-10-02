from rest_framework import permissions

class IsAuthenticatedAndOwner(permissions.BasePermission):
    """
    Custom permission class to allow only the owner of an object to access it.
    """
    def has_object_permission(self, request, view, obj):
        # Check if the user is authenticated and is the owner of the object.
        return request.user.is_authenticated and obj.owner == request.user