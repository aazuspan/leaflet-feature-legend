let myMap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

const blueIcon = L.icon({ iconUrl: 'icons/blue_circle.png', iconSize: [15, 15] });
const redIcon = L.icon({ iconUrl: 'icons/red_triangle.png', iconSize: [15, 15] });
const yellowIcon = L.icon({ iconUrl: 'icons/yellow_square.png', iconSize: [15, 15] });


L.marker([51.5, -0.09], { icon: blueIcon }).addTo(myMap);
L.marker([51.52, -0.091], { icon: redIcon }).addTo(myMap);
L.marker([51.505, -0.115], { icon: yellowIcon }).addTo(myMap);


const legend = L.control.featureLegend({
    position: "bottomleft",
    title: "Shapes",
    items: {
        "Blue circle": { icon: blueIcon, width: 18 },
        "Red triangle": { icon: redIcon },
        "Yellow square": { icon: yellowIcon, width: 18 },
    }
}).addTo(myMap);
