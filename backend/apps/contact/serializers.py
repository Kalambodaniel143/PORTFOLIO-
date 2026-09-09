from rest_framework import serializers

from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "message"]

    def validate_name(self, value: str) -> str:
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Please enter your name.")
        return value

    def validate_message(self, value: str) -> str:
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError(
                "Your message is a little short — tell me a bit more."
            )
        return value
