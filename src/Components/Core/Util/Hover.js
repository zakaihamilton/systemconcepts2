import { useState } from "react";
import { useListeners } from "./Listener"
import { useRefCallback } from "@components/Core/Util/Ref"

export function useHover(hoverRef, sensitivity = 0.1, interval = 100) {
    const [hover, setHover] = useState(false);
    const [register, unregister] = useListeners();

    useRefCallback(hoverRef, handle => {
        let lastX = 0, lastY = 0, lastTime = 0, prevX = 0, prevY = 0, prevTime = 0, isOverElement = false, checkSpeedInterval = null;
        const mouseOver = event => {
            if (isOverElement) {
                return;
            }

            isOverElement = true;

            prevX = event.pageX;
            prevY = event.pageY;
            prevTime = Date.now();

            register(handle, "mousemove", mouseMove);
            checkSpeedInterval = setInterval(trackSpeed, interval);
        };
        const mouseOut = event => {
            // if left the element
            if (!event.relatedTarget || !handle.contains(event.relatedTarget)) {
                isOverElement = false;
                unregister(handle, "mousemove");
                clearInterval(checkSpeedInterval);
                setHover(false);
            }
        };
        const mouseMove = event => {
            lastX = event.pageX;
            lastY = event.pageY;
            lastTime = Date.now();
        };
        const trackSpeed = () => {

            let speed;

            if (!lastTime || lastTime == prevTime) {
                speed = 0;
            } else {
                speed = Math.sqrt(
                    Math.pow(prevX - lastX, 2) +
                    Math.pow(prevY - lastY, 2)
                ) / (lastTime - prevTime);
            }

            if (speed < sensitivity) {
                clearInterval(checkSpeedInterval);
                setHover(true);
            } else {
                prevX = lastX;
                prevY = lastY;
                prevTime = lastTime;
            }
        };
        register(handle, "mouseover", mouseOver);
        register(handle, "mouseout", mouseOut);
        return () => {
            unregister(handle, "mousemove");
            unregister(handle, "mouseover");
            unregister(handle, "mouseout");
        };
    });

    return hover;
}
