import { useRef, useState } from "react"
import { useRefCallback } from "./Ref"
import { useListener } from "./Listener"
import { createState } from "./State";

export function createDrag() {
    const State = createState();
    function Drag({ children, containerRef, orientation }) {
        return <State containerRef={containerRef} orientation={orientation}>
            {children}
        </State>;
    }
    Drag.useDrag = (dragRef, objectRef, cb) => {
        const { orientation, containerRef } = State.useState();
        const [, setCounter] = useState(0);
        const [register, unregister] = useListener();
        const info = useRef({ drag: false });
        useRefCallback(dragRef, handle => {
            const updatePos = e => {
                const { dragRect, objectRect, containerRect } = info.current;
                const x = (e.clientX - objectRect.left) + (dragRect.width / 2);
                const y = (e.clientY - objectRect.top) + (dragRect.height / 2);
                const xPercentage = x / containerRect.width * 100;
                const yPercentage = y / containerRect.height * 100;
                cb({ orientation, pos: { x, y }, percentage: { x: xPercentage, y: yPercentage } });
            };
            const mouseDown = e => {
                const containerRect = containerRef.current.getBoundingClientRect();
                const objectRect = objectRef.current.getBoundingClientRect();
                const dragRect = handle.getBoundingClientRect();
                info.current = { drag: true, dragRect, objectRect, containerRect };
                register(document.body, "mousemove", mouseMove);
                register(document.body, "mouseup", mouseUp);
                setCounter(counter => counter + 1);
            };
            const mouseMove = e => {
                if (info.current.drag) {
                    updatePos(e);
                }
            };
            const mouseUp = e => {
                unregister(document.body, "mousemove");
                unregister(document.body, "mouseup");
                info.current.drag = false;
                setCounter(counter => counter + 1);
            };
            if (containerRef?.current && objectRef?.current && cb) {
                register(handle, "mousedown", mouseDown);
            }
            return () => {
                unregister(handle, "mousedown");
            };
        }, [containerRef?.current, objectRef?.current]);
        return [info.current.drag];
    }

    return Drag;
}
