import { Container, Row, Col, Form, Button, FloatingLabel, Tooltip, OverlayTrigger, CloseButton, Navbar, Spinner } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useRef, useState, useEffect } from 'react';
import { evalPw, evalName, evalBio, evalEmail, checkProfileFields } from '../../app/utils';
import UploadModal from '../ui/uploadmodal';
import SignupSuccessModal from '../ui/successmodal';
import SignupStyle from '../../styles/containers/views/SignupStyle';

export default function Signup() {
    const [showSignupSpinner, setShowSignupSpinner] = useState(false);
    const [uploadModalShow, setUploadModalShow] = useState(false);
    const [successModalShow, setSuccessModalShow] = useState(false);
    const [fNameValid, setfNameValid] = useState(true); 
    const [lNameValid, setlNameValid] = useState(true); 
    const [emailValid, setEmailValid] = useState(true); 
    const [pwValid, setPwValid] = useState(true); 
    const [pw2Valid, setPw2Valid] = useState(true); 
    const [bioValid, setBioValid] = useState(true); 
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const [showSignupError, setShowSignupError] = useState(false);
    const [signupError, setSignupError] = useState("");

    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const emailRef = useRef(null);
    const pwRef = useRef(null);
    const pw2Ref = useRef(null);
    const bioRef = useRef(null);
    const privateBoolRef = useRef(null);

    useEffect(() => {
        if(!profilePic) {
            setProfilePicPreview(null); 
            return;
        }
        const objectUrl = URL.createObjectURL(profilePic);
        setProfilePicPreview(objectUrl); 

        return () => URL.revokeObjectURL(objectUrl); 
    }, [profilePic] );

    const submitSignup = async () => {
        setShowSignupError(false);
        setShowSignupSpinner(true);
        if(!checkProfileFields(
            {
                fname: `${fnameRef.current.value}`,
                lname: `${lnameRef.current.value}`,
                email: `${emailRef.current.value}`,
                pw: `${pwRef.current.value}`,
                pw2: `${pw2Ref.current.value}`,
                bio: `${bioRef.current.value}`
            }
        )) {
            console.error("Error while checking sign up fields.");
            setShowSignupError(true);
            return;
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_APP_DOMAIN}/api/user/create`, {
                method: "POST",
                body: JSON.stringify({
                    "fname": `${fnameRef.current.value}`,
                    "lname": `${lnameRef.current.value}`,
                    "email": `${emailRef.current.value}`,
                    "pw": `${pwRef.current.value}`,
                    "private": privateBoolRef.current.checked, 
                    "media": [],
                    "bio":  `${bioRef.current.value}`
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
            const body = await res.json();
            console.log(body);
            if(body.id && body.email === emailRef.current.value) {
                setSuccessModalShow(true);
            } else {
                if(body.statusCode === 400) {
                    setSignupError("authorization error with the server");
                }
                if(body.statusCode === 500) {
                    setSignupError("internal server error");
                }
            }
            setShowSignupSpinner(false);
        } catch(err) {
            console.error("Error while attempting to signup. Please try again or contact the page administrator.");
            setShowSignupSpinner(false);
            setShowSignupError(true);
        }     
    }

    return (
            <>
                <SignupStyle />
                <div className="total-height">      
                <Container className="signup-cont" fluid>
                    <Row className="d-flex justify-content-center">
                        <Col xs="1" />
                        <Col className="signup-col">
                            <Row className="signup-title-row d-flex justify-content-center mb-5">
                                Enter Account Details:
                            </Row>
                            <Row>
                                <Col xs="12" sm="6">
                                    <FloatingLabel
                                        controlId="floatingFirstName"
                                        label="First Name"
                                        className="floating-label-color mb-3"
                                    >
                                        <Form.Control required isInvalid={!fNameValid}  onChange={(e) => { if(!evalName(e.target.value)) setfNameValid(false); else{ if(fNameValid) return; else setfNameValid(true); }  }} ref={fnameRef} className="signup-input signup-input-fname" variant="dark" type="text" placeholder="John" />
                                        <Form.Control.Feedback type="invalid">
                                            Names cannot contain numbers or special characters.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                                <Col xs="12" sm="6">
                                    <FloatingLabel
                                        controlId="floatingLastName"
                                        label="Last Name"
                                        className="floating-label-color mb-3"

                                    >
                                        <Form.Control required isInvalid={!lNameValid}   onChange={(e) => { if(!evalName(e.target.value)) setlNameValid(false); else{ if(lNameValid) return; else setlNameValid(true); }  }} ref={lnameRef} className="signup-input signup-input-lname" variant="dark" type="text" placeholder="Doe" />
                                        <Form.Control.Feedback type="invalid">
                                            Names cannot contain numbers or special characters.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingEmail"
                                        label="Email address"
                                        className="floating-label-color mb-3"
                                    >
                                        <Form.Control required isInvalid={!emailValid}   onChange={(e) => { if(!evalEmail(e.target.value)) setEmailValid(false); else{ if(emailValid) return; else setEmailValid(true); }  }} ref={emailRef} type="email" className="signup-input signup-input-email" variant="dark" placeholder="name@example.com" />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid email.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingPw"
                                        label="Password"
                                        className="floating-label-color mb-3"
                                    >
                                        <Form.Control required isInvalid={!pwValid}   onChange={(e) => { if(!evalPw(e.target.value)) setPwValid(false); else{ if(pwValid) return; else setPwValid(true); }  }}  ref={pwRef} type="password" className="signup-input signup-input-pw" variant="dark" placeholder=" " />
                                        <Form.Control.Feedback type="invalid">
                                            Password must be at least 8 characters, contain at least 1 digit, 1 lowercase letter, 1 uppercase letter, and one special character
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingPw2"
                                        label="Confirm Password"
                                        className="floating-label-color mb-3"
                                    >
                                        <Form.Control required isInvalid={!pw2Valid} onChange={(e) => { if(!evalPw(e.target.value) || e.target.value !== pwRef.current.value) setPw2Valid(false); else{ if(pw2Valid) return; else setPw2Valid(true); }  }} ref={pw2Ref} type="password" className="signup-input signup-input-pw2" variant="dark" placeholder=" "  />
                                        <Form.Control.Feedback type="invalid">
                                            Please ensure passwords match
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FloatingLabel className="floating-label-color" controlId="floatingTextarea" label="Biography (Optional)">
                                        <Form.Control
                                            ref={bioRef}
                                            as="textarea"
                                            placeholder="Tell us about yourself"
                                            style={{ height: '75px' }}
                                            className="signup-input signup-input-bio"
                                            isInvalid={!bioValid} 
                                            onChange={(e) => { if(!evalBio(e.target.value)) setBioValid(false); else{ if(bioValid) return; else setBioValid(true); }  }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Biography cannot be more than 255 characters.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col xs="12" sm="4" className="mt-2 d-flex justify-content-center">
                                    <span className="d-flex justify-content-between">
                                        <span className="private-profile-text">Private Profile</span> <Form.Check 
                                            type="switch"
                                            id="custom-switch"
                                            className="private-switch"
                                            variant="dark"
                                            ref={privateBoolRef}
                                        />
                                    </span>&nbsp;&nbsp;
                                    <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 0, hide: 400 }}
                                        overlay={
                                            <Tooltip id="button-tooltip">
                                                If selected, this profile, its data, and its goals won't be seen by other app users 
                                            </Tooltip>
                                        }
                                    >
                                        <Icon.InfoCircle className="private-profile-info" />
                                    </OverlayTrigger>
                                </Col>
                                {/* {
                                    (profilePic === null) ? ( 
                                        <Col xs="12" sm="4" className="mt-2 d-flex justify-content-center">
                                            <Button variant="dark" className="addprofilepic-button" onClick={() => setUploadModalShow(true)}>
                                                Add Profile Pic <Icon.Upload />
                                            </Button>
                                        </Col>) : (
                                            <Col xs="12" sm="4" className="mt-3 d-flex justify-content-center">
                                                <img alt="Profile Pic Preview" onClick={() => setUploadModalShow(true)} className="profile-preview" src={profilePicPreview} />
                                                <CloseButton variant="white" onClick={() => {setProfilePic(null)}}/>
                                             </Col>   
                                        )
                                } */}
                            </Row>
                            {(showSignupError) ? (<Row>
                                <Col className="d-flex justify-content-center">
                                    <span className="signup-error">An error occured while attempting to create a new account. {`${signupError}`}</span>
                                </Col>
                                </Row>): ""}
                        </Col>
                        <Col xs="1" />
                    </Row>
                </Container>    
                </div>
                <UploadModal uploadModalShow={uploadModalShow} setUploadModalShow={setUploadModalShow} setProfilePic={setProfilePic} />
                <SignupSuccessModal successModalShow={successModalShow} setSuccessModalShow={setSuccessModalShow} />
                <Navbar className="d-flex justify-content-center navbar-signup-bottom" fixed="bottom">
                    <Button variant="dark" className="signup-button signup-button-ctm" onClick={() => submitSignup()}>
                        {(showSignupSpinner) ? <Spinner animation="border" /> : (<>{`Complete Signup`} <Icon.Check /></>)}
                    </Button>
                </Navbar>
            </>
        )
}