import Button from "@components/Core/UI/Widgets/Button"

export default function Item({ id, icon, name }) {
    return <Button icon={icon}>
        {name}
    </Button>;
}
