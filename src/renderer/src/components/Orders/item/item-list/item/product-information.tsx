
interface Props {
  item: any
}
const ProductInformation = ({ item }: Props) => {
  const baseUrl = 'http://localhost:3000/'

  return (
    <div className="flex flex-row justify-between items-center mb-1 w-full rounded-md ">
      <img
        src={baseUrl + item.product.avatar.url}
        className="w-12 h-12 object-cover rounded-tl-md"
        alt={`${item.product.avatar.name}`}
      />
      <div className="flex flex-col w-full">
        <span className="ml-1 font-medium text-sm">{item.product.name}</span>
        <span className="ml-1 font-medium text-xs text-green-700">{item.product.price}DA</span>
      </div>
    </div>
  )
}

export default ProductInformation
