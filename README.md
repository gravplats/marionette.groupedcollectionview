# Marionette.GroupedCollectionView

Group and display models by a given key.

## Usage

	var ItemView = Marionette.ItemView.extend({
		template: '#item-view-template'
	});
	
	var GroupedItemView = Marionette.CompositeView.extend({
		template: '#grouped-item-view-template',
		
		itemView: ItemView,
		
		itemViewContainer: '[data-collection-view]'
	});

	var GroupedCollectionView = Marionette.GroupedCollectionView.extend({
		itemView: GroupedItemView,
		
		groupByKey: 'date'
	});
	
	var data = [
		{ date: '2014-01-01', text: 'A' },
		{ date: '2014-01-01', text: 'B' },
		{ date: '2014-01-02', text: 'C' },
		{ date: '2014-01-03', text: 'D' }
	];
	
	var collection = new Backbone.Collection(data);
	var view = new GroupedCollectionView({ collection: collection });
	
	// show view in region.	

## License

Licensed under [MIT](http://opensource.org/licenses/mit-license.php). Please refer to LICENSE for more information.