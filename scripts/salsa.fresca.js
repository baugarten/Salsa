(function(Salsa) {
  var endPoints = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7',
    'p', 'a', 'img'
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

  Salsa.Fresca.prototype.getEndpoint = function(node) {
    if (endPoints.indexOf(node && node.tagName && node.tagName.toLowerCase()) > -1) {
      return node;
    }
    if ($(node).text().length > 20) {
      return node;
    }
    return this.getEndpoint($(node).parent());
  };

  Salsa.Fresca.prototype.isContentBlock = function(node) {
    if ($(node).children().length === 0) {
      return true;
    }
    if (endPoints.indexOf(node && node.tagName && node.tagName.toLowerCase()) > -1) {
      return true;
    }
    var self = this,
        isBlock = true;;
    if ($(node).text().length > 50 && $(node).find().length < 20) {
      $(node).children().each(function(i, child) {
        if (self.hasContentBlock(child)) {
          isBlock = false;
        }
      });
      return isBlock;
    } 
    return false;
  };

  Salsa.Fresca.prototype.hasContentBlock = function(node) {
    if (this.isContentBlock(node)) {
      return true;
    }
    var res = false,
        self = this;
    $(node).children().each(function(i, child) {
      if (self.hasContentBlock(child)) {
        res = true;
        return true;
      }
    });
    return res;
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
