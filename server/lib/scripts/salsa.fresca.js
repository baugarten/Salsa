(function() {
  var Salsa, endPoints;

  Salsa = Salsa || {};

  endPoints = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'p', 'a', 'img'];

  Salsa.Fresca = function() {};

  Salsa.Fresca.prototype.asHTML = function(element) {
    return $('<div>').append($(element).clone()).html();
  };

  Salsa.Fresca.prototype.hierarchy = function(elm) {
    var current, prefix;
    if ($(elm).is('body') || $(elm).is('html')) {
      return $(elm).prop('tagName');
    }
    prefix = this.hierarchy.call(this, $(elm).parent());
    current = $(elm).parent().children($(elm).prop('tagName')).index($(elm)) + $(elm).prop('tagName');
    return "" + prefix + "." + current;
  };

  Salsa.Fresca.prototype.each = function(fn) {
    return this.findContentBlocks($("body"), fn);
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
    var isBlock,
      _this = this;
    if ($(node).children().length === 0) {
      return true;
    }
    if (endPoints.indexOf(node && node.tagName && node.tagName.toLowerCase()) > -1) {
      return true;
    }
    isBlock = true;
    if ($(node).text().length > 50 && $(node).find().length < 20) {
      $(node).children().each(function(i, child) {
        if (_this.hasContentBlock(child)) {
          return isBlock = false;
        }
      });
      isBlock;
    }
    return false;
  };

  Salsa.Fresca.prototype.hasContentBlock = function(node) {
    var res, self,
      _this = this;
    if (this.isContentBlock(node)) {
      return true;
    }
    res = false;
    self = this;
    $(node).children().each(function(i, child) {
      if (_this.hasContentBlock(child)) {
        res = true;
        return true;
      }
    });
    return res;
  };

  Salsa.Fresca.prototype.findContentBlocks = function(root, success) {
    var _this = this;
    if (this.isContentBlock(root)) {
      return success.call(root, root);
    } else {
      return $(root).children().each(function(index, child) {
        return _this.findContentBlocks(child, success);
      });
    }
  };

}).call(this);
