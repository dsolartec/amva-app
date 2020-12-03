import React from 'react';
import Area40Color from '../assets/images/area40_color.svg';

export default function Logo({ scale }) {
    let [width, height] = [83.149606299, 56.692913386];

    if (typeof scale === 'number' && scale > 1) {
        width *= scale;
        height *= scale;
    }

    return (
        <div className="logo" style={{ width, height }}>
            <img
                width="100%" height="100%"
                src={Area40Color}
                alt="40 años del Área Metropolitana del Valle de Aburrá Logo"
            />
        </div>
    );
}
