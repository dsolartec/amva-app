import React from 'react';
import { useSpring, animated } from 'react-spring';
import Logo from './Logo';
import * as states from '../states';
import './Header.scss';

export default function Header({
    setViewState,
    setLayers,
    setMapStyle,
    onCapsuleClick,
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
                        setViewState(states.AMVA_STATE.view_state);
                        setLayers(states.AMVA_STATE.layers);
                        setMapStyle(states.AMVA_STATE.map_style);
                    }}
                >Área</button>
                <button
                    onClick={() => {
                        setViewState(states.CAPSULE_STATE.view_state);
                        setLayers(states.CAPSULE_STATE.layers);
                        setMapStyle(states.CAPSULE_STATE.map_style);
                        onCapsuleClick();
                    }}
                >Cápsula</button>
            </div>
        </animated.div>
    );
}
