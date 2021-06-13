import { GrLanguage } from "react-icons/gr";
import { MdSettings } from "react-icons/md";

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
        name: "Settings",
        icon: <MdSettings style={{ marginTop: "4px" }} />,
        children: [
            {
                id: "languages",
                name: "Languages",
                icon: <GrLanguage style={{ marginTop: "4px" }} />
            }
        ]
    }
];