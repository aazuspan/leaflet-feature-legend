# leaflet-feature-legend
Create legends to describe the features in your Leaflet maps.

## Demo
<a href="https://aazuspan.github.io/leaflet-feature-legend/demo/index.html"><img src="https://i.imgur.com/XlHaYFE.jpg" title="Interactive demo" /></a>

## Requirements
- Features in the legend must be type `L.Marker`, `L.CircleMarker`, or `L.Circle`
- Only tested with Leaflet v1.6.0

## Features
- Support for paths and custom image icons
- Collapsible control
- Symbols are automatically sized, but can be restricted to maximum and minimum sizes

## API
```
legend = L.control.featureLegend(options);
```

### Example usage
```
// Build the features that will be included in the legend
const customIcon = L.icon({ iconUrl: 'icons/red_triangle.png', iconSize: [15, 15] });
const defaultMarker = L.marker([51.505, -0.09], {}).addTo(myMap);
const iconMarker = L.marker([51.505, -0.115], { icon: customIcon }).addTo(myMap);
const circleMarker = L.circleMarker([51.515, -0.08], { color: 'red' }).addTo(myMap);
const dotMarker = L.circle([51.494, -0.08], { color: 'red' }).addTo(myMap);

// Create the legend
const legend = L.control.featureLegend({
    position: "bottomleft",
    title: "Shapes",
    items: {
        "Default marker": defaultMarker,
        "Icon marker": iconMarker,
        "Circle marker": circleMarker,
        "Dot marker": dotMarker,
    },
    maxSymbolSize: 18,
    minSymbolSize: 2,
    collapsed: true,
}).addTo(myMap);
```

### Options
`position`: Position of the legend. Default is `topright`. See L.Control in Leaflet documentation.<br/>
`title`: Title of the legend that will be displayed. Default is `Legend`. To remove the title, set to `null` or empty string.<br/>
`items`: Object with feature labels as keys and feature layers as values.<br/>
`maxSymbolSize`: Maximum size, in pixels, of any dimension of a symbol to display in the legend. Larger symbols will be shrunk to this size. Default is `18`.<br/>
`minSymbolSize`: Minimum size, in pixels, of any dimension of a symbol to display in the legend. Smaller symbols will be enlarged to this size. Default is `1`.<br/>
`collapsed`: If true, the legend will be collapsed into an icon and expanded on mouse hover. Default is `false`.
