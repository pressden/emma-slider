( function() {
	document.addEventListener( 'DOMContentLoaded', function () {
		// Initialize sliders.
		const sliders = document.querySelectorAll( '.splide' );

		sliders.forEach( slider => {
			new Splide( slider ).mount();
		} );
	} );

	document.querySelectorAll( '.glide__main' ).forEach( item => {
		var sliderSettings = JSON.parse( item.dataset.sliderSettings );
		var slider = new Glide( item, sliderSettings ).mount();

		if( sliderSettings.itemWidth ) {
			var minItemWidth = sliderSettings.itemWidth;

			function setPerView() {
				var maxSlides = Math.floor( item.clientWidth / minItemWidth );
				var actualSlides = item.querySelectorAll( '.glide__slide:not(.glide__slide--clone)' ).length;

				slider.update( {
					perView: Math.min( maxSlides, actualSlides),
				} );
			}

			window.addEventListener( 'resize', function() {
				setPerView();
			} );

			setPerView();
		}
	} );
} ) ();
