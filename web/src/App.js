import React from 'react';
import { INITIAL_STATE, AMVA_STATE_270deg } from './states';
import Loader from './components/Loader';
import DeckGL from '@deck.gl/react';
import ReactMapGL from 'react-map-gl';
import Header from './components/Header';
import Player from './components/Player';
import Countdown from './components/Countdown';

// A.M.V.A. Layers
import LayerDEM from './layers/LayerDEM';
import LayerAMVAArcs from './layers/LayerAMVAArcs';

// Capsule Layers
import LayerCapsule from './layers/LayerCapsule';
import LayerPlants from './layers/LayerPlants';

// Marker Layer
import LayerMarker from './layers/LayerMarker';

function App() {
    const [viewState, setViewState] = React.useState(INITIAL_STATE.view_state);
    const [layers, setLayers] = React.useState(INITIAL_STATE.layers);
    const [mapStyle, setMapStyle] = React.useState(INITIAL_STATE.map_style);
    const [mapLoaded, setMapLoaded] = React.useState(false);
    const [videoActive, setVideoActive] = React.useState(false);

    return (
        <>
            <Loader isActive={!mapLoaded} />
            <div style={{ opacity: mapLoaded ? 1 : 0 }}>
                <DeckGL 
                    initialViewState={viewState}
                    layers={[
                        LayerAMVAArcs,
                        LayerDEM,
                        LayerCapsule,
                        LayerMarker,
                        LayerPlants
                    ]}
                    layerFilter={({ layer }) => {
                        for (const layer_id of layers) {
                            if (layer.id.toLowerCase().startsWith(layer_id)) {
                                return true;
                            }
                        }

                        return false;
                    }}
                    controller={true}
                    onClick={setViewState}
                >
                    <ReactMapGL
                        reuseMaps
                        mapStyle={mapStyle}
                        preventStyleDiffing={true}
                        onLoad={() => {
                            setMapLoaded(true);
                            setViewState(AMVA_STATE_270deg.view_state);
                        }}
                    />
                </DeckGL>
            </div>
            {mapLoaded && (
                <>
                    <Header
                        setViewState={setViewState}
                        setLayers={setLayers}
                        setMapStyle={setMapStyle}
                        onClick={(type) => setVideoActive(type === 'capsule')}
                    />
                    <Player active={videoActive} onVideoEnded={() => setVideoActive(false)} />
                    <Countdown />
                </>
            )}
        </>
    );
}

export default App;
