<?php

use Yoast\WP\SEO\Generators\Schema;

/**
 * Returns schema FAQ data.
 */
class Emma_FAQ extends Schema\Abstract_Schema_Piece {

	/**
	 * Determines whether or not a piece should be added to the graph.
	 *
	 * @return bool
	 */
	public function is_needed() {
		if ( empty( $this->context->blocks['emma/faq'] ) ) {
			return false;
		}

		if ( ! \is_array( $this->context->schema_page_type ) ) {
			$this->context->schema_page_type = array( $this->context->schema_page_type );
		}
		$this->context->schema_page_type[]  = 'FAQPage';
		$this->context->main_entity_of_page = $this->generate_ids();

		return true;
	}

	/**
	 * Generate the IDs so we can link to them in the main entity.
	 *
	 * @return array
	 */
	private function generate_ids() {
		$ids  = array();
		$faqs = $this->context->blocks['emma/faq'];
		foreach ( $faqs as $index => $faq ) {
			$faq_innerblocks = $faq['innerBlocks'];
			if ( $this->is_valid_faq_block( $faq_innerblocks ) ) {
				$ids[] = array( '@id' => $this->context->canonical . '#' . \esc_attr( 'faq-question-' . $index + 1 ) );
			}
		}

		return $ids;
	}

	/**
	 * Render a list of questions, referencing them by ID.
	 *
	 * @return array Our Schema graph.
	 */
	public function generate() {
		$graph = array();

		$faqs = $this->context->blocks['emma/faq'];
		foreach ( $faqs as $index => $faq ) {
			$faq_innerblocks = $faq['innerBlocks'];
			if ( $this->is_valid_faq_block( $faq_innerblocks ) ) {
				$graph[] = $this->generate_question_block( $faq_innerblocks[0], $faq_innerblocks[1], ( $index + 1 ) );
			}
		}

		return $graph;
	}

	/**
	 * Validate FAQ block contents.
	 *
	 * @param array $faq_innerblocks The contents of the FAQ block.
	 *
	 * @return array validated question and answer, or false if invalid.
	 */
	private function is_valid_faq_block( $faq_innerblocks ) {
		if (
			array_key_exists( 0, $faq_innerblocks ) &&
			array_key_exists( 1, $faq_innerblocks ) &&
			'core/heading' === $faq_innerblocks[0]['blockName'] &&
			'emma/answer' === $faq_innerblocks[1]['blockName']
		) {
			return true;
		}

		return false;
	}

	/**
	 * Generate a Question piece.
	 *
	 * @param array $question The question to generate schema for.
	 * @param array $answer The answer to generate schema for.
	 * @param int   $position The position of the question.
	 *
	 * @return array Schema.org Question piece.
	 */
	protected function generate_question_block( $question, $answer, $position ) {
		$id  = $this->context->canonical . '#faq-question-' . \esc_attr( $position );
		$url = $this->context->canonical;

		$data = array(
			'@type'          => 'Question',
			'@id'            => $id,
			'position'       => $position,
			'url'            => $url,
			'name'           => $this->helpers->schema->html->smart_strip_tags( $question['innerHTML'] ),
			'answerCount'    => 1,
			'acceptedAnswer' => $this->add_accepted_answer_property( $answer ),
		);

		$data = $this->helpers->schema->language->add_piece_language( $data );

		return $data;
	}

	/**
	 * Adds the Questions `acceptedAnswer` property.
	 *
	 * @param array $answer The answer to be added.
	 *
	 * @return array Schema.org acceptedAnswer piece.
	 */
	protected function add_accepted_answer_property( $answer ) {
		$answer_text = render_block( $answer );

		$data = array(
			'@type' => 'Answer',
			'text'  => $this->helpers->schema->html->sanitize( $answer_text ),
		);

		$data = $this->helpers->schema->language->add_piece_language( $data );

		return $data;
	}
}
