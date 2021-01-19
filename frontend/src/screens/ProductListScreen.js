import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

//   const deleteHandler = (userId) => {
//     if (window.confirm("Jeste li sigurni?")) {
//       dispatch(deleteUser(userId));
//     }
//   };

const createProductHandler = ()=>{
    console.log('Dodaj proizvod');
}

const deleteHandler =(productId)=>{
    console.log('Brisanje');
}

  return (
    <>
    <Row className='align-items-center'>
        <Col>
            <h1>Proizvodi</h1>
        </Col>
        <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler}>
                <i className='fas fa-plus'></i> Dodaj proizvod
            </Button>
        </Col>
    </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped responsive bordered hover className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAZIV</th>
              <th>CIJENA</th>
              <th>KATEGORIJA</th>
              <th>BREND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price} KM</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button className='btn-sm' variant='light'>
                    <i className='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(product._id)}
                >
                  <i className='fas fa-trash'></i>
                </Button>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
