import React from 'react';
import './Player.scss';

// Videos
import celeste_lowres from '../assets/videos/celeste4_3-lowres.mp4';

export default function Player({ size, active, onVideoEnded }) {
    const videoSource = React.useRef();

    if (!active) {
        return null;
    }

    return (
        <div className="player">
            <div className="box">
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
