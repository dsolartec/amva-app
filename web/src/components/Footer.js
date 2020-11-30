import React from 'react';
import Countdown from './Countdown';
import './Footer.scss';

const texts = {
    amva: 'Con una línea que nos trazamos, acercamos territorios, culturas, diversidades, puntos de vista, sueños y personas. Cada punto es un foco de gestión que se une a través de la tecnología, la movilidad, el desarrollo y la conservación ambiental para articular un Futuro Sostenible que no se detiene y crea calidad de vida.',
    capsule: 'Las urnas del tiempo clásicas querían mostrar a generaciones futuras cómo era la vida años atrás; la Cápsula "Observatorio de lo invisible" viene del pasado y el futuro para decirnos que la llave del acertijo la tenemos hoy en nuestras manos.',
    video: `“Tendemos a ignorar las cosas que son invisibles, ¿estás de acuerdo? 
    ¿Invisibles? 
    El clima es invisible y, sin embargo, nos afecta.” 
    “Pero la mejor manera de entender el silencio consiste en aceptar que no  
    existe, sino que es una medida a partir de la cual valoramos el sonido.” 
    Opus zero, Daniel G`
};

export default function Footer({ view }) {
    const [videoPlayed, setVideoPlayed] = React.useState(false);
    const [videoActive, setVideoActive] = React.useState(false);

    if (view === 'capsule') {
        if (!videoActive && !videoPlayed) {
            setVideoActive(true);
            setVideoPlayed(true);
        }
    } else if (videoActive) {
        setVideoActive(false);
        setVideoPlayed(false);
    }

    return (
        <div className="footer">
            <div className="text">{texts[view]}</div>
            <Countdown />
        </div>
    );
}
