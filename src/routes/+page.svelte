<script>
	import Button from '$lib/components/Button.svelte';
	import NoteAddPopup from '$lib/components/NoteEditor.svelte';
	import NoteList from '$lib/components/NoteList.svelte';
	import { isEditorVisible } from './../stores.js';

	export let data;

	let text = '';

	const showPopup = (e) => {
		//text = e.detail.text;
		isEditorVisible.update((isEditorVisible) => true);
	};
	const hidePopup = () => {
		isEditorVisible.update((isEditorVisible) => false);
	};
</script>

<div class="test">{data.db}</div>

<Button text="New Note" onclick={showPopup} variant={'filled'} />

<NoteAddPopup mdInput={text} on:hidePopup={hidePopup} />

<NoteList />

<style lang="sass">
	@use '../vars'



.test
	color: #fff
</style>
