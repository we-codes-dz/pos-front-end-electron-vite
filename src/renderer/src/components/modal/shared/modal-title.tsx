interface Props {
    title: string;
}
const ModalTitle = ({ title }: Props) => {
    return (
        <h3 className="font-bold text-lg">{title}</h3>
    )
}

export default ModalTitle