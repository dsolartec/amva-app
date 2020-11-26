import React from 'react';
import './Player.scss';

// Videos
import celeste_lowres from '../assets/videos/celeste4_3-lowres.mp4';

export default function Player({ size, active, onVideoEnded }) {
    const videoSource = React.useRef();

    if (!active) {
        return null;
    }

    let [width, height] = [640, 480];

    if (size === 'medium') {
        width = 800;
        height = 600;
    } else if (size === 'big') {
        width = 960;
        height = 720;
    }

    return (
        <div className="player">
            <div className="box" style={{ width, height }}>
                <video
                    src={celeste_lowres}
                    ref={videoSource}
                    autoPlay={true}
                    onEnded={onVideoEnded}
                    onClick={() => {
                        if (videoSource.current) {
                            videoSource.current[videoSource.current.paused ? "play" : "pause"]();
                        }
                    }}
                />
            </div>
        </div>
    );
}
