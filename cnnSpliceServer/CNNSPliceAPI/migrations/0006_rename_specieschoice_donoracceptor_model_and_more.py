# Generated by Django 4.2 on 2023-05-03 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("CNNSPliceAPI", "0005_alter_donoracceptor_email_alter_donoracceptor_file"),
    ]

    operations = [
        migrations.RenameField(
            model_name="donoracceptor", old_name="speciesChoice", new_name="model",
        ),
        migrations.AlterField(
            model_name="donoracceptor",
            name="file",
            field=models.FileField(
                blank=True,
                default=None,
                null=True,
                upload_to="static/data/YNKQNGVFFYPV",
            ),
        ),
    ]
