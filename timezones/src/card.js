import React, { useState, useEffect } from "react";

function Index(props) {
  const [curTime, setCurTime] = useState(new Date().toLocaleTimeString());
  const [localTime, setlocalTime] = useState(curTime);

  useEffect(() => {
    var timer = setInterval(
      () => setCurTime(new Date().toLocaleTimeString()),
      setTime(),
      1000
    );
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const setTime = () => {
    var time = curTime;
    var offSet = props.timezones.Hours;
    var [h, m, s] = time.split(":");
    if (Number(h) + Number(offSet) >= 24) {
      h = Number(h) - 24;
    }
    var newTime = String(Math.abs(Number(h) + Number(offSet))) + `:${m}:${s}`;
    if (newTime.length !== 8) {
      newTime = "0" + newTime;
    }
    setlocalTime(newTime);
  };

  return (
    <div className="card">
      <div className="zone">
        <h1>{props.timezones.Name}</h1>
        <h3>GMT{props.timezones.Hours}</h3>
      </div>
      <div className="time">
        <p>{localTime}</p>
      </div>
    </div>
  );
}

export default Index;
