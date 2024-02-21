import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const loggedCustomer = JSON.parse(localStorage.getItem("loggedCustomer"));
  const custid = loggedCustomer?.customer_id || ''; // provide a default value if customer_id is not available

  const user = useSelector((state) => state.logged.user);

  const loggedVendor = JSON.parse(localStorage.getItem("loggedVendor"));
  const vid = loggedVendor?.vendor_id || ''; 

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get('http://localhost:8080/orderHistory'); // Replace URL with your backend endpoint
                if (response.status === 200) {
                    setOrders(response.data);
                } else {
                    console.error('Failed to fetch order history. Status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching order history:', error.message);
            }
        };

        fetchOrderHistory();
    }, []);

    return (
        <div className="order-history">
            <h2>Order History</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Vendor ID</th>
                        <th>Service ID</th>
                        <th>Booking Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.order_id}>
                            <td>{order.vendorId}</td>
                            <td>{order.servicesId}</td>
                            <td>{order.bookingDatetime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;
