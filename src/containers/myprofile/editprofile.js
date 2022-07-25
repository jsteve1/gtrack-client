import { Offcanvas, Container, Row } from 'react-bootstrap';
export default function EditProfile({ show, setShow, ...props }) {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <style type="text/css">
            {
                `
                    .edit-profile-off-canvas {
                        background-color: rgba(10, 10, 10, 0.95);
                        color: #aaaaaa; 
                        height: 75vh;
                    }
                `
            }
            </style>
            <Offcanvas className="edit-profile-off-canvas" show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title>Edit Profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body as={Container}>
                    <Row>
                        
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