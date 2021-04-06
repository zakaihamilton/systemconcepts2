import { createState } from "@components/Core/Util/State"
import { useRefCallback } from "@components/Core/UI/Util/Ref"

export function createList() {
    const State = createState({ elements: [] });
    function List({ children }) {
        return <State elements={[]}>
            {children}
        </State>;
    }
    List.useList = ref => {
        const list = State.useState();
        useRefCallback(ref, handle => {
            list.elements = [...list.elements, handle];
            return () => list.elements = list.elements.filter(item => item !== handle);
        });
        return list.elements || [];
    };
    return List;
}
