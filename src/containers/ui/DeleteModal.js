import { FileUploader } from "react-drag-drop-files";
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux'; 
import { removeGoal } from '../../app/features/goals/goalSlice';
export default function DeleteGoalModal({ id, deleteModalShow, setDeleteModalShow }) {
    const deleteGoal = () => {
        dispatch(removeGoal({ id }));
        setDeleteModalShow(false); 
    }
    const dispatch = useDispatch();
    return (
        <>
            <style type="text/css">
            {`
                .delete-goal-cont {
                    background-color: rgba(19, 19, 19, 0.9);
                    padding-top: 25px;
                
                    min-width: 200px;
                    height: 200px;
                    margin: 0px;
                    padding: 0px;
                }
                .custom-modal-delete  {
                    padding: 0px;
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
            `}
            </style>
            <Modal 
                show={deleteModalShow} 
                onHide={() => setDeleteModalShow(false)}
                centered
                className="custom-modal-delete"
                as={Container}
                >
                <Modal.Body as={Container}>
                    <Container fluid className="delete-goal-cont pt-2">
                        <Row className="d-flex justify-content-center mt-3 mb-5">
                            <Col />
                                <Col>
                                    <span className="confirm-delete-span">
                                        Are you sure?
                                    </span>
                                </Col>
                            <Col />
                        </Row>
                        <Row>
                            <Col className="justify-content-center d-flex">
                                <Button variant="dark" className="delete-action-buttons" onClick={() => setDeleteModalShow(false)}>
                                    Cancel
                                </Button>
                            </Col>
                            <Col className="justify-content-center d-flex">
                                <Button variant="danger"  className="delete-action-buttons" onClick={() => deleteGoal(id)}>
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