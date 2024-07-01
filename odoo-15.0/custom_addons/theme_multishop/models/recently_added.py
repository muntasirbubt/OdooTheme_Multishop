from odoo import fields, models


class RecentlyAdded(models.Model):
    _name = "recently_added.products"
    _description = "Recently Added Products"

    name = fields.Char(string="Name")
    recent_products_ids = fields.Many2many('product.template')
