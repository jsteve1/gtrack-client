import { Modal, Container, Row, Col, FloatingLabel, Form, Button } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { evalEmail } from '../../app/utils';

export default function ForgotPwModal({ forgotPwModalShow, setForgotPwModalShow }) {
    const emailRef = useRef(null);
    const [emailValid, setEmailValid] = useState(true); 
    return (
        <>
        <style type="text/css">
        {
            `
                .success-background {
                    background-color: rgba(7,7,7,0.7);
                }
                .success-modal-cont {
                    background-color: #151515;
                    padding: 35px;
                }
                .user-created-modal-col {
                    color: #aaaaaa;
                    font-size: 20pt; 
                    font-weight: 500;
                }
                .user-created-modal-note {
                    color: #999999;
                    font-style: italic;
                    font-size: 10pt; 
                    font-weight: 100;
                }    
                .user-created-send-again {
                    color: #888888;
                    cursor: pointer; 
                    font-size: 12pt; 
                    font-weight: 100;
                    margin-top: 40px;
                }
                .user-created-send-again:hover {
                    color: #34dcbe;
                }
                .login-success-link {
                    color: #34dcbe; 
                    font-weight: 700;
                }
                .signup-input {
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
                .submit-forgot-pw {
                    width: 200px; 
                    font-weight: 500;
                    font-size: 20pt;
                    color: #34dcbe;
                    border: solid 1px #34dcbe;
                }
                .signup-input-email-forgot-pw {
                    background-color: #252525;
                    width: 300px !important;
    
                }
            `
        }
        
        </style>
        <Modal
            show={forgotPwModalShow} 
            onHide={() => setForgotPwModalShow(false)}
            centered
            className="success-background"
        >
            <Container className="success-modal-cont" fluid>
                <Row>
                    <Col />
                    <Col xs="10" className=" mb-2 d-flex justify-content-center user-created-modal-col">
                        <span>Enter your account email and we'll send a password reset to your inbox.</span>
                    </Col>
                    <Col />
                </Row>
                <Row className="border-secondary border-bottom pb-3">
                    <Col xs="12" className="d-flex justify-content-center user-created-modal-note">
                        {`(Please note emails may take up to 15 minutes to receive)`}
                    </Col>
                </Row>
                <Row className="mt-3 mb-3">
                    <Col className="d-flex justify-content-center">
                        <FloatingLabel
                            controlId="floatingEmail"
                            label="Email address"
                            className="floating-label-color mb-3"
                        >
                            <Form.Control required isInvalid={!emailValid} onChange={(e) => { if(!evalEmail(e.target.value)) setEmailValid(false); else{ if(emailValid) return; else setEmailValid(true); }  }} ref={emailRef} type="email" className="signup-input signup-input-email-forgot-pw" variant="dark" placeholder="name@example.com" />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid email.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center ">
                    <Button variant="dark" className="submit-forgot-pw">Submit</Button>
                </Row>
                <Row>
                    <Col />
                    <Col xs="8" className="d-flex justify-content-center user-created-send-again">
                        Didn't receive the email? Click here to try again
                    </Col>
                    <Col />
                </Row>
            </Container>
        </Modal>
        </>
    )
}