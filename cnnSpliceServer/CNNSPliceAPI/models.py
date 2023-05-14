from django.db import models
from picklefield.fields import PickledObjectField
import random
from string import ascii_uppercase


def gen_rand():
    return (''.join(random.choice(ascii_uppercase) for i in range(12)))


# Create your models here.
class DonorAcceptor(models.Model):
    fasta = models.CharField(max_length=800,
                             default=None,
                             blank=True,
                             null=True)
    email = models.EmailField(max_length=50, null=True)
    model = models.CharField(max_length=800,
                             default=None,
                             blank=True,
                             null=True)
    # global data_path
    data_path = gen_rand()

    file = models.FileField(upload_to=f'static/data/{data_path}',
                            null=True,
                            default=None,
                            blank=True)

    def __str__(self):
        return 'Dataset' + str(self.data_path) + str(self.email)