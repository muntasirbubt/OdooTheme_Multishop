// recently_added.js
odoo.define('theme_multishop.recently_added_products', function (require) {
    'use strict';
    var publicWidget = require('web.public.widget');
    var rpc = require('web.rpc');
    var core = require('web.core');
    var QWeb = core.qweb;

    var ExploreRecentProducts = publicWidget.Widget.extend({
        selector: '#recent_item',
        xmlDependencies: ['/theme_multishop/static/src/xml/snippets/recently_added.xml'],

        start: function () {
            this._super.apply(this, arguments);
            var self = this;
            this._rpc({
                route: '/recent',
                params: {},
            }).then(function (result) {
                const $product = $(QWeb.render(
                    'theme_multishop.recently_added_products',
                    {data: result, 'test_val': 'Test From Route'}
                ));
                self.$('#recent_product').html($product);
            });
        },
    });
    publicWidget.registry.recent_item = ExploreRecentProducts;
    return ExploreRecentProducts;
});