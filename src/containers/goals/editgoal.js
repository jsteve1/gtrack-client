import { Offcanvas, Container, Row, Button, Col, Form, Dropdown, Tooltip, OverlayTrigger  } from 'react-bootstrap';
import { useState, useRef, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { evalPw, evalName, evalBio, evalEmail  } from '../../app/utils';
import { editProfile, profile } from '../../app/features/users/userSlice';
import * as Icon from 'react-bootstrap-icons';
import Switch from "react-switch";
import { selectGoal } from '../../app/features/goals/goalSlice';
import { getDeadlineFormatted } from '../../components/goals/goallistitem';
import TimePicker from 'react-bootstrap-time-picker';

export const CustomGoalReminderActions = forwardRef(( { onClick }, ref) => (

        <>
            <style type="text/css">
                {
                    `
                        .icon-person-top-nav {
                            cursor: pointer;
                            color: #aaaaaa;
                        }
                        .icon-person-top-nav:hover {
                            transform: scale(1.05); 
                            color: #34dcbe;
                        }
                    `
                }
            </style>
            <span
                ref={ref}
                onClick={(e) => {
                e.preventDefault();
                onClick(e);
                }}
                className="icon-person-top-nav"
            >
                <Icon.ThreeDotsVertical className="goal-list-item-action" width={40} height={40} /> 
            </span>
        </>
));

export const EditGoalReminderDropdown = ({ deadline, reminders, setReminders }) => {
    return (
        <>
        <style type="text/css">
        {
            `
                .reminders-dropdown {
                    
                }
            `
        }
        </style>
        <Dropdown.Menu variant="dark">
            <Dropdown.Item onClick={(e) => { }}>
                15 Mins Before Deadline
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => { }}>
                1 Hour Before Deadline
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => { }}>
                Day Before Deadline
            </Dropdown.Item>

            <Dropdown.Item onClick={(e) => { }}>  
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => { }}>

            </Dropdown.Item>
        </Dropdown.Menu>
        </>
    )
}
export default function EditGoal({ show, setShow, editGoalId, ...props }) {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const goal = useSelector(selectGoal(editGoalId)); 
    const dispatch = useDispatch();
    const [nameEditing, setNameEditing] = useState(false); 
    const [privateEditing, setBioEditing] = useState(false); 
    const [fNameValid, setfNameValid] = useState(true); 
    const [lNameValid, setlNameValid] = useState(true); 
    const [privateValid, setBioValid] = useState(true); 
    const [signupError, setSignupError] = useState("");
    const [privacyChecked, setPrivacyChecked] = useState("");    
    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const privateRef = useRef(null);
    const privateBoolRef = useRef(null);   
    const [time, setTime] = useState("");
    const [enteredDate, setEnteredDate] = useState("");
    const [enteredPrio, setEnteredPrio] = useState("");
    const [reminders, setReminders] = useState(false);
    const [prioEditing, setPrioEditing] = useState(false);
    const [remindersChecked, setRemindersChecked] =  useState(false);
    const [postponedChecked, setPostponedChecked] = useState(false);

    const handleTimeChange = (time) => {
        console.log(time);
        setTime(time);
    } 

    const submitNameUpdate = () => {

    }

    const submitBioUpdate = () => {

    }
    
    const submitPrioUpdate = () => {
        
    }

    return (
        <>
            <style type="text/css">
            {
                `
                    .edit-goal-off-canvas {
                        background-color: rgba(10, 10, 10, 0.95);
                        color: #aaaaaa; 
                        height: 75vh;
                    }
                    .signup-input {
                        background-color: rgba(35, 35, 35, 0.7);
                        color: #aaaaaa;
                        border: none; 
                        box-shadow: none; 
                        outline: none;
                        width: 30vw;
                        min-width: 250px;
                        height: 70px;
                        font-size: 21pt;
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
                        max-height: 100px;
                        min-height: 80px;
                        padding-top: 5px;
                        cursor: pointer;
                    }
             
                    .desc-data-stats-goal {
                        color: #999999;
                        font-size: 20pt;
                        font-weight: 500;
                        width: 250px;
                        max-width: 280px;
                        margin-left: auto;
                    }
                    .desc-data-stats-goal-private,
                    .desc-data-stats-goal-prio {
                        color: #999999;
                        font-size: 20pt;
                        font-weight: 500;
                        text-overflow: ellipsis;
                        width: 250px;
                        max-width: 300px;
                        margin-left: auto;
                        white-space: nowrap;
                    }
                    .desc-data-stats-goal-prio {
                        max-width: 75px;
                    }
                    .max-width-field-div {
                        max-width: 120px; 
                        width: 120px;
                        font-size: 16pt;
                        color: #34aaaa;
                        font-weight: 200;
                    }
                    .icon-edit-profile {
                        color: #777777;
                        display: block; 
                        max-width: 50px;
                    }
                    .container-edit-icon {
                        max-width: 100px;
                    }
                    .edit-goal-actions {
                        height: 75px;
                        color: #aaaaaa;
                        margin: 5px;
                        min-width: 155px;
                        max-width: 20vw;
                        
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
                        max-width: 50px;
                        max-height: 50px;
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
                    .time-picker-input {
                        width: min-content;
                        height: 80px;
                        font-size: 2.5vh;
                        margin-top: auto;
                    }
                    .form-control-date-picker {
                        width: min-content;
                        height: 80px;
                        font-size: 2.5vh;
                        margin-top: auto;
                        margin-bottom: -5px;
                    }
                    .submit-change-icon {
                        color: #34aaaa;
                    }
                    .reminders-col {
                        font-weight: 200;
                        color: #34aaaa;
                    }
                    .number-picker-control {
                        width: 120px;
                    }
                `
            }
            </style>
            <Offcanvas placement={"bottom"} className="edit-goal-off-canvas" show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title>Edit Goal</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body as={Container}>
                        <Row className={`desc-data-row mb-2 mt-3 ${nameEditing ? "editing-row" : ""}`}>
                            <Col />
                            <Col xs="12" md="8" className={`d-flex justify-content-between border-bottom border-dark align-items-center pb-3`}>
                                {
                                    (nameEditing) ? 
                                    <>
                                        <Col className="d-flex justify-content-start align-items-center">
                                            <Form.Control 
                                                required 
                                                isInvalid={!fNameValid}  
                                                onChange={(e) => { if(!evalName(e.target.value)) setfNameValid(false); else{ if(fNameValid) return; else setfNameValid(true); }  }} 
                                                ref={fnameRef} 
                                                className="signup-input shadow-lg" 
                                                variant="dark" 
                                                type="text" 
                                                placeholder={`New Name`} />    
                                        </Col>           
                                            <div className="spacing-edit"></div>
                                            <Col className="d-flex justify-content-end align-items-center">
                                            <Icon.CheckCircleFill className="submit-change-icon icon-edit-profile-action" width={"7vw"} height={"7vw"} onClick={() => submitNameUpdate(true) } />
                                            <Icon.X className="icon-edit-profile-action" width={"7vw"} height={"7vw"} onClick={() => setNameEditing(false) } />
                                        </Col>           
                                    </>
                                    :
                                    <>
                                        <div className="max-width-field-div">Name</div> 
                                        <span className="desc-data-stats-goal">{`${goal?.name || undefined}`}</span>
                                        <div className="spacing-edit"></div>
                                        <Icon.PencilFill className="icon-edit-profile" width={20} height={20} onClick={() => setNameEditing(true) } />
                                    </>
                                }
                               
                            </Col>
                            <Col />
                        </Row>
                        <Row className={`desc-data-row mb-2 ${privateEditing ? "editing-row" : ""}`}>
                            <Col />

                            <Col xs="12" md="8" className={`d-flex border-bottom border-dark align-items-center pb-3`}>
                            {
                                (privateEditing) ? (
                                    <>
                                        <Col className="d-flex justify-content-start align-items-center">
                                            <span className="deadline-date">
                                                <Form.Control 
                                                    defaultValue={
                                                        getDeadlineFormatted(Date.now() / 1000)
                                                    }
                                                    onChange={(e) => { 
                                                        console.log(e.target.value); 
                                                        setEnteredDate(e.target.value); 
                                                    }}                               
                                                    type="date" 
                                                    variant="dark"
                                                    className="form-control-date-picker"
                                                />
                                            </span>
                                            <TimePicker className="time-picker-input" onChange={handleTimeChange} value={time} start="00:00" end="23:59" step={15} />
                                        </Col>
                                        <Col className="d-flex justify-content-end align-items-center">
                                            <Icon.CheckCircleFill className="submit-change-icon icon-edit-profile-action ml-auto" width={"7vw"} height={"7vw"} onClick={() => submitBioUpdate(true) } />
                                            <Icon.X className="icon-edit-profile-action" width={"7vw"} height={"7vw"}  onClick={() => setBioEditing(false) } />
                                        </Col>
                                    </>
                                ) : (
                                    <>
                                        <div className="max-width-field-div">
                                            Deadline 
                                        </div>
                                        <div className="desc-data-stats-goal-private ml-auto">
                                            {`${getDeadlineFormatted(goal?.deadline || undefined)}`}
                                        </div>
                                        <div className="spacing-edit"></div>
                                        <Icon.PencilFill className="icon-edit-profile" width={20} height={20} onClick={() => setBioEditing(true) } />
                                    </>
                                )
                            }        
                            </Col>
                            
                            <Col />
                        </Row>
                        <Row className={`desc-data-row mb-2 ${prioEditing ? "editing-row" : ""}`}>
                            <Col />

                            <Col xs="12" md="8" className={`d-flex border-bottom border-dark align-items-center pb-3`}>
                            {
                                (prioEditing) ? (
                                    <>
                                        <Col className="d-flex justify-content-end align-items-center">
                                            <span className="deadline-date">
                                                <Form.Control 
                                                    onChange={(e) => { 
                                                        console.log(e.target.value); 
                                                        enteredPrio(e.target.value); 
                                                    }}                               
                                                    type="number" 
                                                    variant="dark"
                                                    className="form-control-date-picker number-picker-control"
                                                    placeholder={`${goal?.priority}`}
                                                />
                                            </span>
                                        </Col>
                                        <Col className="d-flex justify-content-end align-items-center">
                                            <Icon.CheckCircleFill className="submit-change-icon icon-edit-profile-action ml-auto" width={"7vw"} height={"7vw"} onClick={() => submitPrioUpdate() } />
                                            <Icon.X className="icon-edit-profile-action" width={"7vw"} height={"7vw"}  onClick={() => setPrioEditing(false) } />
                                        </Col>
                                    </>
                                ) : (
                                    <>
                                        <div className="max-width-field-div">
                                            Priority&nbsp;&nbsp;
                                            {
                                                (goal.priority === 1) ? <Icon.StarFill width={30} height={30} color={"rgba(213, 176, 0, 0.5)"} /> : <Icon.Star color={"rgba(213, 176, 0, 0.5)"} />
                                            }
                                        </div>
                                        <div className="desc-data-stats-goal-prio ml-auto">
                                            {`${goal?.priority}`}
                                        </div>
                                        <div className="spacing-edit"></div>
                                        <Icon.PencilFill className="icon-edit-profile" width={20} height={20} onClick={() => setPrioEditing(true) } />
                                    </>
                                )
                            }        
                            </Col>
                            
                            <Col />
                        </Row>
                        <Row className="desc-data-row mt-2 align-items-start">
                            <Col />
                                <Col xs="12" md="8" className="reminders-col d-flex justify-content-between align-items-start border-bottom border-dark pb-3 mt-2">
                                    Reminders&nbsp;<Switch
                                        checked={remindersChecked}
                                        onChange={() => { setRemindersChecked(!remindersChecked) }}
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
                                     <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip>
                                            Reminders
                                        </Tooltip>}
                                    >
                                        <Dropdown drop={'start'}>
                                            <Dropdown.Toggle as={CustomGoalReminderActions} id="dropdown-custom-components" />
                                            <EditGoalReminderDropdown deadline={goal.deadline} setReminders={setReminders} reminders={goal.reminders} />
                                        </Dropdown>
                                    </OverlayTrigger>
                                </Col>
                            <Col />
                        </Row>
                        <Row className="desc-data-row mt-2 align-items-start">
                            <Col />
                                <Col xs="12" md="8" className="reminders-col d-flex justify-content-between align-items-start border-bottom border-dark pb-3 mt-2">
                                    Private&nbsp;<Switch
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
                        <Row className="desc-data-row mt-2 align-items-start">
                            <Col />
                                <Col xs="12" md="8" className="reminders-col d-flex justify-content-between align-items-start border-bottom border-dark pb-3 mt-2">
                                    Postponed&nbsp;<Switch
                                        checked={postponedChecked}
                                        onChange={() => { setPostponedChecked(!postponedChecked) }}
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
                                <Col xs="12" md="8" className="d-flex justify-content-around flex-wrap align-items-end">                             
                                    <Button variant="dark" className="edit-goal-actions shadow-lg">
                                        <Icon.CheckCircleFill width={25} height={25} />&nbsp;
                                        Mark Complete
                                    </Button>
                                    <Button variant="dark" className="edit-goal-actions shadow-lg">
                                        <Icon.ImageAlt width={25} height={25} />&nbsp;
                                        Delete All Media
                                    </Button>
                                    <Button variant="dark" className="edit-goal-actions shadow-lg">
                                        <Icon.Trash3 width={30} height={30} />&nbsp;
                                        Delete Goal 
                                    </Button>
                                </Col>
                            <Col />
                        </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}