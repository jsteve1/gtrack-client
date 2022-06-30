import { Container, Row, Col, Form, FloatingLabel, Button, Spinner } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { evalEmail, evalPw } from '../../app/utils';
import mtn from '../../static/images/mtn.jpg';
import { login } from '../../app/features/users/userSlice'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppNav from '../ui/navbar';

export default function Signin() {
    const [emailValid, setEmailValid] = useState(true); 
    const [pwValid, setPwValid] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setShowLoginError] = useState(false);
    const emailRef = useRef(null);
    const pwRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const checkLogin = () => {
        if(!evalEmail(emailRef.current.value)) {
            setEmailValid(false);
            console.error("Email is invalid, cannot login")
            return false;
        } else setEmailValid(true); 
        if(!evalPw(pwRef.current.value)) {
            setPwValid(false);
            console.error("Password is invalid, cannot login")
            return false;
        } else setPwValid(true);
        return true;
    }
    const submitLogin = async () => {
       setLoginLoading(true);
       setShowLoginError(false); 
       if(!checkLogin()) {
        console.error("Error while logging in, parameters are incorrectly formatted");
        return;
       }
       try {
        const res = await fetch(`http://localhost:3000/api/signon/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: `${emailRef.current.value}`,
                password: `${pwRef.current.value}`
            })
           });
           const body = await res.json(); 
           console.log(body);
           if(body.user.id && body.user.email === emailRef.current.value) {
            setLoginLoading(false);
            dispatch(login(body.user));
            navigate('/home', { replace: true });
           } else {
                setLoginLoading(false);
                setShowLoginError(true);
                return;
           }
       } catch(err) {
        setLoginLoading(false);
        setShowLoginError(true);
        return;
       }

    }
    return (
            <>
                <style type="text/css">
                {
                    `
                        .signin-col {
                            margin-top: 2vh;
                            background-color: rgba(3,3,3, 0.9);
                            max-width: 750px;
                            padding-top: 35px;
                            padding-bottom: 35px;
                            border-radius: 15px;
                        }
                        .signin-row {
                            padding-top: 150px;
                        }
                        .signin-cont {
                            background-image: url("${mtn}");
                            background-size: cover;
                            height: 100% !important;
                        }
                        .signup-input {
                            background-color: rgba(20, 20, 20, 0.7);
                            color: #aaaaaa;
                            border: none; 
                            box-shadow: none; 
                            outline: none;

                        }
                        .signup-input:hover,                                         
                        .signup-input:focus, 
                        .signup-input:active, 
                        .signup-input:focus-visible {
                            background-color: #202020;
                            color: #aaaaaa;
                            border: none; 
                            box-shadow: none; 
                            outline: none;
                        }
                        .floating-label-color  {
                            color: #aaaaaa;
                        }
                        .login-button {
                            padding: 20px;
                            font-weight: 500; 
                            font-size: 3vh;
                            width: 100%;
                            margin-left: 20px;
                            margin-right: 20px;
                            border-radius: 20px;
                            margin-top: 50px;
                        }
                        .login-title {
                            font-size: 5vh;
                            color: #aaaaaa;
                            font-weight: 500;
                        }
                        .private-switch {
                            color: #aaaaaa;
                            background-color: transparent;
                            cursor: pointer;
                        }
                        .form-switch .form-check-input {
                            height: 30px;
                            width: 50px;
                            background-color: #404040;
                            cursor: pointer;

                        }
                        .form-switch .form-check-input:focus {
                            border-color: rgba(0, 0, 0, 0.9);
                            outline: 0;
                            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                            background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba(0,0,0,0.25)'/></svg>");
                        }
                        .form-switch .form-check-input:checked {
                            background-color: #404040;
                            border-color: #30D158;
                            border: none;
                            background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba(255,255,255,1.0)'/></svg>");
                        }
                        .col-remember-me {
                            color: #aaaaaa;
                        }
                        .total-height {
                            height: max(100vh, 1000px);
                        }
                        .col-error-logging-in {
                            color: darkred; 
                            font-weight: 100;
                        }
                    `
                }
                </style>    
                <AppNav />
                <div className="total-height">
                    <Container fluid className="signin-cont">
                        <Row className="signin-row d-flex justify-content-center">
                        <Col xs="1"/>
                            <Col className="signin-col">
                                <Row className="mb-5 d-flex justify-content-center login-title"> 
                                    Goals App Login 
                                </Row>
                                <Row>   
                                    <Col xs="1" sm="3"/>
                                    <Col xs="10" sm="6" >
                                        <FloatingLabel
                                            controlId="floatingEmail"
                                            label="Email address"
                                            className="floating-label-color mb-3"
                                        >
                                            <Form.Control required isInvalid={!emailValid}  ref={emailRef} type="email" className="signup-input signup-input-email" variant="dark" placeholder="name@example.com" />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a valid email.
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="1" sm="3"/>
                                </Row>
                                <Row>
                                    <Col xs="1" sm="3"/>
                                    <Col xs="10" sm="6" >
                                        <FloatingLabel
                                            controlId="floatingPw"
                                            label="Password"
                                            className="floating-label-color mb-3"
                                        >
                                            <Form.Control required isInvalid={!pwValid} ref={pwRef} type="password" className="signup-input signup-input-pw" variant="dark" placeholder=" " />
                                            <Form.Control.Feedback type="invalid">
                                                Password must be at least 8 characters, contain at least 1 digit, 1 lowercase letter, 1 uppercase letter, and one special character
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                        </Col>
                                    <Col xs="1" sm="3"/>
                                </Row>
                                <Row>
                                    <Col xs="1" sm="3"/>
                                    <Col className="d-flex justify-content-center">
                                        <Button variant="dark" className="login-button" onClick={() => submitLogin()}>
                                         {(loginLoading) ? <Spinner animation="border" /> : "Login" }
                                        </Button>
                                    </Col>
                                    <Col xs="1" sm="3"/>
                                </Row>
                                {
                                    (loginError) ? (<Row>
                                        <Col className="d-flex justify-content-center align-items-center mt-5 col-remember-me col-error-logging-in">
                                            Error while logging In. Please make sure your email and password are correct               
                                        </Col> 
                                        </Row>) : ""  
                                }
                                <Row>
                                <Col xs="1" sm="3"/>
                                    <Col className="d-flex justify-content-center align-items-center mt-5 col-remember-me">
                                        Forgot Password                
                                    </Col>
                                    <Col xs="1" sm="3"/>
                                </Row>
                            </Col>
                            <Col xs="1"/>
                        </Row>
                    </Container>
                </div>
            </>
        )
}