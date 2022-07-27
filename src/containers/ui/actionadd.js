import { Offcanvas, Container, Row, Button, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import NewGoal from '../goals/newgoal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icon from  'react-bootstrap-icons';
export default function ActionAdd({ show, setShow, ...props }) {
    const [showNewGoal, setShowNewGoal] = useState(false);
    const [showShareGoal, setShowShareGoal] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    return (
        <>
            <style type="text/css">
            {
                `
                    .action-add-off-canvas {
                        background-color: rgba(10, 10, 10, 0.95);
                        color: #aaaaaa; 
                        height: 30vh;
                    }
                    .action-button-offcanvas-actions {
                        background-color: #121212;
                        height: 100px;
                        color: #34aaaa;
                        width: 80%;
                        max-width: 200px;
                        font-size: 16pt;
                        border-radius: 15px;
                        border: #34aaaa 1px solid;
                        transition: all ease 0.2s;
                    }   
                    .action-button-offcanvas-actions:hover, 
                    .action-button-offcanvas-actions:focus,
                    .action-button-offcanvas-actions:active,
                    .action-button-offcanvas-actions:focus-visible {
                        background-color: #121212;
                        border: #34aaaa 1px solid;
                        color: #34dcbe;
                        transform: scale(1.01);
                    }
                `
            }
            </style>
            <Offcanvas placement={"bottom"} className="action-add-off-canvas" show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header />
                <Offcanvas.Body as={Container}>
                    <Row className="d-flex justify-content-end">
                        <Col className="d-flex justify-content-center">
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                    <Tooltip>
                                        <h4>
                                            New Post
                                        </h4>
                                    </Tooltip>
                                }
                            >
                                <Button className="action-button-offcanvas-actions" variant="dark" onClick={() => { navigate('/app/feed/') }}>
                                    New Post&nbsp;<Icon.PencilSquare width={40} height={40} color={"#098899"} />
                                </Button>
                            </OverlayTrigger>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                    <Tooltip>
                                        <h4>
                                            New Goal
                                        </h4>
                                    </Tooltip>
                                }
                            >
                                <Button className="action-button-offcanvas-actions" variant="dark" onClick={() => {setShowNewGoal(true) }}>
                                    New Goal&nbsp;<Icon.PlusCircleFill  width={40} height={40} color={"#098899"} />
                                </Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
            <NewGoal show={showNewGoal} setShow={setShowNewGoal} />
        </>
    )
}