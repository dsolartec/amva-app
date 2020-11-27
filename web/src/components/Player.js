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

    const fromPosition = isShowing ? '-40rem' : '1rem';
    const toPosition = isShowing ? '1rem' : '-40rem';

    return (
        <Spring
            from={{ right: fromPosition, top: fromPosition }}
            to={{ right: toPosition, top: toPosition }}
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
