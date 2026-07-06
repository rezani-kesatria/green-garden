<?php
/**
 * GGIS Divi Child — enqueue parent styles, GSAP/Lenis, and the motion layer.
 *
 * GSAP 3.13+ ships ScrollTrigger and SplitText in the free package
 * (no Club license needed). Versions are pinned to the ones validated
 * against the approved mockup.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'GGIS_GSAP_VER', '3.13.0' );
define( 'GGIS_LENIS_VER', '1.3.11' );
define( 'GGIS_CHILD_VER', '1.0.0' );

add_action( 'wp_enqueue_scripts', function () {
	// Parent + child styles.
	wp_enqueue_style( 'divi-parent', get_template_directory_uri() . '/style.css', array(), null );
	wp_enqueue_style( 'ggis-child', get_stylesheet_uri(), array( 'divi-parent' ), GGIS_CHILD_VER );

	// Motion stack — footer-loaded, deferred.
	$gsap = 'https://cdn.jsdelivr.net/npm/gsap@' . GGIS_GSAP_VER . '/dist/';
	wp_enqueue_script( 'gsap', $gsap . 'gsap.min.js', array(), GGIS_GSAP_VER, true );
	wp_enqueue_script( 'gsap-scrolltrigger', $gsap . 'ScrollTrigger.min.js', array( 'gsap' ), GGIS_GSAP_VER, true );
	wp_enqueue_script( 'gsap-splittext', $gsap . 'SplitText.min.js', array( 'gsap' ), GGIS_GSAP_VER, true );
	wp_enqueue_script( 'lenis', 'https://cdn.jsdelivr.net/npm/lenis@' . GGIS_LENIS_VER . '/dist/lenis.min.js', array(), GGIS_LENIS_VER, true );

	wp_enqueue_script(
		'ggis-motion',
		get_stylesheet_directory_uri() . '/js/ggis-motion.js',
		array( 'gsap', 'gsap-scrolltrigger', 'gsap-splittext', 'lenis' ),
		GGIS_CHILD_VER,
		true
	);
} );

// Defer the motion scripts (WP 6.3+ strategy support keeps dependency order).
add_filter( 'script_loader_tag', function ( $tag, $handle ) {
	$deferred = array( 'gsap', 'gsap-scrolltrigger', 'gsap-splittext', 'lenis', 'ggis-motion' );
	if ( in_array( $handle, $deferred, true ) && false === strpos( $tag, ' defer' ) ) {
		$tag = str_replace( ' src=', ' defer src=', $tag );
	}
	return $tag;
}, 10, 2 );
