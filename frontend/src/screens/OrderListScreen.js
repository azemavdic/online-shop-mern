import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    }else {
        history.push('/login')
    }
    
  }, [ dispatch, userInfo, history ]);

  return (
    <>
      <h1>Narudžbe</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped responsive bordered hover className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>KUPAC</th>
              <th>DATUM</th>
              <th>CIJENA</th>
              <th>PLAĆENO</th>
              <th>DOSTAVLJENO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice} KM</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "❌"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "❌"}
                </td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button className='btn-sm' variant='light'>
                    Detalji
                  </Button>
                </LinkContainer>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
