import React, { useEffect } from "react";

import OrderTable from "../../components/orderlists/OrderTable";
import { API_URL } from "../../constants/config";

const OrderLists = () => {
  const [orderData, setOrderData] = React.useState([]);

  useEffect(() => {
    fetch(`${API_URL}orderlists`)
      .then((res) => res.json())
      .then((data) => setOrderData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <OrderTable rows={orderData} />
    </div>
  );
};

export default OrderLists;
