/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
 import { __ } from '@wordpress/i18n';

 /**
	* React hook that is used to mark the block wrapper element.
	* It provides all the necessary props like the class name.
	*
	* @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
	*/
 import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
 
 /**
	* The save function defines the way in which the different attributes should
	* be combined into the final markup, which is then serialized by the block
	* editor into `post_content`.
	*
	* @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
	*
	* @return {WPElement} Element to render.
	*/
 export default function save( { attributes } ) {
	var blockProps = useBlockProps.save( {
		className: 'splide'
	} ); 

	var navigationColors = {};
	if( attributes.arrowColor ) {
		var colorObject = wp.blockEditor.getColorObjectByColorValue( wp.data.select( "core/editor" ).getEditorSettings().colors, attributes.arrowColor );
		// console.log( attributes.arrowColor );
		// blockProps = useBlockProps.save( {
		// 	className: 'test-' + colorObject.slug
		// } );
		navigationColors = {
			'--emma-slider--arrow-color': 'var( --wp--preset--color--' + attributes.arrowColor + ')',
			'--emma-slider--pagination-color': 'var( --wp--preset--color--' + attributes.paginationColor + ')',
			'--emma-slider--current-page-color': 'var( --wp--preset--color--' + attributes.currentPageColor + ')'
		};
	}
 
	/**
	* Check if object is valid JSON
	* @param str
	*/
	function isJSONString( str ) {
		try {
			JSON.parse( str );
		} catch( e ) {
			return false;
		}
		return true;
	}
 
	/** initialize settings object */
	var settings = {};
	 
	/** define loop type of slider */
	settings.type = attributes.loopType;
	 
	/** define how many slides per page, including breakpoints if needed */
	settings.perMove = 1;
	if( attributes.slidesPerPageDesktop ) {
		settings.perPage = attributes.slidesPerPageDesktop;
	}
	if( attributes.slidesPerPageTablet || attributes.slidesPerPagePhone ) {
		settings.breakpoints = {};
	}
	if( attributes.slidesPerPageTablet ) {
		settings.breakpoints[782] = {
			"perPage": attributes.slidesPerPageTablet
		}
	}
	if( attributes.slidesPerPageMobile ) {
		settings.breakpoints[480] = {
			"perPage": attributes.slidesPerPageMobile
		}
	}

	var paginationPlaceholder = '';
	if( attributes.showPagination ) {
		paginationPlaceholder = '<ul class="splide__pagination"></ul>';
	} else {
		settings.pagination = false;
	}

	if( attributes.autoplayInterval > 0 ) {
		settings.autoplay = true;
		settings.interval = attributes.autoplayInterval * 1000
	}
 
	var manualSettings = "{" + attributes.settingsJSON + "}";
	if( isJSONString( manualSettings ) ) {
		Object.assign( settings, JSON.parse( manualSettings ) );
	}
 
	return (
		<div { ...blockProps } style={ navigationColors } role="group" data-slider-settings={ JSON.stringify( settings ) }>
			<div style="position: relative">
    		<div class="splide__arrows"></div>
				<div class="splide__track">
					<ul class="splide__list">
						<InnerBlocks.Content />
					</ul>
			 	</div>
			</div>
			{ attributes.showPagination ? (
					<ul class="splide__pagination"></ul>
			) : (
					__( '', 'emma-slider' )
			) }
		</div>
	);
}
