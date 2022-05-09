from django.shortcuts import render
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .models import Post

def home(request):
	return render(request, 'posts/home.html');

def paint(request):
	return render(request, 'posts/paint.html');

def post_list(request):
	latest_posts = Post.objects.order_by('-pub_date')

	page = request.GET.get('page', 1)

	paginator = Paginator(latest_posts, 10)
	try:
		posts = paginator.page(page)
	except PageNotAnInteger:
		posts = paginator.page(1)
	except EmptyPage:
		posts = paginator.page(paginator.num_pages)	

	return render(request, 'posts/post_list.html', {'latest_posts': latest_posts, 'posts': posts});


def post_detail(request, post_id):
	try:
		post = Post.objects.get(id = post_id)
	except:
		raise Http404("Пост не найден")

	return render(request, 'posts/post_detail.html', {'post': post});
