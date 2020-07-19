# leaflet-feature-legend
Create legends to describe the features in your Leaflet maps.

## Demo
<a href="https://aazuspan.github.io/leaflet-feature-legend/demo/index.html"><img src="https://raw.githubusercontent.com/aazuspan/leaflet-feature-legend/master/demo/example.jpg" title="Interactive demo" /></a>

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
```

4. Create the `items` object that will be included in the legend
```
const items = {
    "Default marker": defaultMarker,
    "Icon marker": iconMarker,
    "Circle marker": circleMarker,
};
```

5. Create the legend, passing in `items` and `options`
```
const legend = L.control.featureLegend(items, {
    position: "bottomleft",
    title: "Shapes",
    symbolContainerSize: 24,
    symbolScaling: "clamped",
    maxSymbolSize: 24,
    minSymbolSize: 2,
    collapsed: true,
    drawShadows: true,
}).addTo(myMap);
```

## L.Control.FeatureLegend

### Creation
| Factory | Description |
| :--- | :--- |
| L.control.featureLegend(`items`, `options?`) | Creates a legend of the given items with any selected options. |

### Items
- `items` is an `object` representing the layers that will be included in the legend. 
- Each property in `items` represents a feature, and should include the feature's label and a layer from which the feature's symbol will be generated.
  - Supported layer types are `L.Marker`, `L.CircleMarker`, or `L.Circle`. 
  - Layers that use an `L.Icon` MUST have a defined `iconSize`. An error will be thrown for icons without an `iconSize`. 
- Layers do not need to be added to the map to be included in the legend, so you can create dummy layers to represent a layer type.
  - For example, if your markers are built using an unsupported layer type like `L.GeoJSON`, you can create an `L.Marker` with the same icon to include in the legend.

### Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| position | String | 'topleft' | Position of the legend. Possible values are 'topleft', 'topright', 'bottomleft', or 'bottomright'. |
| title | String | 'Legend' | Title of the legend that will be displayed. To remove the title, set to `null` or empty string. |
| symbolContainerSize | Number | 24 | Size, in pixels, of the square container element for each symbol. |
| symbolScaling | String | 'clamped' | Determines how symbols are rescaled to fit in the legend. Possible values are 'proportional', 'maximum', 'clamped', or 'none'. See [Symbol Scaling](#symbol-scaling) for an explanation of each option. |
| maxSymbolSize | Number | 24 | Upper limit of symbol size, in pixels. See [Symbol Scaling](#symbol-scaling) for an explanation of how these options affect symbol size. Setting `maxSymbolSize` greater than `symbolContainerSize` is not recommended, as it may cause overlapping and other issues. |
| minSymbolSize | Number | 2 | Lower limit of symbol size, in pixels. See [Symbol Scaling](#symbol-scaling) for an explanation of how these options affect symbol size. |
| collapsed | Boolean | false | If `true`, the legend will be collapsed into an icon and expanded on mouse hover. |
| drawShadows | Boolean | false | If `true`, layers using an `L.Icon` with a defined `shadowUrl` (such as the default `L.Icon`) will include the shadow in the legend symbol. |

#### Symbol Scaling
Different symbol scaling options are supported, and are defined using the `symbolScaling` option. The chosen symbol scaling option also affects how `maxSymbolSize` and `minSymbolSize` are implemented. These symbol scaling options apply to image icons and markers. All scaling options maintain the aspect ratio of markers and icons. <br />

| Value | Description |
| :--- | :--- |
| proportional | All symbols are linearly scaled between `minSymbolSize` and `maxSymbolSize`. Relative scale between symbols is preserved. If you have symbols that are too large for the legend, but maintaining relative sizes is important to distinguishing symbols, this may be the best option. |
| maximum | All symbols are scaled exactly to the `maxSymbolSize`. All symbols will appear the same size. If you have symbols that are hard to distinguish and the relative size does not matter, this may be the best option. |
| clamped | Symbols larger than `maxSymbolSize` are scaled down to `maxSymbolSize`. Symbols smaller than `minSymbolSize` are scaled up to `minSymbolSize`. This is the simplest option to make sure symbols fit within the symbol container. However, relative scale between symbols can be misleading if some are clamped and others are not. |
| none | No scaling is applied, and symbols are left in their native size. This may cause overlapping or other issues, but gives the user full control of scaling. |

### Methods
| Method | Returns | Description |
| :--- | :--- | :--- |
| expand() | `null` | Expand the legend container if collapsed |
| collapse() | `null` | Collapse the legend container if expanded |
