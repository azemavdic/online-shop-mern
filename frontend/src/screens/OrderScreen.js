import React, { useEffect } from "react";
import { Button, Row, Col,ListGroup, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({match}) => {
    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    if(!loading){

        //Calculate price
        const addDecimals = (num)=>{
            return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        order.itemsPrice = addDecimals (order.orderItems.reduce((acc, item)=> acc + item.price * item.qty,0))
    }

    useEffect(()=>{
        if(!order || order._id !== orderId){
            dispatch(getOrderDetails(orderId))
        }   
    },[dispatch, orderId, order])

   
    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
        <h1>Narudžba {order._id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Dostava</h2>
                            <p><strong>Ime: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong>
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Adresa: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Dostavljeno {order.deliveredAt}.</Message> : <Message variant='danger'>Nije dostavljeno.</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Način plaćanja</h2>
                            <p>
                                <strong>Plaćanje putem: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Plaćeno {order.paidAt}.</Message> : <Message variant='danger'>Nije plaćeno.</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Narudžba</h2>
                            <p>
                                <strong>Naručeni artikli: </strong>
                                {order.orderItems.length === 0 ? <Message>Nemate narudžbi. Molimo naručite nešto.😊</Message> : (
                                    <ListGroup>
                                        {order.orderItems.map((item, index)=>(
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
                                    <Col>{order.itemsPrice} KM </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Dostava</Col>
                                    <Col>{order.shippingPrice} KM </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>PDV</Col>
                                    <Col>{order.taxPrice} KM </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Ukupno</Col>
                                    <Col>{order.totalPrice} KM </Col>
                                </Row>
                            </ListGroup.Item>
                            
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderScreen
