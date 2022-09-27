import Splide from '@splidejs/splide';

document.addEventListener( 'DOMContentLoaded', function() {
	var defaultSliderSettings = {
		classes: {
			arrow: 'splide__arrow ignore-theme',
			page: 'splide__pagination__page ignore-theme'
		},
		rewind: true
	}
	document.querySelectorAll( '.wp-block-emma-slider' ).forEach( slider => {
		let sliderSettings = { 
			...defaultSliderSettings,
			...JSON.parse( slider.dataset.sliderSettings )
		};
		new Splide( slider, sliderSettings ).mount();
	} );
} );
