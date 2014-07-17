'use strict';

// Configuring the Articles module
angular.module('codehubblogs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Codehubblogs', 'codehubblogs', 'dropdown', '/codehubblogs(/create)?');
		Menus.addSubMenuItem('topbar', 'codehubblogs', 'List Codehubblogs', 'codehubblogs');
		Menus.addSubMenuItem('topbar', 'codehubblogs', 'New Codehubblog', 'codehubblogs/create');
	}
]);