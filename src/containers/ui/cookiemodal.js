import { Container, Row, Col, Button, CloseButton } from 'react-bootstrap';
import { useCookies } from 'react-cookie'
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
export default function CookieModal({ setShowCookieModal }){
    const [cookies, setCookie] = useCookies(['ackCookie']);
    const navigate = useNavigate();
    const setAckCookie = () => {
        let expires = new Date()
        expires.setTime(expires.getTime() + 100000)
        setCookie('ackCookie', 'acknowledged', { path: '/',  expires});
        navigate('/app/signin');
    }
    return (
        <>
            <style>
            {
                `
                    .cookie-cont {
                        color: #aaaaaa;
                        background-color: #191919;
                        padding: 15px;
                    }
                    .ack-cookie {
                        position: fixed; 
                        top: 85%;
                        left: 55vw; 
                        font-size: 24pt;
                        padding: 15px;
                        background-color: rgba(7,7,7,0.4);
                    }
                    @media only screen and (max-width: 550px) {
                        .ack-cookie {
                            left: 20vw; 
                            top: 90%;
                        }
                    }
                `
            }
            </style>
            <Container className="cookie-cont">
                <Row className="d-flex justify-content-end"><CloseButton variant="white" onClick={() => setShowCookieModal(false) } /></Row>
                <Row>
                    <Col>
                    {(cookies.ackCookie === 'acknowledged') ? "" : <Button variant="success" className="ack-cookie" onClick={() => setAckCookie()}>Acknowledge <Icon.Check /></Button>}
                    <h1>Cookie Policy for Goals App (Scroll to bottom for acknowledge)</h1>

                    <p>This is the Cookie Policy for Goals App, accessible from gtrack1.herokuapp.com</p>
                    
                    <p><strong>What Are Cookies</strong></p>
                    
                    <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.</p>
                    
                    <p><strong>How We Use Cookies</strong></p>
                    
                    <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>
                    
                    <p><strong>Disabling Cookies</strong></p>
                    
                    <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies. This Cookies Policy was created with the help of the <a href="https://www.cookiepolicygenerator.com/cookie-policy-generator/">Cookies Policy Generator</a>.</p>
                    <p><strong>The Cookies We Set</strong></p>
                    
                    <ul>
                    
                    <li>
                        <p>Account related cookies</p>
                        <p>If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.</p>
                    </li>
                    
                    <li>
                        <p>Login related cookies</p>
                        <p>We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.</p>
                    </li>
                    
                    
                    <li>
                        <p>Site preferences cookies</p>
                        <p>In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</p>
                    </li>
                    
                    </ul>
                    
                    <p><strong>Third Party Cookies</strong></p>
                    
                    <p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
                    
                    <ul>
                    
                    </ul>
                    
                    <p><strong>More Information</strong></p>
                    
                    <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>
                    
                    <p>For more general information on cookies, please read <a href="https://www.cookiepolicygenerator.com/sample-cookies-policy/">the Cookies Policy article</a>.</p>
                    
                    <p>However if you are still looking for more information then you can contact us through one of our preferred contact methods:</p>
                    
                    <ul>
                    <li>Email: goaltrackeradm@gmail.com</li>
                    
                    </ul>
                    </Col>
                </Row>
            </Container>
        </>
    )
}