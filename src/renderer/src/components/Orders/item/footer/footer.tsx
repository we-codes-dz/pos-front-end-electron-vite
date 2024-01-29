import PayPendingButton from "./button/pending-button"

const PayButton = () => {
    return (
        <div className="flex justify-between h-2/3 px-2 mt-2 gap-2">
            <PayPendingButton title="Pay" className="btn-secondary" />
            <PayPendingButton title="To Kitchen" className="btn-info" />
            <PayPendingButton title="pending" className="btn-warning" />
        </div>
    )
}

export default PayButton