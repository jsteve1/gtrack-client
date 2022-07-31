import { Offcanvas, Container, Row, Col, FloatingLabel, OverlayTrigger, Form, Tooltip, Button, CloseButton } from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';
import { evalPw, evalName, evalBio, evalEmail  } from '../../app/utils';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux'; 
import { editProfile, profile } from '../../app/features/users/userSlice';
import Switch from "react-switch";

export default function EditProfile({ show, setShow, ...props }) {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const myprofile = useSelector(profile); 
    const dispatch = useDispatch();
    const [nameEditing, setNameEditing] = useState(false); 
    const [bioEditing, setBioEditing] = useState(false); 
    const [fNameValid, setfNameValid] = useState(true); 
    const [lNameValid, setlNameValid] = useState(true); 
    const [bioValid, setBioValid] = useState(true); 
    const [signupError, setSignupError] = useState("");
    const [privacyChecked, setPrivacyChecked] = useState("");    
    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const bioRef = useRef(null);
    const privateBoolRef = useRef(null);    
    const submitNameUpdate = () => [

    ]

    const submitBioUpdate = () => {

    }

    const submitPrivacyUpdate = () => {

    }

    const submitResetPassword = () => {

    }

    const submitDeleteAccount = () => {

    }
    return (
        <>
            <style type="text/css">
            {
                `
                    .edit-profile-off-canvas {
                        background-color: rgba(15, 15, 15, 0.9);
                        color: #aaaaaa; 
                        height: 75vh;
                        overflow-y: hidden;

                    }
                    .signup-col {
                        background-color: transparent;
                        padding: 35px;
                        border-radius: 10px;
                        max-height: 100%;
                        max-width: 750px;
                        overflow-y: hidden;

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
                        background-color: rgba(35, 35, 35, 0.7);
                        color: #aaaaaa;
                        border: none; 
                        box-shadow: none; 
                        outline: none;
                        width: 30vw;
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
                        font-size: 4vh;
                        font-weight: 500;
                    }
                    .myprofiledesc-cont {
                        background-color: transparent;
                        /* background-color: rgba(100, 100, 100, 0.2); */
                        min-height: 400px;
                        margin-top: 25px;
                        color: #aaaaaa;
                        margin-bottom: 150px;
                        overflow-y: hidden;
                    }
                    .desc-data-row {
                        font-size: 16pt;
                        height: 60px;
                        padding-top: 5px;
                        cursor: pointer;
                    }
             
                    .desc-data-stats {
                        color: #34dcbe;
                        font-size: 3vh;
                        font-weight: 500;
                        width: 200px;
                        max-width: 250px;
                        margin-left: auto;
                    }
                    .desc-data-stats-bio {
                        color: #34dcbe;
                        font-size: 12pt;
                        font-weight: 500;
                        text-overflow: ellipsis;
                        width: 200px;
                        max-width: 250px;
                        margin-left: auto;
                    }
                    .max-width-field-div {
                        max-width: 120px; 
                        width: 120px;
                        font-size: 14pt;
                        color: #aaaaaa;
                        font-weight: 500;
                    }
                    .icon-edit-profile {
                        color: #777777;
                        display: block; 
                        max-width: 50px;
                    }
                    .container-edit-icon {
                        max-width: 100px;
                    }
                    .edit-profile-actions {
                        height: 75px;
                        color: #34aaaa;
                        margin: 5px;
                        width: 155px;
                        background-color: rgba(100, 100, 100, 0.1);
                    }
                    .edit-profile-title {
                        color: #34dcbe;
                        font-size: 20pt;
                        font-weight: 500;
                        height: 70px;
                        align-items: center;
                    }
                    .icon-edit-profile:hover {
                        color: #aaaaaa;
                    }

                    .icon-edit-profile-action {
                        width: 50px;
                        height: 50px;
                        margin-left: 15px;
                    }
                    .spacing-edit {
                        width: 30px;
                    }
                    .editing-row {
                        height: 120px;
                    }
                    .dark-bg-title {
                        background-color: rgba(20, 20, 20, 0.7);
                        height: 80px;
                    }
            `
            }
            </style>
            <Offcanvas className="edit-profile-off-canvas" show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton closeVariant="white" className="border-bottom border-dark dark-bg-title">
                    <Offcanvas.Title as={Container} className="d-flex justify-content-center edit-profile-title"><Icon.Gear width={40} height={40} color={"#34dcbe"} />&nbsp;Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body as={Container}>
                        <Row className={`desc-data-row mb-2 mt-3 ${nameEditing ? "editing-row" : ""}`}>
                            <Col />
                            <Col xs="12" md="8" className={`d-flex justify-content-between border-bottom border-dark align-items-center pb-3`}>
                                {
                                    (nameEditing) ? 
                                    <>

                                        <Form.Control 
                                            required 
                                            isInvalid={!fNameValid}  
                                            onChange={(e) => { if(!evalName(e.target.value)) setfNameValid(false); else{ if(fNameValid) return; else setfNameValid(true); }  }} 
                                            ref={fnameRef} 
                                            className="signup-input" 
                                            variant="dark" 
                                            type="text" 
                                            placeholder={`First Name`} />
                
                                        <div className="spacing-edit"></div>
                                        
                                        <Form.Control 
                                            required 
                                            isInvalid={!lNameValid}  
                                            onChange={(e) => { if(!evalName(e.target.value)) setfNameValid(false); else{ if(fNameValid) return; else setfNameValid(true); }  }} 
                                            ref={fnameRef} 
                                            className="signup-input" 
                                            variant="dark" 
                                            type="text" 
                                            placeholder={`Last Name`} />
                        
                                        <div className="spacing-edit"></div>
                                        <Icon.CheckCircleFill className="icon-edit-profile-action" width={35} height={35} onClick={() => submitNameUpdate(true) } />
                                        <Icon.X className="icon-edit-profile-action" width={35} height={35} onClick={() => setNameEditing(false) } />
                                    </>
                                    :
                                    <>
                                        <div className="max-width-field-div">Name</div> 
                                        <span className="desc-data-stats">{`${myprofile.fname} ${myprofile.lname}`}</span>
                                        <Icon.PencilFill className="icon-edit-profile" width={25} height={25} onClick={() => setNameEditing(true) } />
                                    </>
                                }
                               
                            </Col>
                            <Col />
                        </Row>
                        <Row className={`desc-data-row mb-2 ${bioEditing ? "editing-row" : ""}`}>
                            <Col />

                            <Col xs="12" md="8" className={`d-flex justify-content-start border-bottom border-dark align-items-center pb-3`}>
                            {
                                (bioEditing) ? (
                                    <>
                                        <Form.Control
                                            ref={bioRef}
                                            as="textarea"
                                            placeholder="Bio"
                                            style={{ height: '75px', width: "85vw" }}
                                            className="signup-input signup-input-bio"
                                            isInvalid={!bioValid} 
                                            onChange={(e) => { if(!evalBio(e.target.value)) setBioValid(false); else{ if(bioValid) return; else setBioValid(true); }  }}
                                        />
                                        <div className="spacing-edit"></div>
                                        <Icon.CheckCircleFill className="icon-edit-profile-action" width={35} height={35} onClick={() => submitBioUpdate(true) } />
                                        <Icon.X className="icon-edit-profile-action" width={35} height={35} onClick={() => setBioEditing(false) } />
                                    </>
                                ) : (
                                    <>
                                        <div className="max-width-field-div">
                                            Bio 
                                        </div>
                                        <div className="desc-data-stats-bio ml-auto">
                                            {`${myprofile.bio}`}
                                        </div>
                                        <Icon.PencilFill className="icon-edit-profile" width={25} height={25} onClick={() => setBioEditing(true) } />
                                    </>
                                )
                            }        
                            </Col>
                            
                            <Col />
                        </Row>
                        <Row className="desc-data-row mt-2">
                            <Col />
                                <Col xs="12" md="8" className="d-flex justify-content-between align-items-center border-bottom border-dark">
                                    Private&nbsp;Profile&nbsp;<Switch
                                        checked={privacyChecked}
                                        onChange={() => { setPrivacyChecked(!privacyChecked) }}
                                        onColor="#098888"
                                        onHandleColor="#34aaaa"
                                        handleDiameter={30}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={20}
                                        width={48}
                                        className="react-switch"
                                        id="material-switch"
                                    />
                                </Col>
                            <Col />
                        </Row>
                        <Row className="desc-data-row mt-3">
                            <Col />
                                <Col xs="12" md="8" className="d-flex justify-content-end flex-wrap align-items-end">
                                    <Button variant="dark" className="edit-profile-actions shadow-lg">
                                        <Icon.ArrowCounterclockwise width={25} height={25} />&nbsp;
                                        Reset Account
                                    </Button>
                                    <Button variant="dark" className="edit-profile-actions shadow-lg">
                                        <Icon.PersonXFill width={30} height={30} />&nbsp;
                                        Delete Account 
                                    </Button>
                                    <Button variant="dark" className="edit-profile-actions shadow-lg">
                                        <Icon.BoxArrowRight width={30} height={30} />&nbsp;
                                        Sign out
                                    </Button>
                                </Col>
                            <Col />
                        </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}