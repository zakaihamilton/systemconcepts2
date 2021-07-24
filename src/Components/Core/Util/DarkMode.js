import { useCallback, useEffect } from "react";
import { createState } from "./State"
import { MdBrightnessHigh, MdBrightness4 } from "react-icons/md"
import { createStorageHandler } from "@components/Core/Storage/Local";

const storageHandler = createStorageHandler();

export default function DarkMode({ children, darkMode }) {
    const updateDarkMode = useCallback(darkMode => {
        if (typeof darkMode === "undefined") {
            return;
        }
        const mode = darkMode ? "dark" : "light";
        document.documentElement.setAttribute('data-theme', mode);
    }, []);
    useEffect(() => {
        updateDarkMode(darkMode);
    }, [darkMode, updateDarkMode]);
    return <DarkMode.State darkMode={darkMode}>
        <DarkMode.State.Notify darkMode={updateDarkMode} />
        <DarkMode.State.Storage id="DarkMode" {...storageHandler} />
        {children}
    </DarkMode.State>
}

DarkMode.State = createState();
DarkMode.useDarkMode = DarkMode.State.useState;

export function DarkModeHandler(props) {
    const state = DarkMode.State.useState();
    const onClick = () => {
        state.darkMode = !state.darkMode;
    };
    const name = state.darkMode ? "LIGHT_MODE" : "DARK_MODE";
    const iconStyles = {};
    const icon = state.darkMode ? <MdBrightnessHigh style={iconStyles} /> : <MdBrightness4 style={iconStyles} />;
    return {
        ...props, onClick, name, icon
    };
}
