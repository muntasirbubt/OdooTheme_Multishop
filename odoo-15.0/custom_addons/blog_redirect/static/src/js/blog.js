odoo.define('blog_redirect.blog_redirect', function (require) {
    "use strict";

    var core = require('web.core');
    var Widget = require('web.Widget');

    var BlogRedirect = Widget.extend({
        start: function () {
            var self = this;
            var wizardModel = new core.form.CompoundFormView(self, {
                modelName: 'hello.blog.wizard',
                context: self.getSession().user_context,
            });

            wizardModel.on('execute_action', self, function (ev) {
                var action = ev.data.action;
                if (action.tag === 'action_redirect') {
                    var url = action.params.url;
                    var target = action.params.target || '_blank';
                    window.open(url, target);
                }
            });

            wizardModel.attachTo(self.$el);
            return wizardModel.start();
        },
    });

    core.action_registry.add('action_redirect', BlogRedirect);

    return BlogRedirect;
});
