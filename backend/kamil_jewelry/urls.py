from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def test_view(request):
    return JsonResponse({'message': 'Django работает!'})

urlpatterns = [
    path('test/', test_view, name='test'),
    path('admin/', admin.site.urls),
    path('api/', include('products.urls')),
    path('api/', include('orders.urls')),
    path('api/', include('users.urls')),
    path('api/', include('blog.urls')),
    path('api/content/', include('content.urls')),
]

# Раздача медиа файлов (всегда)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Раздача статических файлов (всегда)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
