import React from 'react';
import Loader from './components/Loader';
import DeckGL from '@deck.gl/react';
import ReactMapGL from 'react-map-gl';
import Countdown from './components/Countdown';

//import LayerDelanauyAMVA from './layers/DelanauyAMVA';
//import LayerDEM from './layers/DEMLayer';
import LayerCapsula from './layers/CapsulaLayer';
import LayerMata from './layers/MataLayer';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -75.552464,
    latitude: 6.326047,
    zoom: 11,
    pitch: 60,
    bearing: -60
};

function App({
    texture = null,
    wireframe = true,
    initialViewState = INITIAL_VIEW_STATE,
    mapStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
}) {
    const [mapLoaded, setMapLoaded] = React.useState(false);

    return (
        <>
            <Loader isActive={!mapLoaded} />
            <div style={{ opacity: mapLoaded ? 1 : 0 }}>
                <DeckGL 
                    initialViewState={initialViewState}
                    controller={true}
                    layers={[LayerCapsula, LayerMata]}
                >
                    <ReactMapGL
                        reuseMaps
                        mapStyle={mapStyle}
                        preventStyleDiffing={true}
                        onLoad={() => setMapLoaded(true)}
                    />
                </DeckGL>
            </div>
            {mapLoaded && <Countdown />}
        </>
    );
}

export default App;
