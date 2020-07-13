let myMap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

const redIcon = L.icon({ iconUrl: 'icons/red_triangle.png', iconSize: [15, 15] });

const defaultMarker = L.marker([51.505, -0.09], {}).addTo(myMap);
const iconMarker = L.marker([51.505, -0.115], { icon: redIcon }).addTo(myMap);
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
