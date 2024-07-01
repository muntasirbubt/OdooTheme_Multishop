// featured_product.js
odoo.define('theme_multishop.featured_product_snippet', function (require) {
    'use strict';
    var publicWidget = require('web.public.widget');
    var rpc = require('web.rpc');
    var core = require('web.core');
    var QWeb = core.qweb;

    var ExploreFeatureProducts = publicWidget.Widget.extend({
        selector: '#featured_item',
        xmlDependencies: ['/theme_multishop/static/src/xml/snippets/featured_product.xml'],

        start: function () {
            this._super.apply(this, arguments);
            var self = this;
            this._rpc({
                route: '/featured',
                params: {},
            }).then(function (result) {
                const $product = $(QWeb.render(
                    'theme_multishop.featured_products',
                    {data: result, 'test_val': 'Test From Route'}
                ));
                self.$('#feature_test').html($product);
            });
        },
    });
    publicWidget.registry.featured_item = ExploreFeatureProducts;
    return ExploreFeatureProducts;
});