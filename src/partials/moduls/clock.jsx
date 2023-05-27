import React, { useState } from 'react'

export default function Clock() {

    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    const[hours, setHours] = useState(h),
    [minutes, setMinutes] = useState(m),
    [seconds, setSeconds] = useState(s);

    setInterval(function() {
        const today = new Date();
        setHours(today.getHours());
        setMinutes(today.getMinutes());
        setSeconds(today.getSeconds());

    },1000);

    return (
        <div id="time-options">
            {hours + ":" + minutes + ":" + seconds}
        </div>
    )
    
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}