import React from 'react';
import { INITIAL_STATE, AMVA_STATE_270deg, CAPSULE_STATE } from '../states';
import DeckGL from '@deck.gl/react';
import ReactMapGL from 'react-map-gl';
import Header from '../components/Header';
import Footer from '../components/Footer';

// A.M.V.A. Layers
import LayerDEM from '../layers/LayerDEM';
import LayerAMVAArcs from '../layers/LayerAMVAArcs';

// Capsule Layers
import LayerCapsule from '../layers/LayerCapsule';
import LayerPlants from '../layers/LayerPlants';

// Marker Layer
import LayerMarker from '../layers/LayerMarker';

export default function Map({
    inStreaming,
    setLoading,
    onCapsuleClick,
}) {
    const [currentView, setCurrentView] = React.useState('amva');
    const [viewState, setViewState] = React.useState(INITIAL_STATE.view_state);
    const [layers, setLayers] = React.useState(INITIAL_STATE.layers);
    const [mapStyle, setMapStyle] = React.useState(INITIAL_STATE.map_style);
    const [mapLoaded, setMapLoaded] = React.useState(false);

    return (
        <>
            <div style={{ opacity: (mapLoaded && !inStreaming) ? 1 : 0 }}>
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
                        if (!inStreaming) {
                            for (const layer_id of layers) {
                                if (layer.id.toLowerCase().startsWith(layer_id)) {
                                    return true;
                                }
                            }
                        }

                        return false;
                    }}
                    controller={true}
                    getTooltip={({ object }) => {
                        if (object && !inStreaming) {
                            if (object.id === 'layer_marker') {
                                return '¡Haz click aquí para ver la cápsula de cerca!';
                            } else if (object.id === 'layer_capsule') {
                                return '¡Haz click aquí para ver lo que ocurre dentro de la cápsula!';
                            }
                        }
                    }}
                    onClick={({ layer }) => {
                        if (layer && !inStreaming) {
                            if (layer.id === 'layer_marker') {
                                setCurrentView('capsule');
                                setViewState(CAPSULE_STATE.view_state);
                                setLayers(CAPSULE_STATE.layers);
                                setMapStyle(CAPSULE_STATE.map_style);
                            } else if (layer.id === 'layer_capsule') {
                                setCurrentView('amva');
                                setViewState(AMVA_STATE_270deg.view_state);
                                setLayers(AMVA_STATE_270deg.layers);
                                setMapStyle(AMVA_STATE_270deg.map_style);
                                onCapsuleClick();
                            }
                        }
                    }}
                >
                    <ReactMapGL
                        reuseMaps
                        mapStyle={mapStyle}
                        preventStyleDiffing={true}
                        onLoad={() => {
                            setMapLoaded(true);
                            setLoading(false);

                            if (currentView === 'amva') {
                                setViewState(AMVA_STATE_270deg.view_state);
                            }
                        }}
                    />
                </DeckGL>
            </div>
            {(mapLoaded && !inStreaming) && (
                <>
                    <Header
                        setViewState={setViewState}
                        setLayers={setLayers}
                        setMapStyle={setMapStyle}
                        onClick={(type) => setCurrentView(type)}
                    />
                    <Footer view={currentView} />
                </>
            )}
        </>
    );
}
