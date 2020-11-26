import React from 'react';
import { useSpring, animated } from 'react-spring';
import Logo from './Logo';
import * as states from '../states';
import Countdown from './Countdown';
import './Header.scss';

export default function Header({ setViewState, setLayers }) {
    const boxAnimation = useSpring({
        left: '1rem',
        from: {
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
                    }}
                >Área</button>
                <button
                    onClick={() => {
                        setViewState(states.CAPSULE_STATE.view_state);
                        setLayers(states.CAPSULE_STATE.layers);
                    }}
                >Cápsula</button>
            </div>
            <Countdown />
        </animated.div>
    );
}
