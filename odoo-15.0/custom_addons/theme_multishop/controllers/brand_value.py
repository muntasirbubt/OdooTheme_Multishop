from odoo import http
from odoo.http import request
from odoo.addons.http_routing.models.ir_http import slug


class CustomWebsite(http.Controller):
    @http.route('/brand', type='json', auth="public", website=True)
    def products_list(self, **kw):
        brands = request.env['product.attribute.value'].sudo().search([])
        base_url = request.env['ir.config_parameter'].sudo().get_param('web.base.url')
        brand_data = []
        for brand in brands[:-1]:
            brand_data.append({
                'name': brand.name,
                'image_url': f"{base_url}/web/image/product.public.category/{brand.id}/image",
                'id_p': brand.id,
            })
        print(brand_data)
        return brand_data
