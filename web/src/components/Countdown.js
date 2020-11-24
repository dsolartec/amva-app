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
        left: '3rem',
        opacity: 1,
        from: {
            left: '-24rem',
            opacity: 0,
        }
    });

    React.useEffect(() => {
        if (years.current && days.current && hours.current && minutes.current && seconds.current && !timeCalled) {
            function setTime() {
                setTimeCalled(true);

                const timeLeft = calculateTimeLeft();

                years.current.innerText = `${timeLeft.years} año${timeLeft.years === 1 ? "" : "s"},`;
                days.current.innerText = `${timeLeft.days} día${timeLeft.days === 1 ? "" : "s"},`;
                hours.current.innerText = `${timeLeft.hours} hora${timeLeft.hours === 1 ? "" : "s"},`;
                minutes.current.innerText = `${timeLeft.minutes} minuto${timeLeft.minutes === 1 ? "" : "s"} y`;
                seconds.current.innerText = `${timeLeft.seconds} segundo${timeLeft.seconds === 1 ? "" : "s"}`;

                setTimeout(setTime, 1000);
            }

            setTimeout(setTime, 1000);
        }
    }, [timeCalled, years, days, hours, minutes, seconds]);

    return (
        <animated.div className="countdown" style={boxAnimation}>
            <span>Nos quedan</span>
            <h2 ref={years}>0 años,</h2>
            <h2 ref={days}>0 días,</h2>
            <h2 ref={hours}>0 horas,</h2>
            <h2 ref={minutes}>0 minutos y</h2>
            <h2 ref={seconds}>0 segundos</h2>
            <span>con agua potable...</span>
        </animated.div>
    );
}
