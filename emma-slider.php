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
  //$slider_library_css = plugin_dir_url( __FILE__ ) . 'vendor/glide/glide.core.css';
  $slider_library_version = '3.4.1';
  
  $slider_frontend_js = plugin_dir_url( __FILE__ ) . 'js/slider-frontend.js';
  $slider_frontend_version = '1.0.0';

  global $post;
  if( has_block( 'emma/slider', $post ) ) {
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

/**
 * Add SCSS to compiler
 */
function emma_slider_compile_theme_css( $import_scss_files ) {
  $import_scss_files[] = plugin_dir_path(__FILE__) . 'sass/slider-frontend';
  $import_scss_files[] = plugin_dir_path(__FILE__) . 'vendor/glide/glide.core';

  return $import_scss_files;
}
add_filter( 'emma_child_theme_scss', 'emma_slider_compile_theme_css' );
