# emma-slider

This plugin adds a slider block to the Gutenberg Editor. It's intended to be used with the [Emma](https://github.com/pressden/emma) and [Emma Starter](https://github.com/pressden/emma-starter) repos.

To use, perform the following steps:
* clone this repo into `wp-content/plugins/`
* in `\wp-content\themes\emma-child\src\sass\admin.scss`, add (or uncomment, if using a newer version of the `Emma Starter` repo): `@import "../../../../plugins/emma-dialog/sass/slider-editor";`
* in `\wp-content\themes\emma-child\src\sass\theme.scss`, add (or uncomment, if using a newer version of the `Emma Starter` repo): `@import "../../../../plugins/emma-dialog/sass/slider-frontend";`
* if not already running, run `npm run watch` in the child theme to compile CSS
* activate plugin in WordPress

That's it! If you decide to remove the plugin, make sure to remove or comment out the imports noted above.
