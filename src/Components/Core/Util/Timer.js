import { useEffect, useState } from "react"

export function useTimer(onDelay, offDelay, cond) {
    const [timerState, setTimerState] = useState(false);

    useEffect(() => {
        let timerHandle = null;
        setTimerState(timerState => {
            if (!cond && timerState) {
                timerHandle = setTimeout(() => {
                    setTimerState(cond);
                }, offDelay);
            }
            if (cond && !timerState) {
                timerHandle = setTimeout(() => {
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