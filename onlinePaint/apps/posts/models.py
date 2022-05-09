from django.db import models
from django.utils import timezone

class Post(models.Model):
	title = models.CharField("Заголовок", max_length = 300)
	text = models.TextField("Текст")
	image = models.ImageField(upload_to = "images/", default='', blank=True)
	pub_date = models.DateTimeField("Дата публикации", default = timezone.now())

	def __str__(self):
		return self.title

	class Meta:
		verbose_name = "Пост"
		verbose_name_plural = "Посты"