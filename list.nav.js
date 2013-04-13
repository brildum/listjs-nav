window.ListNav = (function($) {
  var ListNav,
    ENTER = 13,
    UP = 38,
    DOWN = 40,
    SELECTED = 'listnav.selected',
    slice = Array.prototype.slice;

  ListNav = function(list, options) {
    this.list = list;
    this.options = this._setOptions(options);
    this.$list = $(this.list.listContainer).find(".list");
    this.$search = $(this.list.listContainer).find(".search");
    this.isSearchEnabled = this.$search.length > 0;

    var self = this;
    this.$list.on('mouseenter', 'li', function() {
      self._clearHighlights();
      $(this).addClass(self.options.highlightClass);
    });

    this.$list.on('mouseleave', function() {
      self._clearHighlights();
      if (self.isSearchEnabled && document.activeElement === self.$search[0]) {
        self._highlightFirstItem();
      }
    });

    this.$list.on('click', 'li', function() {
      var $item = $(this),
        itemId = self._getItemId($item);
      $(self).triggerHandler(SELECTED, [self._getItem(itemId)]);
    });

    if (this.isSearchEnabled) {
      this.$search.on('focus', function() {
        self._clearHighlights();
        self._highlightFirstItem();
      });

      this.$search.on('blur', function() {
        self._clearHighlights();
      });

      this.$search.on('keydown', function(evt) {
        var $item, $next, itemId;
        switch (evt.keyCode) {
        case ENTER:
          $item = self._getHighlightedItem();
          if ($item) {
            itemId = self._getItemId($item);
            $(self).triggerHandler(SELECTED, [self._getItem(itemId)]);
          }
          evt.preventDefault();
          break;
        case UP:
          $item = self._getHighlightedItem();
          if ($item) {
            $next = $item.prev();
            if ($next.length > 0) {
              $item.removeClass(self.options.highlightClass);
              $next.addClass(self.options.highlightClass);
              $next[0].scrollIntoView(false);
            }
          } else {
            self._highlightFirstItem();
          }
          evt.preventDefault();
          break;
        case DOWN:
          $item = self._getHighlightedItem();
          if ($item) {
            $next = $item.next();
            if ($next.length > 0) {
              $item.removeClass(self.options.highlightClass);
              $next.addClass(self.options.highlightClass);
              $next[0].scrollIntoView(false);
            }
          } else {
            self._highlightFirstItem();
          }
          evt.preventDefault();
          break;
        }
      });

      this.$search.on('keyup', function(evt) {
        switch (evt.keyCode) {
        case ENTER:
        case UP:
        case DOWN:
          evt.preventDefault();
          break;
        default:
          self._clearHighlights();
          self._highlightFirstItem();
        }
      });
    }
  };

  ListNav.prototype.reset = function() {
    if (this.isSearchEnabled) {
      this.$search.val("");
    }
    $.map(this.list.items, function(item) {
      item.show();
    });
    this._clearHighlights();
  };

  ListNav.prototype.on = function(eventType, handler) {
    var self = this;
    $(this).on(eventType, function() {
      handler.apply(self, slice.call(arguments, 1));
    });
  };

  ListNav.prototype.add = function(item) {
    var id = item[this.options.itemId];
    this.list.remove(this.options.itemId, id);
    this.list.add(item);
  };

  ListNav.prototype.remove = function(itemId) {
    this.list.remove(this.options.itemId, itemId);
  };

  ListNav.prototype.DEFAULT_OPTIONS = {
    itemId: 'id',
    itemIdFromString: String,
    highlightClass: 'highlight'
  };

  ListNav.prototype._setOptions = function(options) {
    return $.extend({}, this.DEFAULT_OPTIONS, options);
  };

  ListNav.prototype._highlightFirstItem = function() {
    this.$list.find('li:first').addClass(this.options.highlightClass);
  };

  ListNav.prototype._clearHighlights = function() {
    this.$list.find('.' + this.options.highlightClass)
      .removeClass(this.options.highlightClass);
  };

  ListNav.prototype._getHighlightedItem = function() {
    var $item = this.$list.find('.' + this.options.highlightClass + ':first');
    if ($item.length == 0) {
      $item = this.$list.find('li:first');
    }
    return $item.length > 0 ? $item : null;
  };

  ListNav.prototype._getItemId = function($item) {
    return this.options.itemIdFromString($item.find('.' + this.options.itemId).text());
  };

  ListNav.prototype._getItem = function(itemId) {
    return this.list.get(this.options.itemId, itemId).values();
  };

  return ListNav;
})(jQuery);
