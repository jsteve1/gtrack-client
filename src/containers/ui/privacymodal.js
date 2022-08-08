import { Container, Row, Col, CloseButton } from 'react-bootstrap';

export default function PrivacyModal({ setShowPrivacyModal }) {
    return (
        <>
            <style type="text/css">
                {
                    `
                    .privacy-cont {
                        color: #aaaaaa;
                        background-color: #191919;
                        padding: 15px;
                    }
                    `
                }
            </style>
            <Container fluid className="privacy-cont">
            <Row className="d-flex justify-content-center">
                <CloseButton variant="white" onClick={() => setShowPrivacyModal(false) } />
            </Row>
            <Row>
                <Col />
                <Col xs="10" className="">
                    <br></br>
                    <center><h2>Disclaimer</h2></center>
                    <br></br>
                    This application was designed to practice my frontend web development skills. 
                    <br></br>
                    <br></br>
                    Any account data stored on the server is subject to deletion.   
                    <br></br>
                    <br></br>
                    Any questions can be sent to goaltrackeradm@gmail.com 
                    <br></br>
                    <br></br>
                </Col>
                <Col />
            </Row>
        </Container>
    </>
    )
}