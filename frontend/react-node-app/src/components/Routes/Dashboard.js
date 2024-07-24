export default function Dashboard(){
    return(
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="items">
                <div className="total-products">
                    <li>Total Products</li>
                    <li>10</li>
                </div>
                <div className="out-of-stock">
                    <li>Out of Stock</li>
                    <li>10</li>
                </div>
                <div className="total-stock-value">
                    <li>Total Stock value</li>
                    <li>&#8377; 10.00</li>
                </div>
            </div>
            <div className="analytics">
                <div className="piechar"></div>
                <div className="predictions"></div>
            </div>
        </div>
    )
}