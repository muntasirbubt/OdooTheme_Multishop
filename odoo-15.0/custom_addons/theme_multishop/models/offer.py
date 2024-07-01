from odoo import models, fields, api


class OfferProduct(models.Model):
    _name = 'offer.product'
    _description = "Offer Product"

    offer_product_name = fields.Char(string='Product Name')
    offer_product_image = fields.Binary(string='Image')
    discount = fields.Integer()