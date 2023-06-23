import os
from django.core.files.storage import default_storage
from django.db.models import FileField

from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver

# def file_cleanup(sender, **kwargs):
#     """
#     File cleanup callback used to emulate the old delete
#     behavior using signals. Initially django deleted linked
#     files when an object containing a File/ImageField was deleted.

#     Usage:
#     >>> from django.db.models.signals import post_delete
#     >>> post_delete.connect(file_cleanup, sender=MyModel, dispatch_uid="mymodel.file_cleanup")
#     """
#     for fieldname in sender._meta.get_all_field_names():
#         try:
#             field = sender._meta.get_field(fieldname)
#         except:
#             field = None

#     if field and isinstance(field, FileField):
#         inst = kwargs["instance"]
#         f = getattr(inst, fieldname)
#         m = inst.__class__._default_manager
#         if (
#             hasattr(f, "path")
#             and os.path.exists(f.path)
#             and not m.filter(
#                 **{"%s__exact" % fieldname: getattr(inst, fieldname)}
#             ).exclude(pk=inst._get_pk_val())
#         ):
#             try:
#                 default_storage.delete(f.path)
#             except:
#                 pass

# @receiver(post_delete, sender=sender)
def post_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.preview.delete(save=False)
    except:
        pass

# @receiver(pre_save, sender=sender)
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