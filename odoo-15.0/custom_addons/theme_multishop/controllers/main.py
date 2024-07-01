from odoo import models, fields
from odoo import http
from odoo.http import request


# Categories Products
# class CategoriesViews(http.Controller):
#     @http.route('/categories', type='json', auth="public", website=True)
#     def products_list(self, **kw):
#         categories = request.env['product.public.category'].sudo().search([('parent_id', '=', False)])
#         base_url = request.env['ir.config_parameter'].sudo().get_param('web.base.url')
#         category_data = []
#         for category in categories[:12]:
#             product_count = request.env['product.template'].sudo().search_count(
#                 [('public_categ_ids', 'child_of', category.id)])
#             category_data.append({
#                 'id': category.id,
#                 'name': category.name,
#                 'image_url': f"{base_url}/web/image/product.public.category/{category.id}/image_1920",
#                 'product_count': product_count,
#             })
#         return category_data


class FeaturedProduct(http.Controller):
    @http.route('/featured', type='json', auth="public", website=True)
    def get_featured_products(self):
        featured_product = request.env['featured.products'].sudo().search([], order='id desc', limit=8)
        featured_product_data = []
        for rec in featured_product.featured_products_ids[:8]:
            featured_product_data.append({
                'id': rec.id,
                'categ_id': rec.categ_id.name,
                'name': rec.name,
                'rating_avg': rec.rating_avg,
                'list_price': rec.list_price,
            })
        return featured_product_data


# Recent Products
class RecentProduct(http.Controller):
    @http.route('/recent', type='json', auth="public", website=True)
    def get_recently_added_products(self):
        recent_product = request.env['recently_added.products'].sudo().search([], order='id desc', limit=12)
        recent_product_data = []
        for rec in recent_product.recent_products_ids[:12]:
            recent_product_data.append({
                'id': rec.id,
                'categ_id': rec.categ_id.name,
                'name': rec.name,
                'rating_avg': rec.rating_avg,
                'list_price': rec.list_price,
            })
            # print(recent_product_data)
        return recent_product_data


# @http.route('/add_to_cart/<int:id>', auth="public", type='http',
#             website=True)
# def add_to_cart(self, id):
#     """this function is used for adding to cart"""
#     product = request.env['product.product'].search([('product_tmpl_id', '=', id)])[
#         0]
#     so = request.website.sale_get_order(force_create=True)
#     so._cart_update(
#         product_id=product.id,
#         add_qty=1,
#         set_qty=1
#     )
#
#     return request.redirect('/shop')


# Banner Controllers
class Banners(http.Controller):

    @http.route('/banner', auth="public", type="json")
    def all_slide(self):
        banners = http.request.env['carousel.view'].search([])
        banner_data = []
        base_url = request.env['ir.config_parameter'].sudo().get_param('web.base.url')
        for banner in banners:
            banner_data.append({
                'id': banner.id,
                'name': banner.name,
                'carousel_categories': banner.carousel_categories,
                'description1': banner.description1,
                'description2': banner.description2,
                'image_url1': f"{base_url}/web/image/carousel.view/{banner.id}/image1",
                'image_url2': f"{base_url}/web/image/carousel.view/{banner.id}/image2",
            })
        # print(banner_data)
        return banner_data


class Offers(http.Controller):

    @http.route('/offer', auth="public", type="json")
    def offer_all(self):
        offer = http.request.env['offer.product'].search([])
        offer_data = []
        base_url = request.env['ir.config_parameter'].sudo().get_param('web.base.url')
        for rec in offer:
            offer_data.append({
                'id': rec.id,
                'name': rec.offer_product_name,
                'discount': rec.discount,
                'image_url': f"{base_url}/web/image/offer.product/{rec.id}/offer_product_image",
            })
        # print(offer_data)
        return offer_data

# class VendorProduct(http.Controller):
#     @http.route('/brand', type='json', auth="public", website=True)
#     def get_vendor_product(self, **kw):
#         brand = http.request.env['product.attribute.value'].search([], limit=4)
#         brand_data = []
#         base_url = request.env['ir.config_parameter'].sudo().get_param('web.base.url')
#         for rec in brand:
#             brand_data.append({
#                 'id': rec.id,
#                 'image_url': f"{base_url}/web/image/product.attribute.value/{rec.id}/image",
#             })
#         print(brand_data)
#         return brand_data
