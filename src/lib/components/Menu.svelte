<script>
	import Button from '$lib/components/Button.svelte';
	import { isPopupVisible } from '$src/stores.js';
	import BadgeCloud from './BadgeCloud.svelte';
	import { liveQuery } from 'dexie';
	import { db } from '$src/db.js';

	const openPopup = (e) => {
		isPopupVisible.update((isPopupVisible) => true);
	};

	let tags;

	const notes = liveQuery(() => db['notes'].toArray());

	const loadTags = () => (tags = liveQuery(() => db['tags'].toArray()));

	$: $notes, loadTags();

	const toggleTag = async (tag) => {
		if (tag.isActive) {
			await db['tags'].update(tag.id, { isActive: 0 });
		} else {
			await db['tags'].update(tag.id, { isActive: 1 });
		}
	};

	const isTagActive = (tag) => $tags.filter((tagFilter) => tagFilter.isActive).includes(tag);

	const countTags = (tag) => {
		return $notes
			.map((note) => note.tags)
			.flat()
			.filter((tagFilter) => tagFilter === tag.name).length;
	};
</script>

<aside>
	<div class="logo">
		<h1>Marknotes</h1>
	</div>
	<div class="new">
		<Button text="New Note" onclick={openPopup} variant={'filled'} fullWidth={true} />
	</div>
	<BadgeCloud
		title={'Filter tags'}
		badges={$tags}
		badgeTextName={'name'}
		toggleBadge={toggleTag}
		isBadgeActive={isTagActive}
		noBadgesText={'No tags yet'}
		countBadges={countTags}
	/>
</aside>

<style lang="sass">
	@use '../../vars'

aside
	width: vars.$size-16
	position: fixed
	top: 0
	bottom: 0
	left: 0
	background: vars.$color-dark-8
	padding: 0 vars.$misc-padding-default
	.new, .logo
		height: vars.$size-4
		display: flex
		align-items: center
	.new
		justify-content: center
	.logo
		justify-content: flex-start
		border-bottom: 1px solid vars.$color-dark-5
		h1
			color: vars.$color-text-2
			font-family: "Roboto Slab"
			font-weight: 400
			user-select: none
</style>
