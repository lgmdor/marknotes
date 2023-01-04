<script>
	import SvelteMarkdown from 'svelte-markdown';
	import MdPreview from './MdPreview.svelte';
	import { isEditorVisible, editorInput } from './../../stores.js';

	export let text;

	const openEditor = (e) => {
		isEditorVisible.update((isEditorVisible) => true);
		editorInput.update((editorInput) => text);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="note" on:click={openEditor}>
	<MdPreview><SvelteMarkdown source={text} /></MdPreview>
</div>

<style lang="sass">
  @use './../../vars'

  .note
    min-height: vars.$size-8
    border: vars.$misc-border-default
    border-radius: vars.$misc-borderRadius
    color: vars.$color-text-2
    padding: vars.$misc-padding-default
    cursor: pointer
    transition: boxs-shadow 60ms linear
    &:hover
      box-shadow: vars.$misc-boxShadow
</style>
