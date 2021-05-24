import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import { useLocation } from "../Core/Util/Location";

export function usePageId() {
    const location = useLocation();
    return location;
}

export default function Page({ }) {
    const pageId = usePageId();

    return <Pane closable={false} divider={true} style={{ backgroundColor: "white" }}>

    </Pane>;
}
