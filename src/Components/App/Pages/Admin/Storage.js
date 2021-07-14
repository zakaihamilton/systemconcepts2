import { MdStorage, MdDevices } from "react-icons/md";
import LocalStorage from "@components/App/Pages/Admin/Storage/Local"

const Pages = [
    {
        id: "localstorage",
        name: "LOCAL",
        icon: <MdDevices />,
        Component: LocalStorage
    }
];

const Sidebar = [
    {
        id: "storage",
        name: "STORAGE",
        icon: <MdStorage />,
        children: [
            "localstorage"
        ]
    }
];

const Storage = {
    Pages,
    Sidebar
};

export default Storage;
