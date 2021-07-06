import { useCallback, useEffect } from "react";
import { useListener } from "./Listener";
import { createState } from "./State";

const layouts = [
    {
        id: "desktop"
    },
    {
        id: "mobile",
        width: 768
    }
];

export default function Layout({ children }) {
    const state = Layout.State.useState();
    const updateLayout = useCallback(() => {
        let layout = layouts.find(item => item.width > window.innerWidth);
        if (!layout) {
            layout = layouts[0];
        }
        document.documentElement.setAttribute('data-layout', layout.id);
        Object.assign(state, layout);
    }, [state]);
    useEffect(updateLayout, [updateLayout]);
    useListener(typeof window !== "undefined" && window, "resize", updateLayout);
    return children;
}

Layout.State = createState({});
Layout.useLayout = () => {
    const state = Layout.State.useState();
    return state?.id;
};