odoo.define('theme_project.custom_carousel_snippet', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');

    var ExploreBanners = publicWidget.Widget.extend({
        selector: '#banner',

        start: function () {
            this._super.apply(this, arguments);

            var self = this;
            this._rpc({
                route: '/banner',
                params: {},
            }).then(function (bannerData) {
                self._renderBanners(bannerData);
            });
        },

        _renderBanners: function (bannerData) {
            var $bannerView1 = this.$('#banner_view_1');
            var $bannerView2 = this.$('#banner_view_2');
            $bannerView1.empty();
            $bannerView2.empty();

            bannerData.forEach(function (banner, index) {
                var $bannerContainer = $('<div>', {class: 'carousel-item' + (index === 0 ? ' active' : '')});
                var $image = $('<img>', {
                    src: banner.image_url1,
                    class: 'position-absolute w-100 h-100',
                    style: 'object-fit: cover;'
                });
                var $caption = $('<div>', {class: 'carousel-caption d-flex flex-column align-items-center justify-content-center'});
                var $captionContent = $('<div>', {class: 'p-3', style: 'max-width: 700px;'});
                var $title = $('<h1>', {
                    class: 'display-4 text-white mb-3 animate__animated animate__fadeInDown',
                    text: banner.carousel_categories
                });
                var $description = $('<p>', {
                    class: 'mx-md-5 px-5 animate__animated animate__bounceIn',
                    text: banner.description1
                });
                var $shopNowBtn = $('<a>', {
                    class: 'btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp',
                    href: '/shop',
                    text: 'Shop Now'
                });

                $captionContent.append($title, $description, $shopNowBtn);
                $caption.append($captionContent);
                $bannerContainer.append($image, $caption);
                $bannerView1.append($bannerContainer);
            });

            bannerData.forEach(function (banner, index) {
                var $bannerContainer = $('<div>', {class: 'carousel-item' + (index === 0 ? ' active' : '')});
                var $image = $('<img>', {
                    src: banner.image_url2,
                    class: 'product-offer h-100',
                    style: 'object-fit: cover; height: 200px;'
                });
                var $caption = $('<div>', {class: 'carousel-caption d-flex flex-column align-items-center justify-content-center'});
                var $captionContent = $('<div>', {class: 'offer-text'});
                var $title = $('<h6>', {class: 'text-white text-uppercase', text: 'Save 20%'});
                var $description = $('<h3>', {class: 'text-white mb-3', text: 'Special Offer'});
                var $shopNowBtn = $('<a>', {class: 'btn btn-primary', href: '/shop', text: 'Shop Now'});

                $captionContent.append($title, $description, $shopNowBtn);
                $caption.append($captionContent);
                $bannerContainer.append($image, $caption);
                $bannerView2.append($bannerContainer);
            });
        },
    });


    publicWidget.registry.banner = ExploreBanners;

    return ExploreBanners;
});