import { useRef } from "react"
import { useRefCallback } from "@components/Core/Util/Ref"
import { useListeners } from "./Listener"
import { createState } from "@components/Core/Util/State"

export function createDrag() {
    const State = createState();
    function Drag({ children, containerRef, orientation }) {
        return <State containerRef={containerRef} orientation={orientation}>
            {children}
        </State>;
    }
    Drag.State = State;
    Drag.useDrag = (dragRef, objectRef, cb, options) => {
        const state = State.useState() || {};
        const [register, unregister] = useListeners();
        const info = useRef({ drag: false });
        const { minSize, maxSize, reverseHorizontal, reverseVertical } = options || {};
        useRefCallback(dragRef, handle => {
            const { orientation, containerRef } = state;
            const updatePos = e => {
                const { dragRect, objectRect, containerRect } = info.current;
                let x = 0;
                let y = 0;
                if (reverseHorizontal) {
                    x = (objectRect.left + objectRect.width - e.clientX) + (dragRect.width / 2);
                }
                else {
                    x = (e.clientX - objectRect.left) + (dragRect.width / 2);
                }
                if (reverseVertical) {
                    y = (objectRect.top + objectRect.height - e.clientY) + (dragRect.height / 2);
                }
                else {
                    y = (e.clientY - objectRect.top) + (dragRect.height / 2);
                }
                if (options?.minSize) {
                    x = Math.max(x, options?.minSize);
                    y = Math.max(y, options?.minSize);
                }
                if (options?.maxSize) {
                    x = Math.min(x, options?.maxSize);
                    y = Math.min(y, options?.maxSize);
                }
                const xPercentage = x / containerRect.width * 100;
                const yPercentage = y / containerRect.height * 100;
                cb({ orientation, pos: { x, y }, percentage: { x: xPercentage, y: yPercentage } });
            };
            const mouseDown = e => {
                const containerRect = containerRef.current.getBoundingClientRect();
                const objectRect = objectRef.current.getBoundingClientRect();
                const dragRect = handle.getBoundingClientRect();
                info.current = { dragRect, objectRect, containerRect };
                register(document.body, "mousemove", mouseMove);
                register(document.body, "mouseup", mouseUp);
                state.dragging = true;
            };
            const mouseMove = e => {
                if (state.dragging) {
                    updatePos(e);
                }
            };
            const mouseUp = e => {
                unregister(document.body, "mousemove");
                unregister(document.body, "mouseup");
                state.dragging = false;
            };
            if (containerRef?.current && objectRef?.current && cb) {
                register(handle, "mousedown", mouseDown);
            }
            return () => {
                unregister(handle, "mousedown");
            };
        }, [state?.containerRef, objectRef?.current, minSize, maxSize, reverseHorizontal, reverseVertical]);
        return [state.dragging];
    }

    return Drag;
}
