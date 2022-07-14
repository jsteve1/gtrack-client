import { Container, Row, Col, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

export default function MyProfileInfo({ fname, lname, bio, email, profilepic, setShowEdit }) {
    return (
            <>
                <style type="text/css">
                {
                    `
                        .myprofileinfo-cont {
                                color: #aaaaaa;
                                padding-bottom: 15px;
                                background-color: rgba(100, 100, 100, 0.2);
                                min-height: 100px;
                                padding-left: 50px;
                        }
                        .name-col {
                            font-size: 7vh; 
                            font-weight: 500; 
                        }
                        .email-col, .bio-col {
                            font-size: 3vh; 
                            font-weight: 300; 
                        }
                        .bio-col {
                            font-size: 2vh; 

                        }
                        .edit-profile-btn {
                            font-weight: 300; 
                            font-size: 2vh;
                            background-color: transparent;
                            color: #ddddddd;
                            padding: 15px;
                            border-radius: 10px; 
                            max-width: 200px !important;
                            margin-left: 50px;
                            height: 100px;
                            outline: none; border: none;
                        }
                    `
                }
                </style>
                <Container fluid className="border-top border-secondary myprofileinfo-cont">
                    <Row className="mb-1 pl-5 border-bottom border-secondary">
                        <Col />
                        <Col xs="10" sm="9" className="d-flex justify-content-start name-col">
                            {`${fname} ${lname}`}
                        </Col>
                        <Col />
                    </Row>
                    <Row className="mb-1">
                        <Col />
                        <Col xs="10" sm="9" className="d-flex justify-content-start email-col">
                            {`${email}`}
                        </Col>
                        <Col />
                    </Row>
                    <Row className="mb-1">
                        <Col />
                        <Col xs="10" sm="9" className="d-flex justify-content-start bio-col">
                            {`${bio}`}
                        </Col>
                        <Col />
                    </Row>
                </Container>
            </>
        )
}