<div class="md-preview">
	<slot />
</div>

<style global lang="sass">
  @use '../../vars'

  $bg-dark: transparentize(#141517, 0.6)
  $border: 1px solid #ffffff22

  .md-preview
    line-height: calc(1em + 1ex)
    :global(blockquote)
      padding: 0 1em
      color: #909296
      border-left: 0.25em solid #2C2E33
    :global(hr)
      border: $border
    :global(p), :global(ul), :global(ol), :global(pre), :global(table)
      margin-bottom: 1rem
    :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6)
      border-bottom: $border
      padding-bottom: 0.3em
      line-height: 1.25
      margin-bottom: 1rem
      margin-top: 1.5rem
    :global(code)
      background: #2C2E33
    :global(pre)
      word-wrap: normal
      background: $bg-dark
      padding: 1rem
      overflow: auto
      line-height: 1.45
      border-radius: 4px
      :global(code)
        background: transparent
    :global(ul), :global(ol)
      margin-left: 2em
    :global(a)
      color: #339AF0
    :global(table)
      border-spacing: 0
      border-collapse: collapse
      :global(thead)
        :global(tr)
          :global(th)
            padding: 6px 13px
            border: $border
      :global(tbody)
        :global(tr)
          :global(td)
            padding: 6px 13px
            border: $border
        :global(tr:nth-child(even))
          background: $bg-dark
  
  :global(.md-preview>:first-child)
    margin-top: 0!important
  :global(.md-preview>:last-child)
    margin-bottom: 0!important
</style>
