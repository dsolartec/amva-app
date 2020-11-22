import React from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'

/*
   https://codesandbox.io/embed/r3f-game-i2160
   https://dev.to/zhiyueyi/how-to-create-a-simple-react-countdown-timer-4mc3
   https://www.digitalocean.com/community/tutorials/react-countdown-timer-react-hooks
   https://github.com/do-community/react-hooks-timer/blob/master/src/App.js
 */

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
        <>
            <UpperLeft>
                <span>Nos quedan</span>
                <h2 ref={years}>0 años,</h2>
                <h2 ref={days}>0 días,</h2>
                <h2 ref={hours}>0 horas,</h2>
                <h2 ref={minutes}>0 minutos y</h2>
                <h2 ref={seconds}>0 segundos</h2>
                <span>con agua potable...</span>
            </UpperLeft>
            <Global />
        </>
    )
}

const base = css`
    font-family: 'Teko', sans-serif;
    position: absolute;
    font-weight: 900;
    font-variant-numeric: slashed-zero tabular-nums;
    line-height: 1em;
    pointer-events: none;
    color: white;
    text-shadow: 1px 1px 2px rgb(0,105,150);
`

const UpperLeft = styled.div`
    ${base}
    top: 2rem;
    left: 3rem;
    width: 21rem;
    font-size: 2em;
    pointer-events: all;
    cursor: pointer;

    @media only screen and (max-width: 900px) {
        font-size: 1.5em;
    }
`

const Global = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html,
    body,
    #root {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        user-select: none;
        overflow: hidden;
    }

    #root {
        overflow: auto;
        padding: 0px;
    }

    body {
        position: fixed;
        overflow: hidden;
        overscroll-behavior-y: none;
        font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
        color: black;
        background: white;
    }

    h2 {
        display: block;
        font-size: 1.5em;
        font-weight: bold;
        margin: .35em 0;
        margin-left: .2em;
    }

    span {
        display: block;
    }

    span:nth-of-type(1) {
        margin-bottom: 1.75rem;
    }

    span:nth-of-type(2) {
        margin-top: 1.75rem;
    }
`
