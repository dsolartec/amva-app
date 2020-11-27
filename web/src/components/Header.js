import React from 'react';
import { useSpring, animated } from 'react-spring';
import Logo from './Logo';
import * as states from '../states';
import './Header.scss';

export default function Header({
    setViewState,
    setLayers,
    setMapStyle,
    onClick,
}) {
    const boxAnimation = useSpring({
        top: '1rem',
        left: '1rem',
        from: {
            top: '-14rem',
            left: '-14rem',
        },
    });

    return (
        <animated.div className="header" style={boxAnimation}>
            <div className="top">
                <Logo type="plain" scale={1.5} />
            </div>
            <div className="actions">
                <button
                    onClick={() => {
                        setViewState(states.AMVA_STATE_180deg.view_state);
                        setLayers(states.AMVA_STATE_180deg.layers);
                        setMapStyle(states.AMVA_STATE_180deg.map_style);
                        setViewState(states.AMVA_STATE_180deg.view_state);
                        onClick('amva');
                    }}
                >Área</button>
                <button
                    onClick={() => {
                        setViewState(states.CAPSULE_STATE.view_state);
                        setLayers(states.CAPSULE_STATE.layers);
                        setMapStyle(states.CAPSULE_STATE.map_style);
                        onClick('capsule');
                    }}
                >Cápsula</button>
            </div>
        </animated.div>
    );
}
