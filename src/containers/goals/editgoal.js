import { Offcanvas, Container, Row } from 'react-bootstrap';
export default function EditGoal({ show, setShow, editGoalId, ...props }) {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <style type="text/css">
            {
                `
                    .edit-goal-off-canvas {
                        background-color: rgba(10, 10, 10, 0.95);
                        color: #aaaaaa; 
                        height: 75vh;
                    }
                `
            }
            </style>
            <Offcanvas placement={"bottom"} className="edit-goal-off-canvas" show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title>Edit Goal</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body as={Container}>
                    <Row>
                        Goal ID: {editGoalId}
                    </Row>
                    <Row>
                        
                    </Row>
                    <Row>
                        
                    </Row>
                    <Row>
                        
                    </Row>
                    <Row>
                    
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}