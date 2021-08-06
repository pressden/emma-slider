<?php
/*
Plugin Name: Emma Slider
Plugin URI: https://github.com/pressden/emma-slider
Description: Emma Slider is a WordPress plugin that adds a complex, configurable slider block to the Gutenberg editor for the Emma theme.
Version: 1.0.0
Author: Eric Michel
Author URI: http://pressden.com/
License: GPLv2 or later
Text Domain: emma_slider
*/

/**
 * Register and conditionally enqueue frontend scripts
 */
function emma_slider_enqueue_frontend() {
  $slider_library_js = plugin_dir_url( __FILE__ ) . 'vendor/glide/glide.min.js';
  $slider_library_css = plugin_dir_url( __FILE__ ) . 'vendor/glide/glide.core.css';
  $slider_library_version = '3.4.1';
  
  $slider_frontend_js = plugin_dir_url( __FILE__ ) . 'js/slider-frontend.js';
  $slider_frontend_version = '1.0.0';

  global $post;
  if( has_block( 'emma/slider', $post ) || emma_slider_has_block_in_reusable_block( 'emma/slider' ) ) {
    wp_enqueue_script( 'slider-library', $slider_library_js, [], $slider_library_version, true );
    wp_enqueue_style( 'slider-library', $slider_library_css, [], $slider_library_version );
    
    wp_enqueue_script( 'slider-frontend', $slider_frontend_js, ['slider-library'], $slider_frontend_version, true );
  }
}
add_action( 'wp_enqueue_scripts', 'emma_slider_enqueue_frontend' );

/**
 * Register and enqueue editor scripts
 */
function emma_slider_enqueue_editor() {
  $slider_editor_js = plugin_dir_url( __FILE__ ) . 'js/slider-editor.js';
  $slider_editor_version = '1.0.0';

  wp_enqueue_script( 'slider-editor', $slider_editor_js, ['wp-blocks','wp-editor'], $slider_editor_version, true );
}
add_action( 'enqueue_block_editor_assets', 'emma_slider_enqueue_editor' );

//needed because `has_block` does not detect blocks within reusable blocks, for some reason
function emma_slider_has_block_in_reusable_block( $block_name, $id = false ){
  $id = (!$id) ? get_the_ID() : $id;
  if( $id ){
      if ( has_block( 'block', $id ) ){
          // Check reusable blocks
          $content = get_post_field( 'post_content', $id );
          $blocks = parse_blocks( $content );

          if ( ! is_array( $blocks ) || empty( $blocks ) ) {
              return false;
          }

          foreach ( $blocks as $block ) {
              if ( $block['blockName'] === 'core/block' && ! empty( $block['attrs']['ref'] ) ) {
                  if( has_block( $block_name, $block['attrs']['ref'] ) ){
                     return true;
                  }
              }
          }
      }
  }

  return false;
}
