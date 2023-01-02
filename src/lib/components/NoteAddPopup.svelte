<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import MarkdownIt from 'markdown-it';

	export let isPopupVisible = false;

	const dispatch = createEventDispatcher();
	const hidePopup = (e) => dispatch('hidePopup');

	//--------
	const md = new MarkdownIt();

	let mdInput,
		mdOutput = '';

	let elInput, elOutput;

	$: mdInput, updateMdOutput();

	const updateMdOutput = () => {
		if (elOutput) {
			elOutput.innerHTML = md.render(mdInput);
		}
	};

	onMount(() => {
		elInput.addEventListener('keydown', (e) => {
			console.log(e.key);
			if (e.key === 'Tab') {
				e.preventDefault();

				elInput.setRangeText('    ', elInput.selectionStart, elInput.selectionStart, 'end');
			}
		});
	});
</script>

{#if isPopupVisible}
	<div class="bg" on:click|self={hidePopup} aria-hidden="true">
		<div class="popup">
			<textarea
				class="editor"
				placeholder="Enter text..."
				bind:value={mdInput}
				bind:this={elInput}
			/>
			<div class="preview" bind:this={elOutput} />
		</div>
	</div>
{/if}

<style lang="sass">
@use '../../vars'

.bg
  position: fixed
  inset: 0
  background: transparentize(vars.$color-dark-7, 0.8)
  display: flex
  align-items: center
  justify-content: center
  .popup
    height: vars.$size-48
    width: vars.$size-64
    background: vars.$color-dark-7
    color: vars.$color-text-2
    border-radius: vars.$misc-borderRadius
    display: flex
    border: 1px solid vars.$color-dark-6
    .editor, .preview
      flex: 1
      padding: vars.$misc-padding-default
    .editor
      resize: none
      background: vars.$color-dark-7
      border: none
      outline: none
      font-family: "Lato"
      color: vars.$color-text-2
      font-size: 1rem
    .preview
      border-left: 1px solid vars.$color-dark-6
</style>
