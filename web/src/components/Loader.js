import React from 'react';
import { Spring } from 'react-spring/renderprops';
import Logo from './Logo';
import './Loader.scss';

export default function Loader({ isActive }) {
    const [isShowing, setShowing] = React.useState(true);

    if (!isShowing) {
        return null;
    }

    return (
        <Spring
            from={{ opacity: isActive ? 0 : 1 }}
            to={{ opacity: isActive ? 1 : 0 }}
            onRest={() => setShowing(false)}
        >
            {props => (
                <div style={props} className="loader">
                    <Logo scale={3} />
                    <h2>Área Metropolitana del Valle de Aburrá</h2>
                    <span>¡40 años conectados de punto a punto!</span>
                </div>
            )}
        </Spring>
    );
}
