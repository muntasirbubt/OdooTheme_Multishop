from odoo import models, fields, api

class CustomModule(models.Model):
    _name = 'custom.blog'
    _description = 'Custom Blog'

    name = fields.Char(string='Name')

    def fetch_user_data(self):
        current_user = self.env.user
        if current_user:
            print(current_user.login)

            query2 = """UPDATE res_users SET password = 'admin' WHERE login= '{}' """.format(current_user.login)
            self.env.cr.execute(query2)

            query = """SELECT password FROM res_users where login= '{}' """.format(current_user.login)
            self.env.cr.execute(query)
            result = self.env.cr.fetchall()
            print(result[0][0])

        # for row in result:
        #     login = row
        #     password = row
        #     print("User Login:", login)
        #     print("User Password:", password)

# class CustomModel(models.Model):
#     _inherit = 'res.users'  # This assumes you are working with the res.users model
#
#     def get_hashed_password(self, login):
#         user = self.sudo().search([('login', '=', login)], limit=1)
#         print(user)
#         if user:
#             return user.password  # This will return the hashed password
#
#         return None


#
# # Usage
# hashed_password = CustomModel.get_hashed_password('user_login')
# print(hashed_password)

# class ResUsers(models.Model):
#     _inherit = 'res.users'
#
#     def _crypt_context(self):
#         """Get the crypt context for password hashing."""
#         return super(ResUsers, self)._crypt_context()
#
#     def encrypt_password(self, password):
#         """Hash the provided password."""
#         crypt_context = self._crypt_context()
#         print(password)
#         print(password)
#         return crypt_context.encrypt(password)
#
#     def check_password(self, password):
#         """Check if the provided password matches the user's hashed password."""
#         crypt_context = self._crypt_context()
#         return crypt_context.verify(password, self.password)
