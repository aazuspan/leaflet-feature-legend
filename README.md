# leaflet-feature-legend
A Leaflet plugin for creating legends of features. Currently, this plugin supports L.Marker (with default or custom image icons), L.CircleMarker, and L.Circle layers.

### Example
```
const customIcon = L.icon({ iconUrl: 'icons/red_triangle.png', iconSize: [15, 15] });

const defaultMarker = L.marker([51.505, -0.09], {}).addTo(myMap);
const iconMarker = L.marker([51.505, -0.115], { icon: customIcon }).addTo(myMap);
const circleMarker = L.circleMarker([51.515, -0.08], { color: 'red' }).addTo(myMap);
const dotMarker = L.circle([51.494, -0.08], { color: 'red' }).addTo(myMap);

const legend = L.control.featureLegend({
    position: "bottomleft",
    title: "Shapes",
    items: {
        "Default marker": defaultMarker,
        "Icon marker": iconMarker,
        "Circle marker": circleMarker,
        "Dot marker": dotMarker,
    },
    maxIconSize: 18,
    minIconSize: 2,
}).addTo(myMap);
```
<a href="https://aazuspan.github.io/leaflet-feature-legend/demo/index.html"><img src="https://i.imgur.com/XlHaYFE.jpg" title="Interactive demo" /></a>

