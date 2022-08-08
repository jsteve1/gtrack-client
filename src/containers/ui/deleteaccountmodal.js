import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; 
import { profile, logout } from '../../app/features/users/userSlice';
import { logoutGoals } from '../../app/features/goals/goalSlice';
import { logoutUI } from '../../app/features/ui/uiSlice';
import { useNavigate } from 'react-router-dom';

export default function DeleteAccountModal({ deleteAccountModalShow, setDeleteAccountModalShow }) {
    const dispatch = useDispatch();
    const _profile = useSelector(profile); 
    const navigate = useNavigate();
    const deleteProfile = () => {
        navigate('/home');
        dispatch(logout());
        dispatch(logoutUI());
        dispatch(logoutGoals());
        alert('Account deletion successful');
    }
    return (
        <>
            <style type="text/css">
            {`
                .delete-acc-cont {
                    background-color: rgba(19, 19, 19, 0.9);
                    padding-top: 25px;
                
                    min-width: 200px;
                    height: 250px;
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
                show={deleteAccountModalShow} 
                onHide={() => setDeleteAccountModalShow(false)}
                centered
                className="custom-modal-delete"
                as={Container}
                >
                <Modal.Body as={Container}>
                    <Container fluid className="delete-acc-cont pt-2">
                        <Row className="d-flex justify-content-center mt-3 mb-1">
                            <Col />
                                <Col>
                                    <span className="confirm-delete-span">
                                        Are you 100% sure?
                                    </span>
                                </Col>
                            <Col />
                        </Row>
                        <Row className="d-flex justify-content-center mt-1 mb-3 pb-2">
                            <Col />
                                    <Col xs="8">
                                        <span className="confirm-delete-span-info">
                                            All goals and profile information will be deleted
                                        </span>
                                    </Col>
                            <Col />
                        </Row>
                        <Row>
                            <Col className="justify-content-center d-flex">
                                <Button variant="dark" className="delete-action-buttons" onClick={() => setDeleteAccountModalShow(false)}>
                                    Cancel
                                </Button>
                            </Col>
                            <Col className="justify-content-center d-flex">
                                <Button variant="danger"  className="delete-action-buttons" onClick={() => deleteProfile()}>
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}