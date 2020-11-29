import React from 'react';
import { useSpring, animated } from 'react-spring';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StreamingTest from '../assets/videos/capsula.webm';
import './Streaming.scss';

export default function Streaming({
    onBackClick 
}) {
    const boxAnimation = useSpring({
        opacity: 1,
        from: {
            opacity: 0,
        },
    });
    const [, setViewState] = React.useState();
    const [, setLayers] = React.useState();
    const [, setMapStyle] = React.useState();

    return (
        <>
            <animated.div className="streaming" style={boxAnimation}>
                <video src={StreamingTest} autoPlay={true} loop={true} />
            </animated.div>
            <Footer view={"video"} />
            <Header
                setViewState={setViewState}
                setLayers={setLayers}
                setMapStyle={setMapStyle}
                onClick={() => onBackClick()}
                inStreaming={true}
            />
        </>
    );
}
