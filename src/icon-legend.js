L.Control.IconLegend = L.Control.extend({
    options: {
        position: 'topleft',
        title: 'Legend',
        items: {},
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
    },

    onAdd: function () {
        this._container = L.DomUtil.create('div', 'leaflet-control-legend');

        let title = this.options.title ?
            `
            <h4 class="leaflet-control-legend-title">
                ${this.options.title}
            </h4>
            `
            :
            "";

        let items = ""

        for (let item in this.options.items) {
            let itemElement = `
                <div>
                    <img src="${this.options.items[item].options.iconUrl}" class="leaflet-control-legend-icon" style='background:rgb(68, 140, 203);'></img>
                    <span>${item}</span>
                </div>
            `
            items += itemElement;
        }

        this._container.innerHTML = `
            ${title}
            ${items}
            `;
        return this._container;
    },

    onRemove: function (map) {
        L.DomUtil.remove(this._container);
    }
})


L.control.iconLegend = function (options) {
    return new L.Control.IconLegend(options);
};
