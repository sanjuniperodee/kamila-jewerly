import django_filters
from .models import Product, Category


class ProductFilter(django_filters.FilterSet):
    category = django_filters.ModelChoiceFilter(queryset=Category.objects.filter(is_active=True))
    product_type = django_filters.ChoiceFilter(choices=Product.PRODUCT_TYPES)
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr='lte')
    is_featured = django_filters.BooleanFilter()
    is_new = django_filters.BooleanFilter()
    
    class Meta:
        model = Product
        fields = ['category', 'product_type', 'price_min', 'price_max', 'is_featured', 'is_new']
