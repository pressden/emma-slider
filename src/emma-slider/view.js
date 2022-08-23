import Splide from '@splidejs/splide';

document.addEventListener( 'DOMContentLoaded', function() {
	document.querySelectorAll( '.wp-block-emma-slider' ).forEach( slider => {
		var sliderSettings = JSON.parse( slider.dataset.sliderSettings );
		sliderSettings.classes = {
			arrow : 'splide__arrow ignore-theme',
			page  : 'splide__pagination__page ignore-theme',
		}
		new Splide( slider, sliderSettings ).mount();
	} );
} );
