import { useCallback, useState } from "react";
import { useListener } from "./Listener";

export function useLocation() {
    const hasWindow = typeof window !== "undefined";
    const [location, setLocation] = useState(hasWindow && window.location.hash);
    const onHashChange = useCallback(() => {
        setLocation(window.location.hash);
    }, []);
    useListener(hasWindow && window, "hashchange", onHashChange);
    if (location[0] === "#") {
        return location.substring(1);
    }
    return location;
}
