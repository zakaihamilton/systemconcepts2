import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import { useLocation } from "../Core/Util/Location";
import pages from "./Pages"

export function usePageId() {
    const location = useLocation();
    return (location || "").split("/")[0];
}

export function usePage() {
    const pageId = usePageId();
    const page = pages.find(page => page.id === pageId);
    return page;
}

export default function Page({ }) {
    const page = usePage();
    const { Component } = page || {};

    return <Pane closable={false}>
        {Component && <Component />}
    </Pane>;
}
