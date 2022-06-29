import { Container, Row, Col,Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import clean from '../../static/images/clean.jpg';
import messy from '../../static/images/messy.jpg';
export default function AboutView() {
    return (
            <>
                <style type="text/css">
                {
                    `
                        .about-cont {
                            margin-top: 80px; 
                            font-size: 50pt; 
                            color: #4dcbe3;
                            text-align: center;
                        }
                        .title-about {
                            font-weight: 500; 
                            font-size: 4vh; 
                            color: #AAAAAA;
                            margin-top: 20px;
                            margin-bottom: 20px;
                        }
                        .title-about-2 {
                            margin-top: 50px;
                            font-size: 4vh;
                            color: #888888;
                            text-align: left;
                        }
                        .title-about-3 {
                            margin-top: 50px;
                            font-size: 4vh;
                            color: #888888;
                            text-align: right;
                        }
                        .title-about-help {
                            font-size: 4vh; 
                            margin-top: 75px;
                        }
                        .row-about-1 {
                        }
                        .row-about-2,
                        .row-about-4  {
                            background-color: #212121;
                        }
                        .row-about-3 {
                            background-color: #171717;
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
                        .messy-room {
                            background-image: url(${messy}); 
                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: 0% 75%;
                            filter: brightness(0.65);
                        }
                        .messy-room::after {
                            content: "Before Goals App:";
                            position: absolute;
                            left: 30px;
                            top: 35px;    
                            color: white;
                            font-weight: 600;
                            font-size: 20pt;
                            z-index: 1;
                        }
                        .clean-room::after {
                            content: "After:";
                            position: absolute;
                            left: 30px;
                            top: 35px;    
                            color: black;
                            font-weight: 600;
                            font-size: 20pt;
                            z-index: 1;
                        }
                        .clean-room {
                            background-image: url(${clean}); 
                            background-size: cover;
                            background-position: 70% 75%;
                            background-repeat: no-repeat;
                            filter: brightness(0.65);
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
                    <Row className="row-about-img">
                        <Col xs="6" className="messy-room">

                        </Col>
                        <Col xs="6" className="clean-room">

                        </Col>
                    </Row>
                    <Row className="row-about-1">
                        <Col xs='12' className="title-about">Slacker tested. Slacker approved.</Col>                         
                    </Row>
                    <Row className="row-about-2 pb-5 border-dark border-bottom">
                        <Col xs="2"/>
                        <Col xs='6' className="title-about-2">After achieving <span className="zero-text">ZERO</span> of my self-determined goals in June 2022, I created this app to help me stay on track and on schedule for fitness goals.</Col> 
                        <Col xs="3"/>
                    </Row>
                    <Row className="row-about-3 pb-5 border-dark border-bottom">
                        <Col xs="3"/>
                        <Col xs='6' className="title-about-3">Utilizing reminders, timelines, and user-friendly design, Goals App's aim is to aid in countless achievements and develop its users to their potential.</Col> 
                        <Col xs="2"/>
                    </Row>
                    </Container>
            </>
        )
}