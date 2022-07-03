import { Modal, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function SignupSuccessModal({ successModalShow, setSuccessModalShow }) {
    return (
        <>
        <style type="text/css">
        {
            `
                .success-background {
                    background-color: rgba(7,7,7,0.7);
                }
                .success-modal-cont {
                    background-color: #151515;
                    padding: 35px;
                }
                .user-created-modal-col {
                    color: #aaaaaa;
                    font-size: 20pt; 
                    font-weight: 500;
                }
                .user-created-modal-note {
                    color: #999999;
                    font-style: italic;
                    font-size: 10pt; 
                    font-weight: 100;
                }    
                .user-created-send-again {
                    color: #888888;
                    cursor: pointer; 
                    font-size: 12pt; 
                    font-weight: 100;
                    margin-top: 40px;
                }
                .user-created-send-again:hover {
                    color: #34dcbe;
                }
                .login-success-link {
                    color: #34dcbe; 
                    font-weight: 700;
                }
            `
        }
        
        </style>
        <Modal
            show={successModalShow} 
            onHide={() => setSuccessModalShow(false)}
            centered
            className="success-background"
        >
            <Container className="success-modal-cont" fluid>
                <Row>
                    <Col />
                    <Col xs="8" className="d-flex justify-content-center user-created-modal-col">
                        <span>User successfully created. Check your inbox for a confirmation email and <Link to="/app/signin" className="login-success-link">login!</Link></span>
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col />
                    <Col xs="8" className="d-flex justify-content-center user-created-modal-note">
                        {`(Please note emails may take up to 15 minutes to receive)`}
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col />
                    <Col xs="8" className="d-flex justify-content-center user-created-send-again">
                        Didn't receive the email? Click here to try again
                    </Col>
                    <Col />
                </Row>
            </Container>
        </Modal>
        </>
    )
}