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
    const years = React.useRef();
    const days = React.useRef();
    const hours = React.useRef();
    const minutes = React.useRef();
    const seconds = React.useRef();

    const boxAnimation = useSpring({
        bottom: '0px',
        right: '0px',
        from: {
            bottom: '-14rem',
            right: '-14rem',
        }
    });

    React.useEffect(() => {
        if (years.current && days.current && hours.current && minutes.current && seconds.current && !timeCalled) {
            function setTime() {
                setTimeCalled(true);

                const timeLeft = calculateTimeLeft();

                years.current.innerText = `${timeLeft.years} ANO${timeLeft.years === 1 ? "" : "S"},`;
                days.current.innerText = `${timeLeft.days} DIA${timeLeft.days === 1 ? "" : "S"},`;
                hours.current.innerText = `${timeLeft.hours} HORA${timeLeft.hours === 1 ? "" : "S"},`;
                minutes.current.innerText = `${timeLeft.minutes} MINUTO${timeLeft.minutes === 1 ? "" : "S"} Y`;
                seconds.current.innerText = `${timeLeft.seconds} SEGUNDO${timeLeft.seconds === 1 ? "" : "S"}`;

                setTimeout(setTime, 1000);
            }

            setTimeout(setTime, 1000);
        }
    }, [timeCalled, years, days, hours, minutes, seconds]);

    return (
        <animated.div className="countdown" style={boxAnimation}>
            <h2 ref={years}>0 ANOS,</h2>
            <h2 ref={days}>0 DIAS,</h2>
            <h2 ref={hours}>0 HORAS,</h2>
            <h2 ref={minutes}>0 MINUTOS Y</h2>
            <h2 ref={seconds}>0 SEGUNDOS</h2>
        </animated.div>
    );
}
