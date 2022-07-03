import { Navbar, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { loggedIn } from '../../app/features/users/userSlice';
export default function BottomNav() {
    const _loggedIn = useSelector(loggedIn);
    return (
        (_loggedIn) ? (
            <>
                <style type="text/css">
                {
                    `
                        .nav-bottom-logged-in {

                        }
                        .nav-bottom-logged-in-cont {

                        }

                        .icon-select-bottom-nav {
                            cursor: pointer;
                            transition: all ease 0.2s;
                            color: #34aaaa;
                        }
                        .icon-select-bottom-nav:hover {
                            background-color: #252525;
                            color: #34dcbe;
                        }
                        .icon-select-bottom-nav:hover * {
                            background-color: #252525;
                            transform: scale(1.05);
                        }
                    `
                }
                </style>
                <Navbar fixed="bottom" className="nav-bottom-logged-in">
                    <Container fluid className="h-100 nav-bottom-logged-in-cont w-100">
                        <Row className="w-100 h-100">
                            <Col xs="4" className="p-2 h-100 d-flex justify-content-center icon-select-bottom-nav">
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
                            <Col xs="4" className="p-2 d-flex justify-content-center icon-select-bottom-nav">
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
                            <Col xs="4" className="p-2 d-flex justify-content-center icon-select-bottom-nav">
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                        <Tooltip id="button-tooltip">
                                            Goals Completed
                                        </Tooltip>
                                    }
                                >
                                    <Icon.AwardFill width={45} height={45} />
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