import { MdStorage, MdDevices } from "react-icons/md";
import LocalStoragePage from "@components/App/Pages/Admin/Storage/Local"

const Pages = [
    {
        id: "localstorage",
        name: "LOCAL",
        icon: <MdDevices />,
        Component: LocalStoragePage
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
