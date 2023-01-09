<script>
	import { editorInput } from '$src/stores.js';
	import { onMount } from 'svelte';

	let editorElement;

	onMount(() => {
		editorElement.addEventListener('keydown', (e) => {
			if (e.key === 'Tab') {
				e.preventDefault();

				editorElement.setRangeText(
					'    ',
					editorElement.selectionStart,
					editorElement.selectionStart,
					'end'
				);
			}
		});
	});
</script>

<textarea
	class="md-editor"
	placeholder="Write something..."
	bind:value={$editorInput}
	bind:this={editorElement}
/>

<style lang="sass">
	@use '../../vars'

.md-editor
	width: 100%
	height: 100%
	resize: none
	background: vars.$color-dark-7
	border: none
	outline: none
	font-family: "Roboto Slab"
	color: vars.$color-text-2
	font-size: 1rem
	line-height: calc(1em + 1ex)
	//white-space: pre
</style>
