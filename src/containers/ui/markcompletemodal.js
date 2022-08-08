import { Modal, Container, Row, Col, Button, CloseButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; 
import { selectGoals, updateGoal, markComplete } from '../../app/features/goals/goalSlice';
import * as Icon from 'react-bootstrap-icons'; 
import { useEffect, useState } from 'react';
import { getDeadlineFormatted } from '../../components/goals/goallistitem';
import { useNavigate } from 'react-router-dom';
export default function MarkCompleteModal({ id, markCompleteModalShow, setMarkCompleteModalShow, setShowEditGoal, setShowEditGoalId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goals = useSelector(selectGoals); 
    const [goal, setGoal] = useState({});
    const _markComplete = () => {
        dispatch(markComplete({ id }));
        setMarkCompleteModalShow(false); 
    }
    const _view = () => {
        dispatch(markComplete({ id }));
        setMarkCompleteModalShow(false); 
        navigate(`/app/goal/${id}`);
    }
    useEffect(() => {
        if(goal.id !== id){
            const _goal = goals.filter((goal) => goal.id === id)[0];
            if(_goal)
                setGoal(_goal);
        }
    }, [id]);
    return (
        <>
            <style type="text/css">
            {`
                .mark-complete-cont {
                    background-color: rgba(19, 19, 19, 0.875);
                    padding-top: 25px;
                    min-width: 500px;
                    width: 500px;
                    min-height: 400px;
                    height: fit-content;
                    margin: 0px;
                    padding: 25px;
                    border-radius: 10px;
                }
                .custom-mark-complete  {
                    min-width: 400px;
                    padding: 0px;
                    left: 0px;
                    z-index: 1055;
                }
                .custom-mark-complete .modal-content {
                    background-color: transparent;
                    border: none;
                }
                .confirm-mark-complete-span {
                    font-size: 25pt; 
                    white-space: nowrap;
                    color: #aaaaaa;
                }
                .mark-complete-buttons {
                    font-size: 16pt;
                    width: 120px;
                }
                .mark-complete-offcanvas-actions {
                    border: 1px solid #34aaaa;
                    width: 150px;
                    font-size: 14pt;
                    text-align: center;
                    padding-right: 35px;
                    min-height: 75px;
                    padding-top: 10px;
                    white-space: nowrap;
                }
                .congrats-span {
                    color: #34aaaa;
                    font-weight: 500;
                    font-size: 18pt;
                }
                @media only screen and (max-width: 400px) {
                    .mark-complete-cont {
                        min-width: 365px;
                        width: 365px;
                    }
                    .custom-mark-complete  {
                        left: -35px;
                        width: 100%;
                    }
                }
            `}
            </style>
            <Modal 
                show={markCompleteModalShow} 
                onHide={() => setMarkCompleteModalShow(false)}
                centered
                className="custom-mark-complete"
                as={Container}
                >
                <Modal.Body as={Container}>
                    <Container fluid className="mark-complete-cont pt-2">
                        <Row className="d-flex justify-content-center mt-3 mb-5">
                            <Col />
                                <Col>
                                    <span className="confirm-mark-complete-span congrats-span">
                                        Congrats! Goal Completed!
                                    </span>
                                </Col>
                            <Col />
                        </Row>
                        <Row className="d-flex justify-content-center mt-3 mb-5">
                                <Col />
                                <Col>
                                    <span className="confirm-mark-complete-span">
                                        {goal.name} 
                                    </span>
                                </Col>
                                <Col />
                        </Row>
                        <Row className="d-flex justify-content-center mt-3 mb-5">
                                <Col />
                                <Col className="pl-5">
                                    <span className="pl-5 ml-5 confirm-mark-complete-span">
                                        Time: {getDeadlineFormatted(Date.now() / 1000)}
                                    </span>
                                </Col>
                                <Col />
                        </Row>
                        <Row className="d-flex justify-content-end">
                            <Col xs="12" md="4" className="d-flex justify-content-center">
                                <Button className="mark-complete-offcanvas-actions" variant="dark" onClick={() => setMarkCompleteModalShow(false) }>
                                    <Icon.X width={40} height={40} color={"#098899"} />&nbsp;&nbsp;Cancel
                                </Button>
                            </Col>
                            <Col xs="12" md="4" className="d-flex justify-content-center">
                                <Button className="mark-complete-offcanvas-actions" variant="dark">
                                    <Icon.Trophy width={35} height={35} color={"#098899"} onClick={() => _view() }/>&nbsp;&nbsp;View
                                </Button>
                            </Col>
                            <Col xs="12" md="4" className="d-flex justify-content-center">
                                <Button className="mark-complete-offcanvas-actions" variant="dark" onClick={() => _markComplete() }>
                                    <Icon.CheckCircleFill width={40} height={40} color={"#098899"} />&nbsp;&nbsp;Confirm
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}