<?php
/**
 * Plugin Name:       Emma Faq
 * Description:       Example block written with ESNext standard and JSX support – build/emma-faq step required.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       emma-faq
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
function create_block_emma_faq_block_init() {
	register_block_type( __DIR__ . '/build/emma-faq' );
	register_block_type( __DIR__ . '/build/emma-answer' );
}
add_action( 'init', 'create_block_emma_faq_block_init' );

/**
 * Adds Schema pieces to our output.
 *
 * @param array                 $pieces  Graph pieces to output.
 * @param \WPSEO_Schema_Context $context Object with context variables.
 *
 * @return array Graph pieces to output.
 */
function yoast_add_graph_pieces( $pieces, $context ) {
	include_once 'class-emma-faq.php';
	$pieces[] = new Emma_FAQ( $context );

	return $pieces;
}
add_filter( 'wpseo_schema_graph_pieces', 'yoast_add_graph_pieces', 11, 2 );

add_filter( 'yoast_seo_development_mode', '__return_true' );
