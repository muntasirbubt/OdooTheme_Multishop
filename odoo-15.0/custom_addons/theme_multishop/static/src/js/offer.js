odoo.define('theme_multishop.custom_offer_snippet', function (require) {
    'use strict';
    var publicWidget = require('web.public.widget');
    var rpc = require('web.rpc');
    var core = require('web.core');
    var QWeb = core.qweb;

    var ExploreProductsAds = publicWidget.Widget.extend({
        selector: '#ads_item',
        xmlDependencies: ['/theme_multishop/static/src/xml/snippets/offer.xml'],

        start: function () {
            this._super.apply(this, arguments);
            var self = this;
            this._rpc({
                route: '/offer',
                params: {},
            }).then(function (result) {
                const $product = $(QWeb.render(
                    'theme_multishop.custom_offer_snippet',
                    {data: result,'test_val':'Test From Route'}
                ));
                self.$('#product_ads').html($product);
            });
            },
    });

    publicWidget.registry.ads_item = ExploreProductsAds;
    return ExploreProductsAds;
});