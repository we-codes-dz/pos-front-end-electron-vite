type Props = {
    title?: string | 'Table';
}
const Header = ({ title }: Props) => {
    return (
        <h2 className="mr-5 text-lg font-medium truncate">{title}</h2>
    )
}

export default Header