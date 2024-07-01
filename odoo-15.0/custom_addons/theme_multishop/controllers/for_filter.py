from odoo import http
from odoo.http import request, Response


class WebsiteSale(http.Controller):
    @http.route('/get_color_data', type='json', auth='public', website=True)
    def get_color_data(self):
        print("Muntasir")
        colors = request.env['product.attribute'].sudo().search([('attribute_type', '=', 'color')], order='name')
        print("Tuhin")
        print(colors)
        color_data = [{'id': color.id, 'name': color.name} for color in colors]
        print("Kamal")
        return color_data
