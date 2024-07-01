// /* globals google*/
// odoo.define('website.editor.snippets.options', function (require) {
//     'use strict';
//     const {qweb, _t, _lt} = require('web.core');
//     const Dialog = require('web.Dialog');
//     const publicWidget = require('web.public.widget');
//     const weSnippetEditor = require('web_editor.snippet.editor');
//     const wSnippetOptions = require('website.editor.snippets.options');
//     const OdooEditorLib = require('@web_editor/../lib/odoo-editor/src/utils/utils');
//     const getDeepRange = OdooEditorLib.getDeepRange;
//     const getTraversedNodes = OdooEditorLib.getTraversedNodes;
//
//     options.registry.WebsiteLevelColor = options.Class.extend({
//         specialCheckAndReloadMethodsNames: options.Class.prototype.specialCheckAndReloadMethodsNames
//             .concat(['customizeWebsiteLayer2Color']),
//
//         /**
//          * @see this.selectClass for parameters
//          */
//         async customizeWebsiteLayer2Color(previewMode, widgetValue, params) {
//             if (previewMode) {
//                 return;
//             }
//             params.color = params.layerColor;
//             params.variable = params.layerGradient;
//             let color = undefined;
//             let gradient = undefined;
//             if (weUtils.isColorGradient(widgetValue)) {
//                 color = '';
//                 gradient = widgetValue;
//             } else {
//                 color = widgetValue;
//                 gradient = '';
//             }
//             await this.customizeWebsiteVariable(previewMode, gradient, params);
//             params.noBundleReload = false;
//             return this.customizeWebsiteColor(previewMode, color, params);
//         },
//
//         //--------------------------------------------------------------------------
//         // Private
//         //--------------------------------------------------------------------------
//
//         /**
//          * @override
//          */
//         async _computeWidgetState(methodName, params) {
//             if (methodName === 'customizeWebsiteLayer2Color') {
//                 params.variable = params.layerGradient;
//                 const gradient = await this._computeWidgetState('customizeWebsiteVariable', params);
//                 if (gradient) {
//                     return gradient.substring(1, gradient.length - 1); // Unquote
//                 }
//                 params.color = params.layerColor;
//                 return this._computeWidgetState('customizeWebsiteColor', params);
//             }
//             return this._super(...arguments);
//         },
//     });
//     //
//     // options.registry.HeaderNavbar = options.Class.extend({
//     //     /**
//     //      * Particular case: we want the option to be associated on the header navbar
//     //      * in XML so that the related options only appear on navbar click (not
//     //      * header), in a different section, etc... but we still want the target to
//     //      * be the header itself.
//     //      *
//     //      * @constructor
//     //      */
//     //     init() {
//     //         this._super(...arguments);
//     //         this.setTarget(this.$target.closest('#wrapwrap > header'));
//     //     },
//     //
//     //     //--------------------------------------------------------------------------
//     //     // Public
//     //     //--------------------------------------------------------------------------
//     //
//     //     /**
//     //      * @override
//     //      */
//     //     async updateUIVisibility() {
//     //         await this._super(...arguments);
//     //
//     //         // TODO improve this: this is a big hack so that the "no mobile
//     //         // hamburger" option is disabled if it is ever hidden (because of the
//     //         // selection of an hamburger template which is a foreign option). This
//     //         // should be done another way in another place somehow...
//     //         const noHamburgerWidget = this.findWidget('no_hamburger_opt');
//     //         const noHamburgerHidden = noHamburgerWidget.$el.hasClass('d-none');
//     //         if (noHamburgerHidden && noHamburgerWidget.isActive()) {
//     //             this.findWidget('default_hamburger_opt').enable();
//     //         }
//     //
//     //         // TODO improve this: this is a big hack so that the label of the
//     //         // hamburger option changes if the 'no_hamburger_opt' one is available
//     //         // (= in that case the option controls only the *mobile* hamburger).
//     //         const hamburgerTypeWidget = this.findWidget('header_hamburger_type_opt');
//     //         const labelEl = hamburgerTypeWidget.el.querySelector('we-title');
//     //         if (!this._originalHamburgerTypeLabel) {
//     //             this._originalHamburgerTypeLabel = labelEl.textContent;
//     //         }
//     //         labelEl.textContent = noHamburgerHidden
//     //             ? this._originalHamburgerTypeLabel
//     //             : _t("Mobile menu");
//     //     },
//     //
//     //     //--------------------------------------------------------------------------
//     //     // Public
//     //     //--------------------------------------------------------------------------
//     //
//     //     /**
//     //      * @override
//     //      */
//     //     async start() {
//     //         await this._super(...arguments);
//     //         // TODO Remove in master.
//     //         const signInOptionEl = this.el.querySelector('[data-customize-website-views="portal.user_sign_in"]');
//     //         signInOptionEl.dataset.noPreview = 'true';
//     //     },
//     //     /**
//     //      * @private
//     //      */
//     //     async updateUI() {
//     //         await this._super(...arguments);
//     //         // For all header templates except those in the following array, change
//     //         // the label of the option to "Mobile Alignment" (instead of
//     //         // "Alignment") because it only impacts the mobile view.
//     //         if (!["'default'", "'hamburger'", "'sidebar'", "'magazine'", "'hamburger-full'", "'slogan'"]
//     //             .includes(weUtils.getCSSVariableValue("header-template"))) {
//     //             const alignmentOptionTitleEl = this.el.querySelector('[data-name="header_alignment_opt"] we-title');
//     //             alignmentOptionTitleEl.textContent = _t("Mobile Alignment");
//     //         }
//     //     },
//     //
//     //     //--------------------------------------------------------------------------
//     //     // Private
//     //     //--------------------------------------------------------------------------
//     //
//     //     /**
//     //      * Needs to be done manually for now because data-dependencies
//     //      * doesn't work with "AND" conditions.
//     //      * TODO: improve this.
//     //      *
//     //      * @override
//     //      */
//     //     async _computeWidgetVisibility(widgetName, params) {
//     //         switch (widgetName) {
//     //             case 'option_logo_height_scrolled': {
//     //                 return !!this.$('.navbar-brand').length;
//     //             }
//     //             case 'no_hamburger_opt': {
//     //                 return !weUtils.getCSSVariableValue('header-template').includes('hamburger');
//     //             }
//     //         }
//     //         if (widgetName === 'header_alignment_opt') {
//     //             if (!this.$target[0].querySelector('.o_offcanvas_menu_toggler')) {
//     //                 // If mobile menu is "Default", hides the alignment option for
//     //                 // "hamburger full" and "magazine" header templates.
//     //                 return !["'hamburger-full'", "'magazine'"].includes(weUtils.getCSSVariableValue('header-template'));
//     //             }
//     //             return true;
//     //         }
//     //         return this._super(...arguments);
//     //     },
//     // });
// });
