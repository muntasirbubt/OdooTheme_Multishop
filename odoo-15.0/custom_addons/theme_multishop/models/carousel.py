from odoo import models, fields


class SlideShow(models.Model):
    _name = 'carousel.view'
    _description = 'Carousel View'

    name = fields.Char(string='Name')
    carousel_categories = fields.Char(string='Bannar Category Name')
    image1 = fields.Binary(string='Image1')
    description1 = fields.Text(string='Bannar Items1  Description')
    image2 = fields.Binary(string='Image2')
    description2 = fields.Text(string='Bannar Items2 Description')