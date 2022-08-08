import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; 
import { profile, logout } from '../../app/features/users/userSlice';
import { logoutGoals } from '../../app/features/goals/goalSlice';
import { logoutUI } from '../../app/features/ui/uiSlice';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordModal({ resetPwModalShow, setResetPwModalShow }) {
    const dispatch = useDispatch();
    const _profile = useSelector(profile); 
    const navigate = useNavigate();
    const resetPw = () => {
        navigate('/home');
        dispatch(logout());
        dispatch(logoutUI());
        dispatch(logoutGoals());
        alert('Password reset successful. Please check your email');
    }
    return (
        <>
            <style type="text/css">
            {`
                .reset-pw-cont {
                    background-color: rgba(19, 19, 19, 0.9);
                    padding-top: 25px;
                    min-width: 250px;
                    height: 325px;
                    margin: 0px;
                    padding: 0px;
                }
                .custom-modal-delete  {
                    padding: 0px;
                    z-index: 1800;
                }
                .custom-modal-delete .modal-content {
                    background-color: transparent;
                    border: none;
                }
                .confirm-delete-span {
                    font-size: 25pt; 
                    white-space: nowrap;
                    color: #aaaaaa;
                }
                .delete-action-buttons {
                    font-size: 20pt;
                    width: 120px;
                }
                .confirm-delete-span-info {
                    font-size: 16pt;
                    color: #999999;
                    text-align: center;
                }
             
            `}
            </style>
            <Modal 
                show={resetPwModalShow} 
                onHide={() => setResetPwModalShow(false)}
                centered
                className="custom-modal-delete"
                as={Container}
                >
                <Modal.Body as={Container}>
                    <Container fluid className="reset-pw-cont pt-2">
                        <Row className="d-flex justify-content-center mt-3 mb-1">
                            <Col />
                                <Col>
                                    <span className="confirm-delete-span">
                                        Reset Password
                                    </span>
                                </Col>
                            <Col />
                        </Row>
                        <Row className="d-flex justify-content-center mt-1 mb-3 pb-2">
                            <Col />
                                    <Col xs="8">
                                        <span className="confirm-delete-span-info">
                                            Your account will be locked, you will be logged out, and an account reset email will be sent to {_profile.email}
                                        </span>
                                    </Col>
                            <Col />
                        </Row>
                        <Row>
                            <Col className="justify-content-center d-flex">
                                <Button variant="dark" className="delete-action-buttons" onClick={() => setResetPwModalShow(false)}>
                                    Cancel
                                </Button>
                            </Col>
                            <Col className="justify-content-center d-flex">
                                <Button variant="danger"  className="delete-action-buttons" onClick={() => resetPw()}>
                                    Confirm
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}