import React from 'react';
import { useSpring, animated } from 'react-spring';
import './Countdown.scss';

function calculateTimeLeft() {
    const difference = new Date(`2030-10-1`) - new Date();

    if (difference > 0) {
        return {
            years: ~~(difference / (1000 * 60 * 60 * 24 * 365)),
            days: ~~((difference / (1000 * 60 * 60 * 24)) % 365),
            hours: ~~((difference / (1000 * 60 * 60)) % 24),
            minutes: ~~((difference / 1000 / 60) % 60),
            seconds: ~~((difference / 1000) % 60),
        };
    }

    return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
}

export default function Countdown() {
    const [timeCalled, setTimeCalled] = React.useState(false);
    const [time, setTime] = React.useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

    const boxAnimation = useSpring({
        marginBottom: '0px',
        marginRight: '0px',
        from: {
            marginBottom: '-14rem',
            marginRight: '-14rem',
        }
    });

    if (!timeCalled) {
        function setTimeCall() {
            setTimeCalled(true);
            setTime(calculateTimeLeft());
            setTimeout(setTimeCall, 1000);
        }

        setTimeout(setTimeCall, 1000);
    }

    return (
        <animated.div className="countdown" style={boxAnimation}>
            {time.years} ANO{time.years === 1 ? '' : 's'},
            {time.days} DIA{time.days === 1 ? '' : 's'},
            {time.hours} HORA{time.hours === 1 ? '' : 's'},
            {time.minutes} MINUTO{time.minutes === 1 ? '' : 's'} Y
            {' ' + time.seconds} SEGUNDO{time.seconds === 1 ? '' : 's'}
        </animated.div>
    );
}
