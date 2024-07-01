{
    'name': 'Redirect Info',
    'description': 'For Blog Page Redirect',
    'category': 'Blog',
    'sequence': -100,
    'version': '1.1.0.0',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',

        'views/for_user.xml',
        'views/menu.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            # 'blog_redirect/static/src/js/login.js',

        ],
    },

    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
