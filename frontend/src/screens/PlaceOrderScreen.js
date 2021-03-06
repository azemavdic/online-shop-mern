import React, { useEffect } from "react";
import { Button, Row, Col,ListGroup, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";


const PlaceOrderScreen = ({history}) => {
    

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    if (!cart.shippingAddress.address) {
      history.push("/shipping");
    } else if (!cart.paymentMethod) {
      history.push("/payment");
    }

    //Calculate prices
    const addDecimals = (num)=>{
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals (cart.cartItems.reduce((acc, item)=> acc + item.price * item.qty,0))
    cart.shippingPrice = addDecimals (cart.itemsPrice > 100 ? 0 : 10)
    cart.taxPrice = addDecimals(Number((cart.itemsPrice * 0.17).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(()=>{
        if(success){
            history.push(`/order/${order._id}`)
            dispatch({ type: USER_DETAILS_RESET });
            dispatch({ type: ORDER_CREATE_RESET })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[success, history])

    const placeOrderHandler=()=>{
        dispatch(createOrder({ 
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
         }))
    }
   
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Dostava</h2>
                            <p>
                                <strong>Adresa: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Način plaćanja</h2>
                            <p>
                                <strong>Plaćanje putem: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Narudžba</h2>
                            <p>
                                <strong>Naručeni artikli: </strong>
                                {cart.cartItems.length === 0 ? <Message>Tvoja korpa je prazna.</Message> : (
                                    <ListGroup>
                                        {cart.cartItems.map((item, index)=>(
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} * {item.price} = {(item.qty * item.price).toFixed(2)} KM
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Sažetak narudžbe</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Artikli</Col>
                                    <Col>{cart.itemsPrice} KM </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Dostava</Col>
                                    <Col>{cart.shippingPrice} KM </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>PDV</Col>
                                    <Col>{cart.taxPrice} KM </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Ukupno</Col>
                                    <Col>{cart.totalPrice} KM </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Nastavi s plaćanjem</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
