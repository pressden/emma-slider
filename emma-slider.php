<?php
/**
 * Plugin Name:       Emma Slider
 * Description:       Emma Slider is a WordPress plugin that adds a slider block to the Gutenberg editor for the Emma theme.
 * Version:           3.1.0
 * Author: 						Eric Michel
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Author URI: 				https://github.com/pressden
 * Text Domain:       emma-slider
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_emma_slider_block_init() {
	register_block_type( __DIR__ . '/build/emma-slider' );
	register_block_type( __DIR__ . '/build/emma-slide' );
}
add_action( 'init', 'create_block_emma_slider_block_init' );
