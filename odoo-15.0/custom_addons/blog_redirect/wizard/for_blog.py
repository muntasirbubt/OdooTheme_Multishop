import requests
from odoo import http
from odoo.http import request
from odoo import api, fields, models, _
from odoo.exceptions import UserError
import xmlrpc.client as xmlrpclib
import base64
import random
import string
import os


class BlogRedirectCustom(models.TransientModel):
    _name = "hello.blog.wizard"
    _description = "For Blog Post"

    user_name = fields.Char(string="User Name")
    password = fields.Char(string="Password")
    # image = fields.binary(string="Users Image")

    def generate_random_token(self, length=10):
        gid_component = 'gid4'  # Replace this with your desired component
        characters = string.ascii_letters + string.digits
        random_part = ''.join(random.choice(characters) for _ in range(length - len(gid_component)))
        token_gid = gid_component + random_part
        print(token_gid)
        return token_gid

    def action_redirect(self):
        # random_token = self.generate_random_token()
        current_user = self.env.user
        if current_user:
            # print(current_user.login)
            query = """SELECT password FROM res_users where login= '{}' """.format(current_user.login)
            self._cr.execute(query)
            result = self._cr.fetchall()
            print(result[0][0])

        # Replace these variables with your actual Odoo server information
        odoo_server_url = 'http://localhost:8096'  # URL of the target Odoo server
        db_name = 'new_blog'
        username = current_user.login
        # ra_token = os.urandom(12).hex()
        # password = ra_token
        password = self.generate_random_token()
        # print(ra_token)
        user = self.env['res.users'].sudo().search([('login', '=', username)], limit=1)
        if user:
            if password:
                # Valid credentials, redirect to Odoo 16
                return {
                    'type': 'ir.actions.act_url',
                    'url': f"{odoo_server_url}/web/login?db={db_name}&login={username}&password={password}",
                    # 'url': f"{odoo_server_url}/web/login",
                    'target': 'new',

                }
        else:
            # Invalid credentials, show an error message
            raise UserError("Invalid credentials. Please try again.")

        # bytes_string = self.password.encode('utf-8')
        # password = base64.b64encode(bytes_string).decode('utf-8')
        # print(password)

        #     additional_data = {
        #         "db": db_name,
        #         "login": username,
        #         "password": password,
        #     }
        # Set session variable with additional data
        # request.session['additional_data'] = additional_data

        # url = f"{odoo_server_url}/web/login"
        # data = {
        #     'db': db_name,
        #     'login': username,
        #     'password': password,
        # }

        # # response = requests.post(url, json=data)
        # response = requests.post(
        #     url,
        #     json=data,
        #     # timeout=TIMEOUT,
        #     headers={'content-type': 'application/json'}
        #     ).json()
        # return response

# # Connect to the Odoo server
# common = xmlrpclib.ServerProxy(f'{odoo_server_url}/xmlrpc/2/common')
#
# # Authenticate the user and obtain the user ID and access token
# uid = common.authenticate(db_name, username, password, {})
#
# if uid:
#     # Successfully logged in
#     print("Login to Odoo 16 successful!")
#     print(f"User ID: {uid}")
#
#     # Obtain a session ID for the targeted database
#     models = xmlrpclib.ServerProxy(f'{odoo_server_url}/xmlrpc/2/object')
#     session_id = models.execute_kw(db_name, uid, password, 'get_session_id', [])
#
#     # Redirect to the after-login page in the targeted database
#     after_login_url = f"{odoo_server_url}/web/session/authenticate/{session_id}/?redirect={odoo_server_url}"
#     return {
#         'type': 'ir.actions.act_url',
#         'url': after_login_url,
#         'target': 'new',
#     }
# else:
#     # Login failed
#     print("Login to Odoo 16 failed. Invalid credentials.")
#     raise UserError("Login to Odoo 16 failed. Invalid credentials.")

# def action_redirect(self):
#     # Replace these variables with your actual Odoo server information
#     odoo_server_url = 'http://localhost:8099'  # URL of the target Odoo server
#     db_name = 'ec_food'  # Name of the target database on Odoo 16
#     username = self.user_name  # Username of the user to log in
#     password = self.password  # Password of the user
#
#     # Connect to the Odoo server
#     common = xmlrpclib.ServerProxy(f'{odoo_server_url}/xmlrpc/2/common')
#
#     # Authenticate the user and obtain the user ID and access token
#     uid = common.authenticate(db_name, username, password, {})
#
#     if uid:
#         # Successfully logged in
#         print("Login to Odoo 16 successful!")
#         print(f"User ID: {uid}")
#
#         # Obtain a session ID for the targeted database
#         models = xmlrpclib.ServerProxy(f'{odoo_server_url}/xmlrpc/2/object')
#         session_id = models.execute_kw(db_name, uid, password, 'get_session_id', [])
#
#         # Redirect to the after-login page in the targeted database
#         after_login_url = f"{odoo_server_url}/web/session/authenticate/{session_id}/?redirect={odoo_server_url}"
#         return {
#             'type': 'ir.actions.act_url',
#             'url': after_login_url,
#             'target': 'new',
#         }
#     else:
#         # Login failed
#         print("Login to Odoo 16 failed. Invalid credentials.")
#         raise UserError("Login to Odoo 16 failed. Invalid credentials.")
