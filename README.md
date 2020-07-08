# leaflet-feature-legend
A Leaflet plugin for creating feature legends.

### Example
```
// Leaflet icons are used to create the legend
const blueIcon = L.icon({ iconUrl: 'icons/blue_circle.png', iconSize: [15, 15] });
const redIcon = L.icon({ iconUrl: 'icons/red_triangle.png', iconSize: [15, 15] });
const yellowIcon = L.icon({ iconUrl: 'icons/yellow_square.png', iconSize: [15, 15] });

L.marker([51.5, -0.09], { icon: blueIcon }).addTo(myMap);
L.marker([51.52, -0.091], { icon: redIcon }).addTo(myMap);
L.marker([51.505, -0.115], { icon: yellowIcon }).addTo(myMap);

// Create your custom legend here
const legend = L.control.iconLegend({
    position: "bottomleft",
    title: "Shapes",
    items: {
        "Blue circle": { icon: blueIcon, width: 18 },
        "Red triangle": { icon: redIcon },
        "Yellow square": { icon: yellowIcon, width: 18 },
    }
}).addTo(myMap);
```
<a href="https://aazuspan.github.io/leaflet-feature-legend/demo/index.html"><img src="https://i.imgur.com/UIgLgko.jpg" title="Interactive demo" /></a>

