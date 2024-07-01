from odoo import http
from odoo.http import request
from odoo.addons.http_routing.models.ir_http import slug


class CustomWebsite(http.Controller):
    @http.route('/categories', type='json', auth="public", website=True)
    def products_list(self, **kw):
        categories = request.env['product.public.category'].sudo().search([('parent_id', '=', False)])
        base_url = request.env['ir.config_parameter'].sudo().get_param('web.base.url')
        category_data = []
        for category in categories[:-1]:
            product_count = request.env['product.template'].sudo().search_count(
                [('public_categ_ids', 'child_of', category.id)])
            category_data.append({
                'name': category.name,
                'image_url': f"{base_url}/web/image/product.public.category/{category.id}/image_1920",
                'product_count': product_count,
                'id_p': category.id,
            })
        print(category_data)
        return category_data
