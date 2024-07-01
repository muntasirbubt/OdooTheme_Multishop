// my_module/static/src/js/my_custom_script.js
odoo.define('my_module.my_custom_script', function (require) {
    "use strict";

    var ajax = require('web.ajax');
    var core = require('web.core');

    core.action_registry.add('update_filters', function (action) {
        // Fetch color data dynamically using the RPC call
        ajax.jsonRpc('/get_color_data', 'call', {})
            .then(function (result) {
                // Populate the color filter options
                var colorDropdown = $('select[name="color_id"]');
                colorDropdown.empty(); // Clear previous options
                colorDropdown.append('<option value="">All Colors</option>');
                $.each(result, function (key, value) {
                    colorDropdown.append('<option value="' + key + '">' + value + '</option>');
                });
            });
    });

    // Trigger the action to update the filters on page load
    core.action_registry.get('update_filters')();

});
