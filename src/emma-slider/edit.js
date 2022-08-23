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
import { compose } from '@wordpress/compose';
import { InnerBlocks, useBlockProps, InspectorControls, PanelColorSettings, withColors } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextareaControl, ColorPalette, Flex, FlexBlock, FlexItem, TextControl, __experimentalNumberControl as NumberControl, Icon, __experimentalUnitControl as UnitControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function SliderEdit( {
	attributes,
	setAttributes,
	arrowColor,
	setArrowColor,
	paginationColor,
	setPaginationColor,
	currentPageColor,
	setCurrentPageColor
} ) {
	const blockProps = useBlockProps();
	const BLOCK_TEMPLATE = [ 
		[ 'emma/slide', {} ]
	];
	var html = ( html ) => wp.element.RawHTML( { children: html } );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'General Settings' ) }
				>
					<SelectControl
						label={ __( 'Slider Type' ) }
						options={ [
							{ label: __( 'Slide' ), value: 'slide' },
							{ label: __( 'Loop' ), value: 'loop' },
							{ label: __( 'Fade' ), value: 'fade' },
						] }
						value={ attributes.loopType }
						onChange={ ( value ) =>
							setAttributes( { loopType: value } )
						}
					/>
					<TextControl
						label={ __( 'Autoplay Timer (seconds)' ) }
						value={ attributes.autoplayInterval }
						type={ 'number' }
						placeholder={ 'autoplay off' }
						help={ 'leave empty to use 0 to disable autoplay' }
						onChange={ ( value ) =>
							setAttributes( { autoplayInterval: parseFloat( value ) || '' } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Slides per Page' ) }
					initialOpen={ false }
				>
					<Flex justify='flex-start' style={{ 'margin-bottom': '0.5rem' }}>
						<FlexItem>
							<Icon icon={ 'desktop' } />
						</FlexItem>
						<FlexItem style={{ width: '130px' }}>
							<NumberControl
								value={ attributes.slidesPerPageDesktop }
								placeholder={ '1' }
								isDragEnabled={ false }
								onChange={ ( value ) =>
									setAttributes( { slidesPerPageDesktop: parseInt( value ) || '' } )
								}
							/>
						</FlexItem>
						<FlexBlock>
							desktop
						</FlexBlock>
					</Flex>
					<Flex justify='flex-start' style={{ 'margin-bottom': '0.5rem' }}>
					<FlexItem>
						<Icon icon={ 'tablet' } />
					</FlexItem>
						<FlexItem style={{ width: '130px' }}>
							<NumberControl
								value={ attributes.slidesPerPageTablet }
								placeholder={ 'same as desktop' }
								isDragEnabled={ false }
								onChange={ ( value ) =>
									setAttributes( { slidesPerPageTablet: parseInt( value ) || '' } )
								}
							/>
						</FlexItem>
						<FlexItem>
							tablet
						</FlexItem>
					</Flex>
					<Flex justify='flex-start'>
						<FlexItem>
							<Icon icon={ 'smartphone' } />
						</FlexItem>
						<FlexItem style={{ width: '130px' }}>
							<NumberControl
								value={ attributes.slidesPerPageMobile }
								placeholder={ 'same as tablet' }
								isDragEnabled={ false }
								onChange={ ( value ) =>
									setAttributes( { slidesPerPageMobile: parseInt( value ) || '' } )
								}
							/>
						</FlexItem>
						<FlexItem>
							phone
						</FlexItem>
					</Flex>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Slide Navigation Colors' ) }
					colorSettings={ [
						{
							value: arrowColor.color,
							onChange: setArrowColor,
							label: __( 'Arrow Color' ),
						},
						{
							value: paginationColor.color,
							onChange: setPaginationColor,
							label: __( 'Pagination Color' ),
						},
						{
							value: currentPageColor.color,
							onChange: setCurrentPageColor,
							label: __( 'Current Page Color' ),
						},
					] }
				/>
				<PanelBody
					title={ __( 'Manual Settings' ) }
					initialOpen={ false }
				>
					<TextareaControl
						value={ attributes.settingsJSON }
						help={ html( 'Enter JSON properties for additional settings found <a href="https://glidejs.com/docs/options/" target="_blank">here</a>. Make sure there are not quotes around numeric values!' ) }
						placeholder='"setting1":"value1",&#10;"setting2":"value2",&#10;"numberSetting":1234'
						onChange={ ( value ) =>
							setAttributes( { settingsJSON: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps } role="group">
				<div class="splide__track">
					<ul class="splide__list">
						<InnerBlocks
							template={ BLOCK_TEMPLATE }
						/>
					</ul>
				</div>
			</div>
		</>
	);
}

export default compose( [
	withColors( { 
		arrowColor: 'arrow-color',
		paginationColor: 'pagination-color',
		currentPageColor: 'current-page-color', 
	} ),
] )( SliderEdit );
