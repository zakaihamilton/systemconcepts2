import Settings from "@components/App/Pages/Settings"
import Admin from "@components/App/Pages/Admin"

const Items = [
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
    ...Settings.Sidebar,
    ...Admin.Sidebar
];

export default Items;