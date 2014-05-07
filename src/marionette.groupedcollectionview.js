Marionette.GroupedCollectionView = (function(Marionette, Backbone, _) {

    return Marionette.CollectionView.extend({
        initialize: function() {
            var collection = this.collection;
            this.listenTo(collection, 'add', this._add);
            this.listenTo(collection, 'remove', this._remove);
            this.listenTo(collection, 'reset', this._reset);

            // ensure there is a groupByKey option.
            this.groupByKey = this._getGroupByKey();

            var groups = this._groupByKey(collection);
            this.collection = new Backbone.Collection(groups);
        },

        buildItemView: function(item, ItemViewType, itemViewOptions) {
            // the collection view keeps a reference between the model and the view based on the model,
            // thus it's important that model used in the view is the same as the model kept in
            // the collection; otherwise we won't be able to remove the child view.
            var options = _.extend({ model: item, collection: item.entries }, itemViewOptions);
            return new ItemViewType(options);
        },

        _add: function(model, collection, options) {
            var group = this._findGroupByModel(model);
            if (group) {
                group.entries.add(model);
            } else {
                group = this._createGroupModel([ model ], model.get(this.groupByKey));
                this.collection.add(group);
            }
        },

        _remove: function(model, collection, options) {
            var group = this._findGroupByModel(model);
            group.entries.remove(model);

            if (group.entries.length === 0) {
                this.collection.remove(group);
            }
        },

        _reset: function(collection, options) {
            var groups = this._groupByKey(collection);
            this.collection.reset(groups);
        },

        _createGroupModel: function(entries, groupByValue) {
            var group = new Backbone.Model();
            group.set(this.groupByKey, groupByValue);
            group.entries = new Backbone.Collection(entries);

            var result = this._pickAdditionalValues(group);
            group.set(result);

            return group;
        },

        _getGroupByKey: function() {
            var groupByKey = Marionette.getOption(this, 'groupByKey');
            if (!groupByKey) {
                throw new Error('A `groupByKey` must be specified');
            }

            return groupByKey;
        },

        _groupByKey: function(collection) {
            var key = this.groupByKey;
            var group = collection.groupBy(key);

            return _.map(group, this._createGroupModel, this);
        },

        _findGroupByModel: function(model) {
            var key = this.groupByKey;
            return this.collection.find(function(g) {
                return g.get(key) === model.get(key);
            });
        },

        _pickAdditionalValues: function(group) {
            var additionalKeys = Marionette.getOption(this, 'additionalKeys');
            var keys = _.isArray(additionalKeys) ? additionalKeys : [];

            if (keys.length === 0) {
                return {};
            }

            var entry = group.entries.at(0);
            var data = entry.toJSON();

            var args = [ data ];
            args.push.apply(args, keys.slice(0));

            return _.extend({}, _.pick.apply(null, args));
        }
    });

})(Marionette, Backbone, _);