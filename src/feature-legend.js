L.Control.FeatureLegend = L.Control.extend({
    options: {
        position: 'topleft',
        title: 'Legend',
        items: {},
        maxIconSize: 18,
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
        this._buildContainer();
    },

    // Stolen directly from Leaflet/Canvas.js, but repurposed to draw at a fixed location in the legend
    _drawCircle: function (layer) {
        const ctx = this._canvas.getContext('2d');
        let options = layer.options;

        let radiusOffset = 0;

        if (options.stroke && options.weight !== 0) {
            radiusOffset = options.weight;
        }

        let r = Math.min(Math.round(layer._radius), (this.options.maxIconSize - radiusOffset) / 2);
        let s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;
        let x = this.options.maxIconSize / 2;

        ctx.beginPath();
        ctx.arc(x, x / s, r, 0, Math.PI * 2, false);

        if (options.fill) {
            ctx.globalAlpha = options.fillOpacity;
            ctx.fillStyle = options.fillColor || options.color;
            ctx.fill(options.fillRule || 'evenodd');
        }

        if (options.stroke && options.weight !== 0) {
            if (ctx.setLineDash) {
                ctx.setLineDash(layer.options && layer.options._dashArray || []);
            }
            ctx.globalAlpha = options.opacity;
            ctx.lineWidth = options.weight;
            ctx.strokeStyle = options.color;
            ctx.lineCap = options.lineCap;
            ctx.lineJoin = options.lineJoin;
            ctx.stroke();
        }
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
                let itemLayer = this.options.items[item];

                if (!this._layerIsSupported(itemLayer)) {
                    throw new Error(`Error: "${item}" is not a supported marker. Use only L.Marker, L.CircleMarker, or L.Circle.`);
                }

                let itemDiv = L.DomUtil.create('div', null, this._container);

                let icon = null;

                try {
                    // TODO: Add support for Leaflet default marker
                    icon = itemLayer.getIcon();
                }
                catch (error) {
                }

                // Markers with icons
                if (icon) {
                    let itemIcon = L.DomUtil.create('img', 'leaflet-control-feature-legend-icon', itemDiv);

                    try {
                        itemIcon.src = icon.options.iconUrl;
                        console.log(itemIcon.src)
                        itemIcon.width = this.options.maxIconSize;
                    }
                    catch (error) {
                        throw (`Error: "${item}" has an invalid icon. Icons must be type L.Icon.`);
                    }
                }

                // Markers without icons
                else {
                    this._canvas = L.DomUtil.create('canvas', "leaflet-control-feature-legend-icon", itemDiv);
                    this._canvas.height = this.options.maxIconSize;
                    this._canvas.width = this.options.maxIconSize;
                    this._drawCircle(itemLayer);
                }

                let itemTitle = L.DomUtil.create('span', '', itemDiv);
                itemTitle.innerText = item;
            }
        }
    },

    // Check if a given layer belongs to a class that can be added to the legend
    _layerIsSupported: function (layer) {
        if (layer instanceof L.CircleMarker || layer instanceof L.Circle || layer instanceof L.Marker) {
            return true;
        }
        return false;
    },

    onAdd: function () {
        return this._container;
    },
})


L.control.featureLegend = function (options) {
    return new L.Control.FeatureLegend(options);
};
