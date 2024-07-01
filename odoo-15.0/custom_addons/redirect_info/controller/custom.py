from odoo import http


class YourController(http.Controller):

    @http.route('/blog_redirect/controller/custom.py/action_redirect2', type='json', auth="public")
    def action_redirect2(self, **kw):
        print("Received JSON Data:", kw)

        userId = kw.get('userId')
        password = kw.get('password')

        print("User ID:", userId)
        print("User Password:", password)

        response = {
            'message': 'Received user ID and password'
        }
        return response

