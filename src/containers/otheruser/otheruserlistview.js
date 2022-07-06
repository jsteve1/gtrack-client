import { Container, Row, Col, CloseButton, FloatingLabel, Form, Button } from 'react-bootstrap';
import { useState, useRef } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { evalEmail } from '../../app/utils';
import { useSelector } from 'react-redux';
import { selectOtherUsers } from '../../app/features/users/userSlice';
import OtherUserListItem from '../../components/goals/otheruserlistitem';

export default function OtherUserList() {
    const otherUsers = useSelector(selectOtherUsers);
    const [showSearch, setShowSearch] = useState(false);
    const [emailValid, setEmailValid] = useState(true); 
    const emailRef = useRef(null);

    return (
        <>
            <style type="text/css">
            {
                `
                    .other-users-list-app-home {
                        background-color: rgba(100, 100, 100, 0.2);
                        color: #aaaaaa;
                        min-height: 100px;
                        margin-top: 15px;
                    }     
                    .other-users-label {
                        color: #aaaaaa; 
                        font-size: 5vh;
                        font-weight: 500;
                    }
                    .other-users-search {
                        font-size: 4vh;
                        cursor: pointer;
                    }
                    .other-users-search:hover {
                        transform: scale(1.04);
                        color: #34dcbe; 

                    }
                    .floating-label-color  {
                        color: #aaaaaa;
                    }
                    .signup-input {
                        background-color: rgba(80, 80, 80, 0.4);
                        color: #aaaaaa;
                        border: none; 
                        box-shadow: none; 
                        outline: none;
    
                    }
                    .signup-input:hover,                                         
                    .signup-input:focus, 
                    .signup-input:active, 
                    .signup-input:focus-visible {
                        background-color: rgba(80, 80, 80, 0.5);
                        color: #aaaaaa;
                        border: none; 
                        box-shadow: none; 
                    }
                    .searchbutton {
                        max-height: 60px;
                        margin-right: 10px;
                        font-weight: 500;
                        background-color: transparent; 
                        border: 2px solid #34dcbe; 
                        color: #34dcbe;
                    }
                    .other-user-list-cont-row {
                        max-height: 400px; 
                        overflow-y: auto;
                        overflow-x: hidden;
                    }
                `
            }
            </style>
            <Container fluid className="other-users-list-app-home">
                <Row className={`${(showSearch) ? "" : "border-bottom border-secondary"} pb-1`}>
                    <Col xs='6' className="other-users-label d-flex justify-content-start">
                        Other Users
                    </Col>
                    <Col xs="2" className="other-users-search">
                        <Icon.Search onClick={() => setShowSearch(!showSearch)} />
                    </Col>
                </Row>
                {
                    (showSearch) ? 
                    (
                        <Row className="border-bottom border-secondary pb-1">
                            <Col xs="8" sm="6">
                                <FloatingLabel
                                    controlId="floatingEmail"
                                    label="Email address"
                                    className="floating-label-color mb-3"
                                >
                                    <Form.Control required isInvalid={!emailValid}   onChange={(e) => { if(!evalEmail(e.target.value)) setEmailValid(false); else{ if(emailValid) return; else setEmailValid(true); }  }} ref={emailRef} type="email" className="signup-input signup-input-email" variant="dark" placeholder="name@example.com" />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid email.
                                    </Form.Control.Feedback>
                            </FloatingLabel>
                            </Col>      
                            <Col className="d-flex justify-content-start">
                                <Button className="searchbutton" variant="dark">Search</Button>
                                <CloseButton variant="white" onClick={() => setShowSearch(false)} /> 
                            </Col>
                        </Row>
                    )
                    : ""
                }
                <Row className="other-user-list-cont-row">
                    {
                        otherUsers.map((user) => {
                            return (
                                <OtherUserListItem name={`${user.fname} ${user.lname}`} currentGoal={user.currentgoal} goalsAchieved={user.goalsachieved} />
                            )
                        })
                    }
                </Row>
            </Container> 
            </>
    )
}