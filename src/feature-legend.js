L.Control.FeatureLegend = L.Control.extend({
    options: {
        position: 'topleft',
        title: 'Legend',
        items: {},
        maxSymbolSize: 18,
        minSymbolSize: 1
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
        this._buildContainer();
    },

    // Repurposed from Leaflet/Canvas.js to draw paths at a fixed location in the legend
    _drawCircle: function (layer, workingCanvas) {
        const ctx = workingCanvas.getContext('2d');
        let options = layer.options;

        let radiusOffset = 0;

        if (options.stroke && options.weight !== 0) {
            radiusOffset = options.weight;
        }

        let r = Math.max(Math.min(Math.round(layer._radius), (this.options.maxSymbolSize - radiusOffset) / 2), this.options.minSymbolSize);
        let x = this.options.maxSymbolSize / 2;

        ctx.beginPath();
        ctx.arc(x, x, r, 0, Math.PI * 2, false);

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
                let itemSymbol = L.DomUtil.create('i', null, itemDiv);

                // TODO: Clean this up
                itemSymbol.style.width = itemSymbol.style.height = this.options.maxSymbolSize.toString() + "px";

                if (itemLayer.options.icon) {
                    this._buildImageSymbol(itemSymbol, itemLayer);
                }
                else {
                    this._buildMarkerSymbol(itemSymbol, itemLayer);
                }

                let itemTitle = L.DomUtil.create('span', null, itemDiv);
                itemTitle.innerText = item;
            }
        }
    },

    // Build the legend symbol for a marker with an image icon (such as L.Marker)
    _buildImageSymbol: function (container, layer) {
        let itemImg = L.DomUtil.create('img', null, container);
        let icon = layer.getIcon();

        itemImg.onload = () => { this._rescaleSymbolImage(itemImg) };
        // TODO: Generate default path programatically in case the file name is changed within Leaflet
        itemImg.src = icon instanceof L.Icon.Default ? L.Icon.Default.imagePath + "marker-icon.png" : icon.options.iconUrl;
    },

    // Build the legend icon for a marker without an image icon (such as L.CircleMarker)
    _buildMarkerSymbol: function (container, layer) {
        let itemCanvas = L.DomUtil.create('canvas', null, container);
        itemCanvas.height = this.options.maxSymbolSize;
        itemCanvas.width = this.options.maxSymbolSize;
        this._drawCircle(layer, itemCanvas);
    },

    // Rescale an icon image
    _rescaleSymbolImage: function (itemImg) {
        let maxDimension = Math.max(itemImg.width, itemImg.height);
        let minDimension = Math.min(itemImg.width, itemImg.height);

        if (maxDimension > this.options.maxSymbolSize) {
            if (itemImg.width === maxDimension) {
                itemImg.width = this.options.maxSymbolSize;
            }
            else {
                itemImg.height = this.options.maxSymbolSize;
            }
        }
        else if (minDimension < this.options.minSymbolSize) {
            if (itemImg.width === minDimension) {
                itemImg.width = this.options.minSymbolSize;
            }
            else {
                itemImg.height = this.options.minSymbolSize;
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
