import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers } from '../actions/userActions'

const UserListScreen = () => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, users, error } = userList

    useEffect(()=>{
        dispatch(listUsers())
    },[dispatch])

    const deleteHandler = (userId)=>{
        const deleteUser = users.filter(user=> user.id !== userId)
        if(deleteUser){

        }
    }

    return (
        <div>
            <h1>Korisnici</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped responsive bordered hover className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>IME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>
                                    {user.isAdmin ? '✔' : '❌'}
                                </td>
                                <LinkContainer to={`/user/${user._id}/edit`}>
                                    <Button className='btn-sm' variant='light'>
                                        <i className='fas fa-edit' ></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)} >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default UserListScreen
