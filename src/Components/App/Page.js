import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import { useLocation } from "../Core/Util/Location";
import pages from "./Pages"

export function usePageId() {
    const location = useLocation();
    return (location || "").split("/")[0];
}

export default function Page({ }) {
    const pageId = usePageId();
    const Component = pages[pageId];

    return <Pane closable={false} style={{ backgroundColor: "white" }}>
        {Component && <Component />}
    </Pane>;
}
