# Generated by Django 4.2.1 on 2023-05-14 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_id', models.CharField(max_length=200)),
                ('email', models.CharField(max_length=200)),
                ('model_name', models.CharField(max_length=100)),
                ('data_path', models.CharField(max_length=200)),
                ('job_status', models.CharField(max_length=20)),
            ],
        ),
    ]
