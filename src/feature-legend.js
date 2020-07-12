L.Control.FeatureLegend = L.Control.extend({
    options: {
        position: 'topleft',
        title: 'Legend',
        items: {},
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
        this._buildContainer();
        this.testDraw();
    },

    // This works for cirlce markers or circles. Method is taken directly from Leaflet/Canvas.js
    testDraw: function () {
        let layer = L.circleMarker([51.51, -0.09], { color: 'red', pane: 'popupPane' }).addTo(myMap);
        this._drawCircle(layer);
    },

    // Stolen directly from Leaflet/Canvas.js, but repurposed to draw at a fixed location in the legend
    _drawCircle: function (layer) {
        // const myCanvas = document.getElementById('my-house');
        const ctx = this._canvas.getContext('2d');

        let r = Math.max(Math.round(layer._radius), 1);
        let s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;

        // Specify position of the marker in the canvas here
        let x = 20;
        let y = 20;

        ctx.beginPath();
        ctx.arc(x, y / s, r, 0, Math.PI * 2, false);

        var options = layer.options;

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

            this._canvas = L.DomUtil.create('canvas', '', title);
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
