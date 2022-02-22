import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {

    
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    const center = getCenter(coordinates)
    
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        longitude: 51.521245,
        latitude: -0.109889,
        zoom: 11,
    });
    
    return (<ReactMapGL
        mapStyle="mapbox://styles/kameiryousuke/ckyld3n7q1c2814mpuup9lx9s"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}

    >
        {searchResults.map((result) => (
            <div key={result.long}>
                <Marker
                longitude={result.long}
                latitude={result.lati}
                offsetLeft={-20}
                offsetTop={-10}
                >
                    <p className="cursor-pointer text-2xl animate-bounce">📌</p>
                </Marker>
            </div>
            ))}

    </ReactMapGL>
    );
}

export default Map
