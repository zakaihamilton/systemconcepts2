import { createState } from "@components/Core/Util/State"
import { useEffect } from "react";

export function createList() {
    const State = createState({ elements: [] });
    function List({ children }) {
        return <State elements={[]}>
            {children}
        </State>;
    }
    List.useList = ref => {
        const list = State.useState();
        useEffect(() => {
            if (!ref || !ref.current) {
                return null;
            }
            list.elements = [...list.elements, ref.current];
            return () => {
                list.elements = list.elements.filter(item => item !== ref.current);
            };
        }, [ref && ref.current]);
        return list;
    };
    return List;
}
