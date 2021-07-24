import { createState } from "@components/Core/Util/State";
import { useCallback, useEffect } from "react";
import { createStorageHandler } from "@components/Core/Storage/Local";

const storageHandler = createStorageHandler(["id", "direction", "name"]);

export default function Language({ children, direction, id, name }) {
    const updateDirection = useCallback(direction => {
        document.getElementsByTagName('html')[0].setAttribute("dir", direction);
    }, []);
    useEffect(() => {
        updateDirection(direction);
    }, [direction, updateDirection]);
    return <Language.State direction={direction} id={id} name={name}>
        <Language.State.Notify direction={updateDirection} />
        <Language.State.Storage id="Language" {...storageHandler} />
        {children}
    </Language.State>
}

Language.State = createState();
Language.useLanguage = Language.State.useState;
