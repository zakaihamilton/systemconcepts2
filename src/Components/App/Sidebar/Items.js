import { MdSettings } from "react-icons/md";
import DarkMode from "@components/Core/Util/DarkMode"

export default [
    {
        name: "Test",
        children: [
            {
                name: "is",
                open: false,
                children: new Array(1000).fill(0).map((_, index) => ({ name: index }))
            },
            {
                name: "an",
                open: false,
                children: new Array(100).fill(0).map((_, index) => ({ id: "_" + index, name: index }))
            },
            {
                name: "example",
                id: "yoyoy/hello"
            }
        ]
    },
    {
        id: "settings",
        name: "SETTINGS",
        icon: <MdSettings style={{ marginTop: "4px" }} />,
        children: [
            "languages",
            {
                id: "darkMode",
                name: "DARK_MODE",
                handler: DarkMode
            }
        ]
    }
];
