from rest_framework import serializers
from rest_framework import DonorAcceptor


class donorAcceptorSerializers(serializers.ModelSerializers):
    class Meta:
        model = DonorAcceptor
        fields = '__all__'
