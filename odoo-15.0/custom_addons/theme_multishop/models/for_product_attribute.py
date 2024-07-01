from odoo import api, fields, models, tools, _


class CustomProductAttributeValue(models.Model):
    _inherit = "product.attribute.value"

    show_logo = fields.Boolean(string='Is Brand',)
    image = fields.Image(string="For Image", alt="Image_21")
