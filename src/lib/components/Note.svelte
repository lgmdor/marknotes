<script>
	import SvelteMarkdown from 'svelte-markdown';
	import MdPreview from './MdPreview.svelte';
	import Dropdown from './Dropdown.svelte';
	import DropdownItem from './DropdownItem.svelte';
	import { isPopupVisible, editorInput, editorNoteKey } from './../../stores.js';
	import { db } from '$src/db.js';
	import Badge from './Badge.svelte';

	export let note;

	let isTagsVisible = false;

	const showTags = () => (isTagsVisible = true);
	const hideTags = () => (isTagsVisible = false);

	const openPopup = () => {
		isPopupVisible.update((isPopupVisible) => true);
		editorInput.update((editorInput) => note.text);
		editorNoteKey.update((editorNoteKey) => note.id);
	};

	const svelteMarkdownOptions = {
		//https://marked.js.org/using_advanced#options
		headerIds: false,
		breaks: true
	};

	const deleteNote = () => {
		db['notes'].delete(note.id);
	};
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class="note" on:mouseover={showTags} on:mouseout={hideTags}>
	<div class="top">
		<div class="wrap">
			<Dropdown>
				<DropdownItem text={'Edit'} onclick={openPopup} />
				<DropdownItem text={'Delete'} onclick={deleteNote} danger={true} />
			</Dropdown>
		</div>
		<MdPreview><SvelteMarkdown source={note.text} options={svelteMarkdownOptions} /></MdPreview>
	</div>
	{#if isTagsVisible}
		<div class="tags">
			{#if note.tags.length}
				{#each note.tags as tag}
					<Badge text={tag} />
				{/each}
			{:else}
				<span class="no-tags">No tags</span>
			{/if}
		</div>
	{/if}
</div>

<style lang="sass">
	@use './../../vars'

	.note
		border: vars.$misc-border-default
		border-radius: vars.$misc-borderRadius
		color: vars.$color-text-2
		transition: boxs-shadow 60ms linear
		background: mix(vars.$color-dark-6, vars.$color-dark-7, 50%)
		position: relative
		min-height: calc(vars.$misc-padding-small * 2 + vars.$size-1 * 1.5 + 2px)
		.top
			padding: vars.$misc-padding-small vars.$misc-padding-default
			.wrap
				position: absolute
				top: vars.$misc-padding-small
				right: vars.$misc-padding-default
		.tags
			background: vars.$color-dark-7
			border-top: vars.$misc-border-default
			border-bottom-left-radius: vars.$misc-borderRadius
			border-bottom-right-radius: vars.$misc-borderRadius
			padding: vars.$misc-padding-small vars.$misc-padding-default
			display: flex
			align-items: center
			.no-tags
				font-size: 12px
				text-transform: uppercase
				color: vars.$color-text-3
				font-weight: bold
				letter-spacing: 0.25px
				height: 20px
				line-height: 18px
				display: flex
				align-items: center
</style>
