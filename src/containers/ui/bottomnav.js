import { Navbar, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { loggedIn } from '../../app/features/users/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
export default function BottomNav() {
    const _loggedIn = useSelector(loggedIn);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log("location changed", location);
    }, [location]);
    return (
        (_loggedIn) ? (
            <>
                <style type="text/css">
                {
                    `
                        .nav-bottom-logged-in {
                            margin-bottom: -10px;
                            width: 104vw
                        }
                        .nav-bottom-logged-in-cont {

                        }

                        .icon-select-bottom-nav {
                            cursor: pointer;
                            transition: all ease 0.2s;
                            color: #34aaaa;
                            background-color: rgba(19, 19, 19, 0.9);
                        }
                        .icon-select-bottom-nav:hover {
                            background-color: #252525;
                            color: #34dcbe;
                        }
                        .icon-select-bottom-nav:hover * {
                            background-color: #252525;
                            transform: scale(1.05);
                        }
                        .bot-nav-home {
                            ${(location.pathname === '/app/home/' || location.pathname === '/app/home') ? "background-color: #232323;" : ""} 
                        }
                        .bot-nav-goals-list {
                            ${(location.pathname === '/app/goals/' || location.pathname === '/app/goals') ? "background-color: #232323;" : ""} 
                        }
                        .bot-nav-feed {
                            ${(location.pathname === '/app/profile/' || location.pathname === '/app/profile') ? "background-color: #232323;" : ""} 
                        }
                        @media only screen and (max-width: 668px) {
                            .nav-bottom-logged-in {
                                width: 110vw
                            }
                        }
                    `
                }
                </style>
                <Navbar fixed="bottom" className="nav-bottom-logged-in">
                    <Container fluid className="h-100 nav-bottom-logged-in-cont w-100">
                        <Row className="w-100 h-100">
                            <Col xs="4" onClick={() => { navigate('/app/home');  }} className="p-2 h-100 d-flex justify-content-center icon-select-bottom-nav bot-nav-home">
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                        <Tooltip id="button-tooltip">
                                            Home
                                        </Tooltip>
                                    }
                                >
                                    <Icon.HouseDoorFill width={45} height={45} />
                                </OverlayTrigger>
                            </Col>
                            <Col xs="4"  onClick={() => { navigate('/app/goals'); }} className="p-2 d-flex justify-content-center icon-select-bottom-nav bot-nav-goals-list">
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                        <Tooltip id="button-tooltip">
                                            My Goals
                                        </Tooltip>
                                    }
                                >
                                    <Icon.ListCheck width={45} height={45} />
                                </OverlayTrigger>
                            </Col>
                            <Col xs="4"  onClick={() => { navigate('/app/profile') }}  className="p-2 d-flex justify-content-center icon-select-bottom-nav bot-nav-feed">
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                        <Tooltip id="button-tooltip">
                                            Profile
                                        </Tooltip>
                                    }
                                >
                                    <Icon.PersonFill width={45} height={45} />
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </Container>
                    </Navbar>
                </>
            ) 
        :
            (<></>)
    );
}