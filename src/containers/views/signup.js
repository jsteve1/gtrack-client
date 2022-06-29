import { Container, Row, Col, Form, Button, FloatingLabel, Tooltip, OverlayTrigger, Modal, CloseButton, Navbar } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useRef, useState, useEffect } from 'react';
import mtn from '../../static/images/mtn.jpg';
import { FileUploader } from "react-drag-drop-files";

const renderPrivateProfileTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      If selected, this profile, its data, and its goals won't be seen by other app users 
    </Tooltip>
  );

export default function Signup() {
    const [uploadModalShow, setModalShow] = useState(false);
    // const handleClose = () => setModalShow(false);
    // const handleShow = () => setModalShow(true);
    const [fNameValid, setfNameValid] = useState(true); 
    const [lNameValid, setlNameValid] = useState(true); 
    const [emailValid, setEmailValid] = useState(true); 
    const [pwValid, setPwValid] = useState(true); 
    const [pw2Valid, setPw2Valid] = useState(true); 
    const [bioValid, setBioValid] = useState(true); 
    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const emailRef = useRef(null);
    const pwRef = useRef(null);
    const pw2Ref = useRef(null);
    const bioRef = useRef(null);
    const fileTypes = ["JPEG", "PNG", "GIF"];
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const handleChange = (file) => {
        console.log(file);
        setProfilePic(file);
        setModalShow(false);
    };
    const evalPw = (str) => {
        if(str.length === 0) return true;
        return /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%.,]).{8,100})/.test(str);
    }
    const evalName = (str) => {
        if(str.length === 0) return true;
        return /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(str); 
    }
    const evalBio = (str) => {
        if(str.length === 0) return true;
        if(str.length > 255) return false;
        return true;
    }
    const evalEmail = (str) => {
        if(str.length === 0) return true;
        return /(.+)@(.+){2,}\.(.+){2,}/.test(str);
    }

    useEffect(() => {
        if(!profilePic) {
            setProfilePicPreview(null); 
            return;
        }
        const objectUrl = URL.createObjectURL(profilePic);
        setProfilePicPreview(objectUrl); 

        return () => URL.revokeObjectURL(objectUrl); 
    }, [profilePic] )

    return (
            <>
                <style type="text/css">
                {
                    `
                    .profile-preview {
                        max-height: 120px;
                        border-radius: 20px;
                    }
                    .profile-preview:hover {
                        filter: brightness(0.7);
                        cursor: pointer;
                    }
                    .file-select {
                        color: #aaaaaa;
                    }    
                    .signup-cont {
                            padding-top: 100px;
                            color: #191919;
                            background-image: url(${mtn});
                            background-size: cover;
                            background-position: center top;
                            height: 100% !important;
                        }
                        .signup-col {
                            background-color: rgba(19, 19, 19, 0.3);
                            padding: 35px;
                            border-radius: 10px;
                            max-height: 100%;
                        }   
                        .signup-button {

                        }
                        .private-switch {
                            color: #aaaaaa;
                            background-color: transparent;
                            cursor: pointer;
                        }
                        .form-switch .form-check-input {
                            height: 30px;
                            width: 50px;
                            background-color: #404040;
                            cursor: pointer;

                        }
                        .form-switch .form-check-input:focus {
                            border-color: rgba(0, 0, 0, 0.9);
                            outline: 0;
                            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                            background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba(0,0,0,0.25)'/></svg>");
                        }
                        .form-switch .form-check-input:checked {
                            background-color: #404040;
                            border-color: #30D158;
                            border: none;
                            background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba(255,255,255,1.0)'/></svg>");
                        }
                        .signup-input {
                            background-color: rgba(20, 20, 20, 0.7);
                            color: #aaaaaa;
                            border: none; 
                            box-shadow: none; 
                            outline: none;

                        }
                        .signup-input:hover,                                         
                        .signup-input:focus, 
                        .signup-input:active, 
                        .signup-input:focus-visible {
                            background-color: #202020;
                            color: #aaaaaa;
                            border: none; 
                            box-shadow: none; 
                            outline: none;
                        }
                        .signup-title-row {
                            color: #aaaaaa;
                            font-size: 5vh;
                            font-weight: 500;
                        }
                        .floating-label-color  {
                            color: #aaaaaa;
                        }
                        .private-profile-text {
                            color: #aaaaaa;
                            margin-right: 20px;
                            margin-top: 5px;
                        }
                        .addprofilepic-button {
                            padding: 15px; 
                            font-size: 16pt;
                            border-radius: 15px;
                            font-weight: 400;
                            max-height: 100px;
                        }
                        .signup-button-ctm {
                            font-size: 25pt;
                            font-weight: 700;
                        }
                        .total-height {
                            height: max(100vh, 1000px);
                        }
                        .private-profile-info {
                            color: #404040;
                            cursor: pointer;
                        }
                        .drop-area {
                            background-color: #191919;
                            height: 300px;
                            width: 100%;
                            color: #aaaaaa;
                            border: dashed 1px #aaaaaa;
                        }
                        .navbar-signup-bottom {
                            background-color: rgba(19,19,19,0.5);
                        }
                    `
                }
                </style>
                <div className="total-height">      
                <Container className="signup-cont" fluid>
                    <Row>
                        <Col xs="1" />
                        <Col className="signup-col">
                            <Row className="signup-title-row d-flex justify-content-center mb-5">
                                Please enter your profile details:
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
                                        />
                                    </span>&nbsp;&nbsp;
                                    <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 0, hide: 400 }}
                                        overlay={renderPrivateProfileTooltip}
                                    >
                                        <Icon.InfoCircle className="private-profile-info" />
                                    </OverlayTrigger>
                                </Col>
                                {
                                    (profilePic === null) ? ( 
                                        <Col xs="12" sm="4" className="mt-2 d-flex justify-content-center">
                                            <Button variant="dark" className="addprofilepic-button" onClick={() => setModalShow(true)}>
                                                Add Profile Pic <Icon.Upload />
                                            </Button>
                                        </Col>) : (
                                            <Col xs="12" sm="4" className="mt-3 d-flex justify-content-center">
                                                <img onClick={() => setModalShow(true)} className="profile-preview" src={profilePicPreview} />
                                                <CloseButton variant="white" onClick={() => {setProfilePic(null)}}/>
                                             </Col>   
                                        )
                                }
                            </Row>
                        </Col>
                        <Col xs="1" />
                    </Row>
                </Container>    
                </div>
                <Modal 
                    show={uploadModalShow} 
                    onHide={() => setModalShow(false)}
                    centered
                    >
                    <FileUploader
                        multiple={false}
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                        maxSize="8"
                        minSize="0"
                        classes="drop-area"
                    />
                </Modal>
                <Navbar className="d-flex justify-content-center navbar-signup-bottom" fixed="bottom">
                    <Button variant="dark" className="signup-button signup-button-ctm">
                        Complete Signup <Icon.Check />
                    </Button>
                </Navbar>
            </>
        )
}