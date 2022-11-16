import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../src/StyleSheets/Login.css";
import { connect } from 'react-redux';
import * as actions from '../src/actions/index';
import { SubUrl } from './Contants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function loginUser(credentials) {

    let url = SubUrl.authToken;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => {
            if (data.status === 200) {
                console.log(`data.tokens`, data.tokens)
                return data.json()
            } else {
                return 'Not valid credentials!!';
            }
        })
}

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username: email,
            password: password
        });
        console.log({ token });
        // if (token !== 'Not valid credentials!!') 
        if (token !== 'Not valid credentials!!') {

            localStorage.setItem("auth_token", token.token);
            localStorage.setItem("role", token.role);

            setTimeout(() => {
                props.history.push('Home');
            }, 200);

        } else {
            toast('Not Valid credentials!!')
        }
    }

    return (
        <>
            <div style={{ padding: '60px 0' }}>
                <div style={{ margin: '0 auto', boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.1)", width: '370px' }}>
                    <Form onSubmit={handleSubmit} style={{ margin: '0 auto', maxWidth: '320px' }}>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label style={{ float: 'left', marginTop: '20px' }}>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type=""
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label style={{ float: 'left', marginTop: '20px' }}>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button block size="lg" type="submit" style={{ margin: '20px' }} disabled={!validateForm()}>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

const mapStateToProps = (state) => ({
    user_auth_token: state.HomeProcessReducers.user_auth_token,
});

const mapDispatchToProps = (dispatch) => ({
    get_auth_code: (authData) => dispatch(actions.getAuthTokenRequest(authData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
