from django.urls import path

from . import views

app_name = 'posts'
urlpatterns = [
	path('', views.home, name="home"),
	path('/paint', views.paint, name="paint"),
	path('/post_list', views.post_list, name="post_list"),
	path('/post_list/<int:post_id>', views.post_detail, name="post_detail")
]