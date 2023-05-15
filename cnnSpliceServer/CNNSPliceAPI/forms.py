from django import forms
from .models import DonorAcceptor


class UserInputForm(forms.ModelForm):
    class Meta:
        model = DonorAcceptor
        fields = ['fasta', 'email', 'model', 'file']

    def __init__(self, *args, **kwargs):
        super(UserInputForm, self).__init__(*args, **kwargs)
        self.fields['fasta'].widget.attrs.update({
            'id': 'fasta',
            'name': 'fasta'
        })
        self.fields['email'].widget.attrs.update({
            'id': 'email',
            'name': 'email'
        })
        self.fields['model'].widget.attrs.update({
            'id': 'model',
            'name': 'model'
        })
        self.fields['file'].widget.attrs.update({'id': 'file', 'name': 'file'})