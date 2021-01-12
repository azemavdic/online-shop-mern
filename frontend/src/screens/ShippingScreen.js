import React, { useState } from "react";
import { Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Dostava</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address'>
            <Form.Label>Adresa</Form.Label>
            <Form.Control
              type='text'
              placeholder='Upiši adresu'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>Grad</Form.Label>
            <Form.Control
              type='text'
              placeholder='Upiši grad'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='postalCode'>
            <Form.Label>Poštanski broj</Form.Label>
            <Form.Control
              type='text'
              placeholder='Upiši poštanski broj'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
            <Form.Label>Poštanski broj</Form.Label>
            <Form.Control
              type='text'
              placeholder='Upiši državu'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button variant='primary' type='submit'>Nastavi</Button>
        </Form>
      </FormContainer>
    );
}

export default ShippingScreen
