/**
 *
 */
(function(Salsa) {
  var endPoints = [
    'h1', 'h2', 'h3',
    'div', 'p'
  ];

  Salsa.Fresca = function() {
  };

  Salsa.Fresca.prototype.asHTML = function(element) {
    return $('<div>').append($(element).clone()).html();
  };

  Salsa.Fresca.prototype.hierarchy = function(elm) {
    if ($(elm).is('body') || $(elm).is('html')) {
      return $(elm).prop('tagName');
    }
    var prefix = this.hierarchy.call(this, $(elm).parent()),
        current = $(elm).parent().children($(elm).prop('tagName')).index($(elm)) + $(elm).prop('tagName');
    return prefix + '.' + current;
  };

  Salsa.Fresca.prototype.each = function(fn) {
    this.findContentBlocks($("body"), fn);
  };

  Salsa.Fresca.prototype.isContentBlock = function(node) {
    return endPoints.indexOf(node && node.tagName && node.tagName.toLowerCase()) > -1;
  };

  Salsa.Fresca.prototype.findContentBlocks = function(root, success) {
    var self = this;
    if (self.isContentBlock(root)) {
      success.call(root, root);
    } else {
      $(root).children().each(function(index, child) {
        self.findContentBlocks(child, success);
      });
    }
  };
})(window.Salsa = window.Salsa || {});
