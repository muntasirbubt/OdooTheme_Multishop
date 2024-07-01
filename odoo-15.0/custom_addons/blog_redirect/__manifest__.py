{
    'name': 'For Blog',
    'description': 'For Blog Page Redirect',
    'category': 'Blog',
    'sequence': -100,
    'version': '1.0.0.1',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        # 'views/for_user.xml',
        'wizard/for_blog.xml',
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
