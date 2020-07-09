L.Control.FeatureLegend = L.Control.extend({
    options: {
        position: 'topleft',
        title: 'Legend',
        items: {},
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
        this._buildContainer();
    },

    _buildContainer: function () {
        this._container = L.DomUtil.create('div', 'leaflet-control-feature-legend');

        this._buildTitle();
        this._buildItems();
    },

    _buildTitle: function () {
        if (this.options.title) {
            let title = L.DomUtil.create('h3', 'leaflet-control-feature-legend-title', this._container);
            title.innerText = this.options.title;
        }
    },

    _buildItems: function () {
        if (this.options.items) {
            for (let item in this.options.items) {
                let itemOptions = this.options.items[item];

                let itemDiv = L.DomUtil.create('div', '', this._container);

                let itemIcon = L.DomUtil.create('img', 'leaflet-control-feature-legend-icon', itemDiv);
                try {
                    itemIcon.src = itemOptions.icon.options.iconUrl;

                    // Override image dimensions if they are provided
                    if (itemOptions.width) {
                        itemIcon.width = itemOptions.width;
                    }
                    if (itemOptions.height) {
                        itemIcon.height = itemOptions.height;
                    }
                }
                catch (error) {
                    throw ('Error: Item icons must be type L.Icon with a defined iconUrl.');
                }

                let itemTitle = L.DomUtil.create('span', '', itemDiv);
                itemTitle.innerText = item;
            }
        }
    },

    onAdd: function () {
        return this._container;
    },
})


L.control.featureLegend = function (options) {
    return new L.Control.FeatureLegend(options);
};
