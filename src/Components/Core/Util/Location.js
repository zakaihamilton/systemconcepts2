import { useCallback, useEffect, useState } from "react";
import { useListener } from "./Listener";

export function useLocation() {
    const hasWindow = typeof window !== "undefined";
    const [location, setLocation] = useState("");
    const onHashChange = useCallback(() => {
        setLocation(window.location.hash);
    }, []);
    useEffect(() => {
        setLocation(window.location.hash);
    }, []);
    useListener(hasWindow && window, "hashchange", onHashChange);
    if (location[0] === "#") {
        return location.substring(1);
    }
    return location;
}
