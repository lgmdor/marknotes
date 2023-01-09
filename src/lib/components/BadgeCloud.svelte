<script>
	import Badge from './Badge.svelte';

	export let title;
	export let badges;
	export let badgeTextName;
	export let toggleBadge;
</script>

<div class="badge-cloud">
	<h3>{title}</h3>
	<div class="cloud">
		{#each badges as badge}
			<Badge
				text={badge[`${badgeTextName}`]}
				isClickable={true}
				on:click={() => toggleBadge(badge)}
			/>
		{/each}
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
</style>
