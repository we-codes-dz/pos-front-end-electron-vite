import PayPendingButton from "./button/pending-button"

const PayButton = () => {
    return (
        <div className="flex justify-between h-2/3 px-5 mt-2 ">
            <PayPendingButton title="Pay" className="btn-secondary" />
            <PayPendingButton title="pending" className="btn-warning" />
        </div>
    )
}

export default PayButton