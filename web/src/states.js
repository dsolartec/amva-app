import { FlyToInterpolator } from '@deck.gl/core';

export const INITIAL_STATE = {
    view_state: {
        longitude: -75.552464,
        latitude: 6.326047,
        zoom: 10.5,
        bearing: -60,
        pitch: 60,
    },
    layers: ['layer_dem', 'layer_amva_arcs', 'layer_marker'],
    map_style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
};

const transitionDuration = 2500;

export const AMVA_STATE = {
    view_state: {
        longitude: -75.552464,
        latitude: 6.326047,
        zoom: 10.5,
        bearing: -60,
        pitch: 60,
        transitionDuration,
        transitionInterpolator: new FlyToInterpolator(),
    },
    layers: ['layer_dem', 'layer_amva_arcs', 'layer_marker'],
    map_style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
};

export const AMVA_STATE_180deg = {
    view_state: {
        longitude: -75.552464,
        latitude: 6.326047,
        zoom: 10.5,
        bearing: 180,
        pitch: 40,
        transitionDuration,
        transitionInterpolator: new FlyToInterpolator(),
    },
    layers: ['layer_dem', 'layer_amva_arcs', 'layer_marker'],
    map_style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
};

export const AMVA_STATE_270deg = {
    view_state: {
        longitude: -75.494464,
        latitude: 6.33047,
        zoom: 10.4,
        bearing: 270,
        pitch: 40,
        transitionDuration,
        transitionInterpolator: new FlyToInterpolator(),
    },
    layers: ['layer_dem', 'layer_amva_arcs', 'layer_marker'],
    map_style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
};


export const CAPSULE_STATE = {
    view_state: {
        longitude: -75.5795,
        latitude: 6.2442,
        zoom: 20,
        bearing: 40,
        pitch: 60,
        transitionDuration: 6000,
        transitionInterpolator: new FlyToInterpolator(),
    },
    layers: ['layer_capsule', 'layer_amva_arcs','layer_plants'],
    map_style: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json',
};
