import React from 'react';
import { useSpring, animated } from 'react-spring';
import StreamingTest from '../assets/videos/capsula.mp4';
import './Streaming.scss';

export default function Streaming({ onBackClick }) {
    const boxAnimation = useSpring({
        opacity: 1,
        from: {
            opacity: 0,
        },
    });

    return (
        <animated.div className="streaming" style={boxAnimation}>
            <button onClick={() => onBackClick()}>Área</button>
            <video src={StreamingTest} autoPlay={true} loop={true} />
        </animated.div>
    );
}
