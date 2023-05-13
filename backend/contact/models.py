from django.db import models


class Contact(models.Model):
    """
        Model for contact us page
    """
    name = models.CharField(max_length=50, unique=False, verbose_name="User name")
    email = models.EmailField('Email address')
    message = models.TextField(max_length=500, verbose_name="Message")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creating date of contacts')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Updating date of contacts')

    def __str__(self):
        short_message = self.message[0:25]
        return f"{self.name}, {self.email}, {short_message}" 


# Create your models here.
