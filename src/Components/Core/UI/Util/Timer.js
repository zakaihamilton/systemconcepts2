import { useEffect, useRef, useState } from "react"

export function useTimer(onDelay, offDelay, cond) {
    const [timerState, setTimerState] = useState(false);

    useEffect(() => {
        let timerHandle = null;
        setTimerState(timerState => {
            if (!cond && timerState) {
                console.log("0 cond", cond, "timerState", timerState);
                timerHandle = setTimeout(() => {
                    console.log("off");
                    setTimerState(cond);
                }, offDelay);
            }
            if (cond && !timerState) {
                console.log("1 cond", cond, "timerState", timerState);
                timerHandle = setTimeout(() => {
                    console.log("on");
                    setTimerState(cond);
                }, onDelay);
            }
            return timerState;
        });
        return () => {
            clearTimeout(timerHandle);
        };
    }, [onDelay, offDelay, cond]);

    return timerState;
}