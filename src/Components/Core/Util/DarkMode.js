import { createState } from "./State"
import { MdInvertColors } from "react-icons/md"
import { useEffect } from "react";

export default function DarkMode(props) {
    const state = DarkMode.State.useState();
    const onClick = () => {
        state.darkMode = !state.darkMode;
    };
    useEffect(() => {
        const mode = state?.darkMode ? "dark" : "light";
        document.documentElement.setAttribute('data-theme', mode);
    }, [state?.darkMode]);
    const name = state.darkMode ? "LIGHT_MODE" : "DARK_MODE";
    return {
        ...props, onClick, name, icon: <MdInvertColors style={{ marginTop: "4px" }} />
    };
}

DarkMode.State = createState({ darkMode: false });
DarkMode.useDarkMode = () => {
    const state = DarkMode.State.useState;
    return state.darkMode;
};
