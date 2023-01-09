<script>
	import Badge from './Badge.svelte';

	export let title;
	export let badges = [];
	export let badgeTextName;
	export let toggleBadge;
	export let isBadgeActive;
	export let noBadgesText = 'Nothing found';
	export let countBadges = (badges) => null;
</script>

<div class="badge-cloud">
	<h3>{title}</h3>
	<div class="cloud">
		{#if badges.length}
			{#each badges as badge}
				<Badge
					text={badge[`${badgeTextName}`]}
					isClickable={true}
					isActive={() => isBadgeActive(badge)}
					count={() => countBadges(badge)}
					on:click={() => toggleBadge(badge)}
				/>
			{/each}
		{:else}
			<span class="no-badges">{noBadgesText}</span>
		{/if}
	</div>
</div>

<style lang="sass">
	@use '../../vars'

.badge-cloud
	width: 100%
	min-height: vars.$size-4
	max-height: vars.$size-8
	border-top: vars.$misc-border-default
	padding-top: vars.$misc-padding-default
	h3
		color: vars.$color-text-2
		margin-bottom: vars.$misc-padding-default
	:global(.badge)
		margin-bottom: vars.$misc-padding-small
	.cloud
		.no-badges
			color: vars.$color-text-3
			font-style: italic
			font-size: 12px
</style>
