import React, { useRef, useEffect } from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'

/*
   https://codesandbox.io/embed/r3f-game-i2160
   https://dev.to/zhiyueyi/how-to-create-a-simple-react-countdown-timer-4mc3
   https://www.digitalocean.com/community/tutorials/react-countdown-timer-react-hooks
   https://github.com/do-community/react-hooks-timer/blob/master/src/App.js
 */

export default function Countdown() {
  const calculateTimeLeft = () => {
    const difference = +new Date(`2030-10-1`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const seconds = useRef(),
    minutes = useRef(),
    hours = useRef(),
    days = useRef()

  useEffect(() => {
    const i = setInterval(() => {
      const timeLeft = calculateTimeLeft()
      days.current.innerText = `${timeLeft.days} días`
      hours.current.innerText = `${timeLeft.hours} horas`
      minutes.current.innerText = `${timeLeft.minutes} minutos`
      seconds.current.innerText = `${timeLeft.seconds} segundos`
    })
    return () => clearInterval(i)
  }, [])

  return(
    <>
      <UpperLeft>
        <h2 ref={days}>0.0</h2>
        <h2 ref={hours}>0.0</h2>
        <h2 ref={minutes}>0.0</h2>
        <h2 ref={seconds}>0.0</h2>
      </UpperLeft>
      <Global />
    </>
  )
}

const base = css`
  font-family: 'Teko', sans-serif;
  position: absolute;
  /*text-transform: uppercase;*/
  font-weight: 900;
  font-variant-numeric: slashed-zero tabular-nums;
  line-height: 1em;
  pointer-events: none;
  color: white;
  text-shadow: 1px 1px 2px rgb(0,105,150);
`

const UpperLeft = styled.div`
  ${base}
  top: 40px;
  left: 50px;
  width: 230px;
  font-size: 2em;
  /*transform: skew(5deg, 10deg);*/
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
    margin: 0.4em;
  }
`
