<script>
	export let text;
</script>

<div class="badge">
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
  background: transparentize(vars.$color-main, 0.8)
  color: lighten(vars.$color-main, 35%)
  padding: 0 10px
  border-radius: 4em
  display: inline-flex
  align-items: center
  justify-content: center
  font-weight: bold
  text-transform: uppercase
  letter-spacing: 0.25px
  border: 1px solid transparent
  &:not(:last-child)
    margin-right: 1em
  span
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
</style>
