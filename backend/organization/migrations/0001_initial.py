# Generated by Django 4.1.5 on 2023-01-06 15:15

from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CommonInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, verbose_name='First and last name or company name')),
                ('privacy_notice', models.CharField(max_length=1000, verbose_name='Privacy notice')),
                ('conditions_of_use', models.CharField(max_length=1000, verbose_name='Conditions of use')),
                ('country', models.CharField(max_length=50, verbose_name='Country')),
                ('city', models.CharField(max_length=50, verbose_name='City')),
                ('post_index', models.CharField(max_length=20, verbose_name='Post index')),
                ('address', models.CharField(max_length=100, verbose_name='Address')),
                ('google_link', models.CharField(max_length=300, verbose_name='Embedded link from google maps')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SocialMedia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('social_media_main', models.BooleanField(default=False, verbose_name='Main social media')),
                ('social_media_active', models.BooleanField(default=False, verbose_name='Active social media')),
                ('social_media_title', models.CharField(max_length=200, verbose_name='Social media title')),
                ('social_media_url', models.CharField(max_length=100, verbose_name='Social media URL')),
                ('social_media_picture', models.FileField(upload_to='', verbose_name='Social media picture')),
                ('social_media_alt', models.CharField(max_length=50, verbose_name='Alternative name for social media picture')),
                ('my_order', models.PositiveIntegerField(default=0)),
                ('common', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='socialmedia_set', to='organization.commoninfo')),
            ],
            options={
                'ordering': ['my_order'],
            },
        ),
        migrations.CreateModel(
            name='Phone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_main', models.BooleanField(default=False, verbose_name='Main phone')),
                ('phone_active', models.BooleanField(default=False, verbose_name='Active phone')),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None, unique=True, verbose_name='Phone number')),
                ('my_order', models.PositiveIntegerField(default=0)),
                ('common', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='phone_set', to='organization.commoninfo')),
            ],
            options={
                'ordering': ['my_order'],
            },
        ),
        migrations.CreateModel(
            name='Email',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email_main', models.BooleanField(default=False, verbose_name='Main email')),
                ('email_active', models.BooleanField(default=False, verbose_name='Active mail')),
                ('email_address', models.EmailField(max_length=254, unique=True, verbose_name='Mail address')),
                ('my_order', models.PositiveIntegerField(default=0)),
                ('common', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='email_set', to='organization.commoninfo')),
            ],
            options={
                'ordering': ['my_order'],
            },
        ),
    ]