# leaflet-feature-legend
Create legends to describe the features in your Leaflet maps.

## Demo
<a href="https://aazuspan.github.io/leaflet-feature-legend/demo/index.html"><img src="https://i.imgur.com/XlHaYFE.jpg" title="Interactive demo" /></a>

## Requirements
- Tested with Leaflet v1.6.0

## Example usage
1.  Include the script and stylesheet in your `index.html`
```
<script src="https://cdn.jsdelivr.net/gh/aazuspan/leaflet-feature-legend/src/feature-legend.js"></script>
<link href="https://cdn.jsdelivr.net/gh/aazuspan/leaflet-feature-legend/src/feature-legend.css" rel="stylesheet" />
```

2. Create a Leaflet map and basemap
```
const myMap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
```

3. Create Leaflet markers
```
const customIcon = L.icon({ iconUrl: 'icons/red_triangle.png', iconSize: [15, 15] });
const defaultMarker = L.marker([51.505, -0.09], {}).addTo(myMap);
const iconMarker = L.marker([51.505, -0.115], { icon: customIcon }).addTo(myMap);
const circleMarker = L.circleMarker([51.515, -0.08], { color: 'red' }).addTo(myMap);
const dotMarker = L.circle([51.494, -0.08], { color: 'red' }).addTo(myMap);
```

4. Create the `items` object that will be included in the legend
```
const items = {
    "Default marker": defaultMarker,
    "Icon marker": iconMarker,
    "Circle marker": circleMarker,
    "Dot marker": dotMarker,
};
```

5. Create the legend, passing in `items` and `options`
```
const legend = L.control.featureLegend(items, {
    position: "bottomleft",
    title: "Shapes",
    maxSymbolSize: 18,
    minSymbolSize: 2,
    collapsed: true,
}).addTo(myMap);
```
[Legend items](#items)
## API
```
legend = L.control.featureLegend(items, options?);
```

### Items
- `items` is an object representing the layers that will be included in the legend. 
- Each property in `items` represents a feature, and should include the feature's label and a layer from which the feature's symbol will be generated.
  - Supported layer types are `L.Marker`, `L.CircleMarker`, or `L.Circle`. 
- Layers do not need to be added to the map to be included in the legend, so you can create dummy layers to represent a layer type.
  - For example, if your markers are built using an unsupported layer type like `L.GeoJSON`, you can create an `L.Marker` with the same icon to include in the legend.

### Options
`position`: Position of the legend. Default is `topright`. See L.Control in Leaflet documentation.<br/>
`title`: Title of the legend that will be displayed. Default is `Legend`. To remove the title, set to `null` or empty string.<br/>
`maxSymbolSize`: Maximum size, in pixels, of any dimension of a symbol to display in the legend. Larger symbols will be shrunk to this size. Default is `18`.<br/>
`minSymbolSize`: Minimum size, in pixels, of any dimension of a symbol to display in the legend. Smaller symbols will be enlarged to this size. Default is `1`.<br/>
`collapsed`: If true, the legend will be collapsed into an icon and expanded on mouse hover. Default is `false`. <br/>
