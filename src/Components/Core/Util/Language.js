import { createState } from "@components/Core/Util/State";
import { useCallback } from "react";
import { createStorageHandler } from "@components/Core/Storage/Local";
import Observe from "@components/Core/Util/Observe";

const storageHandler = createStorageHandler(["id", "direction", "name"]);

export default function Language({ children, direction, id, name }) {
    const observeState = Observe.useState();
    const updateDirection = useCallback(direction => {
        document.getElementsByTagName('html')[0].setAttribute("dir", direction);
        observeState.counter++;
    }, [observeState]);
    return <Language.State direction={direction} id={id} name={name}>
        <Language.State.Notify direction={updateDirection} />
        <Language.State.Storage id="Language" {...storageHandler} />
        {children}
    </Language.State>
}

Language.State = createState();
Language.useLanguage = Language.State.useState;
