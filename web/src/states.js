import { FlyToInterpolator } from '@deck.gl/core';

export const INITIAL_STATE = {
    view_state: {
        longitude: -75.552464,
        latitude: 6.326047,
        zoom: 10.5,
        bearing: -60,
    },
    layers: ['layer_amva_points', 'layer_dem', 'layer_delanauy_amva'],
};

const transitionDuration = 2500;

export const AMVA_STATE = {
    view_state: {
        longitude: -75.552464,
        latitude: 6.326047,
        zoom: 10.5,
        bearing: -60,
        transitionDuration,
        transitionInterpolator: new FlyToInterpolator(),
    },
    layers: ['layer_amva_points', 'layer_dem', 'layer_delanauy_amva'],
};

export const CAPSULE_STATE = {
    view_state: {
        longitude: -75.579734,
        latitude: 6.243583,
        zoom: 19,
        transitionDuration,
        transitionInterpolator: new FlyToInterpolator(),
    },
    layers: ['layer_capsule', 'layer_plants'],
};
