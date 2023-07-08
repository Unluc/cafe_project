import os
from django.core.files.storage import default_storage
from django.db.models import FileField

from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver


def post_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.preview.delete(save=False)
    except:
        pass

def pre_save_image(sender, instance, *args, **kwargs):
    """ instance old image file will delete from os """
    try:
        old_img = instance.__class__.objects.get(id=instance.id).preview.path
        try:
            new_img = instance.preview.path
        except:
            new_img = None
        if new_img != old_img:
            import os
            if os.path.exists(old_img):
                os.remove(old_img)
    except:
        pass