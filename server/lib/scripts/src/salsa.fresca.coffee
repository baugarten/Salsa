Salsa = Salsa or {}
endPoints = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7',
  'p', 'a', 'img'
]

Salsa.Fresca = () ->

Salsa.Fresca.prototype.asHTML = (element) ->
  $('<div>').append($(element).clone()).html()

Salsa.Fresca.prototype.hierarchy = (elm) ->
  if ($(elm).is('body') || $(elm).is('html'))
    return $(elm).prop('tagName')

  prefix = this.hierarchy.call(this, $(elm).parent())
  current = $(elm).parent().children($(elm).prop('tagName')).index($(elm)) + $(elm).prop('tagName')
  return "#{prefix}.#{current}"

Salsa.Fresca.prototype.each = (fn) ->
  this.findContentBlocks($("body"), fn)

Salsa.Fresca.prototype.getEndpoint = (node) ->
  if (endPoints.indexOf(node && node.tagName && node.tagName.toLowerCase()) > -1)
    return node

  if ($(node).text().length > 20)
    return node

  return this.getEndpoint($(node).parent())

Salsa.Fresca.prototype.isContentBlock = (node) ->
  if ($(node).children().length == 0)
    return true

  if (endPoints.indexOf(node && node.tagName && node.tagName.toLowerCase()) > -1)
    return true

  isBlock = true
  if ($(node).text().length > 50 && $(node).find().length < 20)
    $(node).children().each (i, child) =>
      if (@hasContentBlock(child))
        isBlock = false

    isBlock
  false

Salsa.Fresca.prototype.hasContentBlock = (node) ->
  if (@isContentBlock(node))
    return true

  res = false
  self = this
  $(node).children().each (i, child) =>
    if (@hasContentBlock(child))
      res = true
      return true
  res

Salsa.Fresca.prototype.findContentBlocks = (root, success) ->
  if (@isContentBlock(root))
    success.call(root, root)
  else
    $(root).children().each (index, child) =>
      @findContentBlocks(child, success)

