<script>
	export let text;
	export let isClickable = false;
	export let isActive = true;

	const toggleIsActive = () => {
		isActive = !isActive;
	};
</script>

<div
	class="badge"
	class:isClickable
	class:isActive
	on:click={toggleIsActive}
	on:click
	aria-hidden="true"
>
	<span>
		{text}
	</span>
</div>

<style lang="sass">
  @use './../../vars'

.badge
  font-size: 12px
  height: 20px
  line-height: 18px
  padding: 0 10px
  border-radius: 4em
  display: inline-flex
  align-items: center
  justify-content: center
  text-transform: uppercase
  letter-spacing: 0.25px
  border: 1px solid transparent
  background: vars.$color-dark-6
  color: vars.$color-text-3
  font-weight: bold
  user-select: none
  transition: all 60ms linear
  &:not(:last-child)
    margin-right: 1em
  span
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  &.isClickable
    cursor: pointer
  &.isActive
    background: transparentize(vars.$color-main, 0.8)
    color: lighten(vars.$color-main, 35%)
</style>
