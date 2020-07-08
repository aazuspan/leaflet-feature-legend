L.Control.IconLegend = L.Control.extend({
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
        this._container = L.DomUtil.create('div', 'leaflet-control-legend');

        this._buildTitle();
        this._buildItems();
    },

    _buildTitle: function () {
        if (this.options.title) {
            let title = L.DomUtil.create('h3', 'leaflet-control-legend-title', this._container);
            title.innerHTML = this.options.title;
        }
    },

    _buildItems: function () {
        if (this.options.items) {
            for (let item in this.options.items) {
                let itemDiv = L.DomUtil.create('div', '', this._container);

                let itemIcon = L.DomUtil.create('img', 'leaflet-control-legend-icon', itemDiv);
                itemIcon.src = this.options.items[item].options.iconUrl;

                let itemTitle = L.DomUtil.create('span', '', itemDiv);
                itemTitle.innerHTML = item;
            }
        }
    },

    onAdd: function () {
        return this._container;
    },
})


L.control.iconLegend = function (options) {
    return new L.Control.IconLegend(options);
};
