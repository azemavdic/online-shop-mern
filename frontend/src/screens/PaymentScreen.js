import React, { useState } from "react";
import { Form, Button, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress.address){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    
    const dispatch = useDispatch()

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>PLAĆANJE</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
              <Form.Label as='legend'>
                Odaberite način plaćanja
              </Form.Label>
          
          <Col>
            <Form.Check type='radio' label='Paypal' id='Paypal' name='paymentMethod' value='Paypal' checked onChange={(e)=> setPaymentMethod(e.target.value)}>
            </Form.Check>

            <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={(e)=> setPaymentMethod(e.target.value)}>
            </Form.Check>
          </Col>

        </Form.Group>

          <Button variant='primary' type='submit'>Nastavi</Button>
          
        </Form>
      </FormContainer>
    );
}

export default PaymentScreen
