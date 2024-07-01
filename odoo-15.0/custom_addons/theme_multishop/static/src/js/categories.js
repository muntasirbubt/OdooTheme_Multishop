odoo.define('theme_multishop.custom_categories_snippet', function (require) {
    'use strict';
    var publicWidget = require('web.public.widget');
    var rpc = require('web.rpc');
    var core = require('web.core');
    var QWeb = core.qweb;

    var ExploreCategories = publicWidget.Widget.extend({
        selector: '#categories_item',
        xmlDependencies: ['/theme_multishop/static/src/xml/snippets/categories_depend.xml'],

        start: function () {
            this._super.apply(this, arguments);
            var self = this;
            this._rpc({
                route: '/categories',
                params: {},
            }).then(function (result) {
                const $category = $(QWeb.render(
                    'theme_multishop.custom_categories_snippet1',
                    {data: result,'test_val':'Test From Route'}
                ));
                self.$('#cate_test').html($category);
            });
            },
    });

    publicWidget.registry.categories_item = ExploreCategories;
    return ExploreCategories;
});