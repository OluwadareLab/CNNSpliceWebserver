# Generated by Django 4.2 on 2023-05-05 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("CNNSPliceAPI", "0012_alter_donoracceptor_file"),
    ]

    operations = [
        migrations.AlterField(
            model_name="donoracceptor",
            name="file",
            field=models.FileField(
                blank=True,
                default=None,
                null=True,
                upload_to="static/data/SIDFYBDVACTE",
            ),
        ),
    ]
