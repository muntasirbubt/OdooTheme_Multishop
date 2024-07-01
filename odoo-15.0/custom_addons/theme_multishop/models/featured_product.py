from odoo import fields, models


class FeaturedProducts(models.Model):
    _name = "featured.products"
    _description = "Featured Products"

    name = fields.Char(string="Name")
    featured_products_ids = fields.Many2many('product.template')