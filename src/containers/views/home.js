import { Container, Button, Navbar, Modal, Row, Col, CloseButton } from 'react-bootstrap';
import arnold from '../../static/images/arnold.jpg';
import arnoldback from '../../static/images/arnoldback.jpg';
import lesbrown from '../../static/images/lesbrown.png';
import tonyrobbins from '../../static/images/robbins.jpg';
import brucelee from '../../static/images/brucelee.jpg';
import goggins from '../../static/images/goggins.jpg';
import * as Icon from 'react-bootstrap-icons';
import { useEffect, useRef, useState } from 'react'; 
import { useSpring, animated as a } from 'react-spring'
import PrivacyModal from '../ui/privacymodal';
import CookieModal from '../ui/cookiemodal';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import mtn from '../../static/images/mtn.jpg';

export default function Home() {
    const [quoteMoving, setQuoteMoving] = useState(false);
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [quotePicIndex, setQuotePicIndex] = useState(0);
    const [isDisabled, setDisabled] = useState(false); 
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showCookiesModal, setShowCookiesModal] = useState(false);
    const [cookies] = useCookies(['ackCookie']);
    const navigate = useNavigate();
    const springprops = useSpring({ 
        marginTop: quoteMoving ? "150vh" : "5vh",
        onStart: () => { 
            if(quoteMoving) setQuotePicIndex((quotePicIndex === mappedQuotes.current.quotes.length - 1) ? 0 : quotePicIndex + 1);
        },
        onRest: () => {
            if(quoteMoving) setQuoteIndex((quoteIndex === mappedQuotes.current.quotes.length - 1) ? 0 : quoteIndex + 1);
            setQuoteMoving(false); 
        },
        config: { tension: 200 }
    })
    const mappedQuotes = useRef({ 
        quotes: [
            {
                img: arnold, 
                quote: "Dreams are for the dreamers. Goals are for achievers."
            },
            {
                img: arnoldback, 
                quote: "The first and most important thing is that you've got to have a goal and a vision."
            },  
            {
                img: lesbrown, 
                quote: "Your goals are the road maps that guide and show you what is possible for your life."
            },
            {
                img: tonyrobbins,
                quote: "Goals are like magnets; they'll attract the things that make them come true."
            },
            {
                img: brucelee,
                quote: "If you love life, don't waste time, for time is what life is made up of."
            }, 
            { 
                img: goggins, 
                quote: "If you want to get better, do the things that no one else wants to do."
            }
        ]
    })
    useEffect(() => {
        if(isDisabled) {
            setTimeout(() => {
                setDisabled(false); 
            }, 1000);
        }
    }, [isDisabled]);
    const getStarted = () => {
        if(cookies.ackCookie !== 'acknowledged')
            setShowCookiesModal(true); 
        else {
            navigate('/app/signin');
        }
    }
    return (
            <>
                <style type="text/css">
                {
                    `
                        .home-cont {
                            padding-top: 80px;
                            text-align: center;
                            background-image: url("${mtn}");
                            background-repeat: no-repeat;
                            height: 1080px;
                            max-height: 100vh;
                            background-size: cover;
                            transition: background 1.0s ease;
                            overflow: hidden;                          
                        }
              
                        .test {
                            color: blue;
                        }
                        .goals-quotes {
                            color: #34dcbe; 
                            font-weight: 500; 
                            font-size: 5vh;
                            text-shadow: 1px 1px 5px black;
                            text-align: center;
                            display: inline-block;
                        }
                        .goals-quotes-next {
                            color: #34dcbe;
                            font-weight: 300; 
                            font-size: 2vh;
                            text-shadow: 1px 1px 5px black;
                            font-style: italic;
                            cursor: pointer;
                            ${isDisabled ? "color: #555555; cursor: not-allowed;" : ""}
                            position: fixed;
                            top: 70%;
                            left: 75vw;
                            border-radius: 10px;
                            padding: 5px;
                            opacity: 0.8;
                        }
                        .goals-quote {
                            overflow-wrap: break-word; 
                        }
                        .title {
                            color: #DDDDDD; 
                            margin-top: 20px;
                            font-size: 5vh;
                            text-shadow: 1px 1px 5px black;
                            font-weight: 600;
                            text-align: left;
                            margin-left: 10%;
                        }
                        .title2 {
                            margin-left: 20%;
                        }
                        .title3 {
                            margin-left: 30%;
                        }
                        .getstarted {
                            margin-top: 35px;
                            text-align: center;
                        }
                        .getstartedbtn {
                            font-weight: 500; 
                            font-size: 5vh;
                            background-color: transparent;
                            border: 4px solid #dddddd;
                            color: #ddddddd;
                            padding: 10px;
                            border-radius: 10px; 
                        }
                        @media only screen and (max-width: 500px) {
                            .title {
                                margin-top: 35px;
                            }
                            .goals-quotes {
                                font-size: 3.5vh;
                            }
                          }
                        @media only screen and (max-width: 600px) {
                            .goals-quotes-next {
                                top: 90vh;
                            }
                        }
                        @media only screen and (max-height: 800px) {
                            .goals-quotes-next {
                                top: 90vh;
                            }
                        }
                        .home-footer {
                            color: #999999;
                            font-size: 16pt;
                            font-weight: 100;
                            padding-bottom: 25px;
                        }
                        .privacy-btn {
                            cursor: pointer; 
                            margin-right: 10px;
                            margin-left: 5px;
                            display: inline-block;
                        }
                        .contact-btn {
                            cursor: pointer; 
                            margin-right: 10px;
                            display: inline-block;

                        }
                        .cookies-btn {
                            cursor: pointer; 
                            display: inline-block;

                        }
                        .privacy-btn:hover,
                        .contact-btn:hover,
                        .cookies-btn:hover {
                            color: #34dcbe; 
                        }
                        .home-footer-nav {
                            margin-top: 15px;
                            background-color: transparent;
                        }
                        .contact-modal {
                            font-size: 25pt; 
                            font-weight: 500;
                            color: #aaaaaa;
                            background-color: #191919;
                            padding: 50px;
                        }    
                        .contact-title {
                            font-size: 20pt;
                            color: #999999;
                        }         
                        .cookie-modal-background {
                            background-color: transparent !important;

                        }
                        .contact-email {
                            overflow-wrap: break-word;
                        }
                `
                }
                </style>
                <Container fluid className="home-cont">
                        <div className="title"><span><Icon.ListCheck color='#34dcbe'/> Track, </span></div>
                        <div className="title title2"><span><Icon.HourglassSplit color='#34dcbe' /> Pursue,</span></div>
                        <div className="title title3"><span><Icon.AwardFill color='#34dcbe'/> & Achieve your Goals. </span></div>
                        <div className="getstarted"><span><Button variant="dark" className="getstartedbtn" onClick={() => getStarted()}>Get Started </Button></span></div>
                        <a.div className="goals-quotes" style={springprops}>
                        <span className="goals-quote">"{`${mappedQuotes.current.quotes[0].quote}`}"</span>                   
                        {
                           //<span className="goals-quote">"{`${mappedQuotes.current.quotes[quoteIndex].quote}`}"</span> 
                        }                
                        </a.div>
                        {
                            // <div className="goals-quotes-next">
                            //     <span className="goals-quoteright" onClick={() => { if(!isDisabled) { setQuoteMoving(true); setDisabled(true); } }}>Next Quote <Icon.ArrowCounterclockwise /></span>           
                            // </div>
                        }
                  
                </Container>
                <Navbar className="home-footer-nav d-flex justify-content-center" fixed="bottom">
                    <div className="home-footer d-flex justify-content-center">
                        <span className="privacy-btn" onClick={() => setShowPrivacyModal(true)}>Privacy</span> 
                        <span className="contact-btn" onClick={() => setShowContactModal(true)}>Contact</span>
                        <span className="cookies-btn" onClick={() => setShowCookiesModal(true)}>Cookies Policy</span>
                    </div>
                </Navbar>
                <Modal
                    show={showPrivacyModal} 
                    onHide={() => setShowPrivacyModal(false)}
                    centered
                    size="lg"
                    className="privacy-modal-background"
                >
                   <PrivacyModal setShowPrivacyModal={setShowPrivacyModal} />
                </Modal>
                <Modal
                    show={showContactModal} 
                    onHide={() => setShowContactModal(false)}
                    centered
                    className="privacy-modal-background"
                >
                    <Container className="contact-modal" fluid>
                        <Row className="d-flex justify-content-end">
                            <CloseButton variant="white" onClick={() => setShowContactModal(false) } />
                        </Row>
                        <Row>
                            <Col className="contact-text">
                                <p className="contact-title">Questions, concerns, or suggestions? Send me an email:</p>
                                <span className="contact-email">goaltrackeradm@gmail.com</span>
                            </Col>
                        </Row> 
                    </Container>
                </Modal>
                <Modal
                    show={showCookiesModal} 
                    centered
                    className="cookie-modal-background"
                    onHide={() => setShowCookiesModal(false)}
                >
                    <CookieModal setShowCookieModal={setShowCookiesModal} />
                </Modal>
            </>
        )
}