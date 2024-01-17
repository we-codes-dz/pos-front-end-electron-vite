
type Props = {
    icon: string;
}
const Logo = ({ icon }: Props) => {
    return <img src={icon} alt="" className='h-10 w-10' />;

}

export default Logo