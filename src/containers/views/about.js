import { Container, Row, Col } from 'react-bootstrap';
import mtn from '../../static/images/mtn.jpg';

export default function AboutView() {
    return (
            <>
                <style type="text/css">
                {
                    `
                        .about-cont {                          
                            font-size: 50pt; 
                            color: #4dcbe3;
                            text-align: center; 
                            height: 100vh;
                            background-image: url("${mtn}");
                            background-repeat: no-repeat;
                            background-size: cover;
                        }
                        .title-about {
                            font-weight: 500; 
                            font-size: 4vh; 
                            color: #cccccc;
                            margin-top: 20px;
                            margin-bottom: 20px;
                        }
                        .title-about-2 {
                            margin-top: 50px;
                            font-size: 4vh;
                            color: #cccccc;
                            text-align: left;
                        }
                        .title-about-3 {
                            margin-top: 50px;
                            font-size: 4vh;
                            color: #cccccc;
                            text-align: right;
                        }
                        .title-about-help {
                            font-size: 4vh; 
                            margin-top: 75px;
                        }
                        .row-about-1 {
                            padding-top: 150px;
                        }
                        .row-about-2,
                        .row-about-4  {
                        }
                        .row-about-3 {
                        }
                        .zero-text {
                            color: darkred !important; 
                            font-weight: 500;
                        }
                        .contact-button {
                            font-weight: 500;
                            font-size: 5vh; 
                            padding: 15px;
                            border-radius: 15px; 
                            background-color: #252525;
                        }
                        @media only screen and (max-width: 400px) {
                            .row-about-img {
                                margin-top: 143px;
                            }
                          }
                        .row-about-img {
                            height: 400px;
                            text-align: center;
                            justify-content: center;
                            margin-bottom: 20px;
                        }
                        .room-arrow {
                            margin-top: auto;
                            margin-bottom: auto;
                            font-weight: 700;
                        }
                        .messy-room-caption,
                        .clean-room-caption {
                            font-size: 2vh;
                            color: #454545;
                            text-align: right !important;
                            justify-content: center !important; 
                        }
                        .row-captions {
                            margin-bottom: 15px;
                        }
                    `
                }
                </style>
                <Container className="about-cont" fluid>
                    {
                        // <Row className="row-about-img">
                        // <Col xs="6" className="messy-room">

                        // </Col>
                        // <Col xs="6" className="clean-room">

                        // </Col>
                        // </Row>
                    }
                    <Row className="row-about-1">
                        <Col xs='12' className="title-about">Slacker tested. Slacker approved.</Col>                         
                    </Row>
                    <Row className="row-about-2 pb-5">
                        <Col xs="2"/>
                        <Col xs='6' className="title-about-2">After achieving <span className="zero-text">ZERO</span> of my self-determined goals in June 2022, I created this app to help me stay on track and on schedule for fitness goals.</Col> 
                        <Col xs="3"/>
                    </Row>
                    <Row className="row-about-3 pb-5">
                        <Col xs="3"/>
                        <Col xs='6' className="title-about-3">Utilizing reminders, timelines, and user-friendly design, Goals App's aim is to aid in countless achievements and develop its users to their potential.</Col> 
                        <Col xs="2"/>
                    </Row>
                </Container>
            </>
        )
}