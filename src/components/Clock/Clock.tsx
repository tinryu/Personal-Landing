import React, { useEffect, useState } from 'react';
import './Clock.css';

function checkTime(i: string | number) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}   

function Clock() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => {
            tick()
        },1000);
        return () => clearInterval(timerID);

        function tick() {
            setDate(new Date());
        }
    })

    return (
        <div id="clock">
            <span>{date.getHours()}</span>:
            <span>{checkTime(date.getMinutes())}</span>:
            <span>{checkTime(date.getSeconds())}</span>
        </div>
    )
}

export default Clock;