import React from 'react';
import { Spring } from 'react-spring/renderprops';
import './Player.scss';

// Videos
import celeste_lowres from '../assets/videos/celeste4_3-lowres.mp4';

export default function Player({ active, onVideoEnded }) {
    const [isShowing, setShowing] = React.useState(true);
    const videoSource = React.useRef();

    if (!active) {
        return null;
    }

    return (
        <Spring
            from={{ opacity: isShowing ? 0 : 1 }}
            to={{ opacity: isShowing ? 1 : 0 }}
            onRest={() => onVideoEnded}
        >
            {props => (
                <div className="player" style={props}>
                    <video
                        src={celeste_lowres}
                        ref={videoSource}
                        autoPlay={true}
                        onEnded={() => setShowing(false)}
                        onClick={() => {
                            if (videoSource.current) {
                                videoSource.current[videoSource.current.paused ? "play" : "pause"]();
                            }
                        }}
                    />
                </div>
            )}
        </Spring>
    );
}
