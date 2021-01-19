import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if(!user.name || user._id !== userId){
        dispatch(getUserDetails(userId))
    }else{
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
    }
  }, [dispatch, userId, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Nazad
      </Link>
      <FormContainer>
        <h1>Ažuriraj korisnika</h1>
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

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Upiši email adresu'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='isadmin'>
            <Form.Check
              type='checkbox'
              label='Admin'
              checked = {isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
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

export default UserEditScreen;
