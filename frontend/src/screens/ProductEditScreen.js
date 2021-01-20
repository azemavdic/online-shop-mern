import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails } from "../actions/productActions";
import FormContainer from "../components/FormContainer";

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
      if(!product.name || product._id !== productId){
          dispatch(listProductDetails(productId))
      }else{
          setName(product.name)
          setPrice(product.price)
          setImage(product.image)
          setCategory(product.category)
          setBrand(product.brand)
          setCountInStock(product.countInStock)
          setDescription(product.description)
      }
  }, [dispatch, productId, product, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    //UPDATE PRODUCT DETAILS
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Nazad
      </Link>
      <FormContainer>
        <h1>Ažuriraj proizvod</h1>
        
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Ime</Form.Label>
            <Form.Control
              type='name'
              placeholder='Upiši ime i prezime'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Cijena</Form.Label>
            <Form.Control
              type='number'
              placeholder='Upiši cijenu proizvoda'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Slika</Form.Label>
            <Form.Control
              type='text'
              placeholder='Dodaj sliku'
              value = {image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Brend</Form.Label>
            <Form.Control
              type='text'
              placeholder='Upiši brend'
              value = {brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
          <Form.Label>Kategorija</Form.Label>
            <Form.Control
              type='text'
              placeholder='Upiši kategoriju'
              value = {category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
          <Form.Label>Na stanju</Form.Label>
            <Form.Control
              type='number'
              placeholder='Komada na stanju'
              value = {countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
          <Form.Label>Opis</Form.Label>
            <Form.Control
              type='text'
              placeholder='Upiši opis'
              value = {description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Ažuriraj
          </Button>
        </Form>
        )}
        
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
