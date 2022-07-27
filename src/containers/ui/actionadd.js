import { Offcanvas, Container, Row, Button, Col } from 'react-bootstrap';
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
                        height: 25vh;
                    }
                    .action-button-offcanvas-actions {
                        background-color: #121212;
                        height: 100px;
                        color: #098899;
                        width: 80%;
                        font-size: 30pt;
                        border-radius: 15px;
                        border: #34dcbe 1px solid;

                    }   
                    .action-button-offcanvas-actions:hover, 
                    .action-button-offcanvas-actions:focus,
                    .action-button-offcanvas-actions:active,
                    .action-button-offcanvas-actions:focus-visible {
                        background-color: #121212;
                        border: #34dcbe 1px solid;
                        color: #098899;
                    }
                `
            }
            </style>
            <Offcanvas placement={"bottom"} className="action-add-off-canvas" show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body as={Container}>
                    <Row className="d-flex justify-content-end">
                        <Col className="d-flex justify-content-center">
                            <Button className="action-button-offcanvas-actions" variant="dark" onClick={() => { navigate('/app/feed/') }}>
                                <Icon.ShareFill width={40} height={40} color={"#098899"} />&nbsp;&nbsp;&nbsp;Post
                            </Button>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Button className="action-button-offcanvas-actions" variant="dark" onClick={() => {setShowNewGoal(true) }}>
                                <Icon.PlusCircleFill  width={40} height={40} color={"#098899"} />&nbsp;&nbsp;&nbsp;New Goal
                            </Button>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
            <NewGoal show={showNewGoal} setShow={setShowNewGoal} />
        </>
    )
}