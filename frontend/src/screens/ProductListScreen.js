import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete, loading: loadingDelete, error: errorDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const { success: successCreate, loading: loadingCreate, error: errorCreate, product: createdProduct, } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.isAdmin) {
      history.push("/login");
    } 
    if(successCreate){
      history.push(`/admin/product/${createdProduct._id}/edit`)
    }else {
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, userInfo, history, successDelete, successCreate, createdProduct, pageNumber]);

const createProductHandler = ()=>{
    dispatch(createProduct())
}

const deleteHandler =(productId)=>{
    if (window.confirm("Jeste li sigurni?")) {
      dispatch(deleteProduct(productId));
    }
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
      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader/>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
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
        <Paginate page={page} pages={pages} isAdmin={true}/>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
