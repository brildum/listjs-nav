List.js Nav
===========

.. _List.js: http://listjs.com
.. _jQuery: http://jquery.com

List.js Nav wraps List.js_ and provides functionality
to convert simple HTML lists into feature-rich navigation menus.

Some of the features include:

* Filtering results based on text search
* Keyboard shortcuts
* Clean API to handle navigation-based events

.. NOTE::

    This library has 2 dependencies: jQuery_ and List.js_. The jQuery dependency could
    be easily removed if necessary with some limited work, but for now jQuery is used.

Examples
--------
::

    <div id="mylist">
        <input type="text" class="search"/>
        <ul class="list"></ul>
    </div>

    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="list.js"></script>
    <script type="text/javascript" src="list.nav.js"></script>

    <script type="text/javascript">
        var list = new List("mylist", {
            valueNames: ['id', 'name'],
            item: '<li><span class="id hidden"></span><span class="name"></span></li>'
        });
        var nav = new ListNav(list, {
            itemId: 'id',
            itemIdFromString: parseInt,
            highlightClass: 'highlight'
        });
        
        // Add items to the list nav
        var items = [
            { id: 1, name: 'First value' },
            { id: 2, name: 'Second value' }
        ];
        for (var i = 0, len = items.length; i < len; i++) {
            nav.add(items[i]);
        }
        
        // Attach event handlers when items are selected
        nav.on('listnav.selected', function(item) {
            console.log("Removing item ID: " + item.id + " Name: " + item.name);
            nav.remove(item.id);
        });
    </script>
