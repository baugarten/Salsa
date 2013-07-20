// Allow wysihtml5 to work with div instead of textarea
wysihtml5.views.Textarea.prototype.getValue = function(parse) {
    var value = this.element.innerHTML

    if (parse) {
      value = this.parent.parse(value)
    } else {
      value = $('<div/>').html(this.element.innerHTML).text()
    }

    return value
}

wysihtml5.views.Textarea.prototype.setValue = function(html, parse) {
    var method = 'innerHTML'

    if (parse) {
      method = 'innerText'
      html = this.parent.parse(html)
    }

    this.element[method] = html
}
