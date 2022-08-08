import { Offcanvas, Container, Row, Button, Col, Form, Dropdown, Tooltip, OverlayTrigger  } from 'react-bootstrap';
import { useState, useRef, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { evalPw, evalName, evalBio, evalEmail  } from '../../app/utils';
import { editProfile, profile } from '../../app/features/users/userSlice';
import * as Icon from 'react-bootstrap-icons';
import Switch from "react-switch";
import { selectGoal, updateGoal, selectGoals, setGoalIndex, setReminders, removeAllMedia } from '../../app/features/goals/goalSlice';
import { getDeadlineFormatted } from '../../components/goals/goallistitem';
import TimePicker from 'react-bootstrap-time-picker';
import { getNumericDate } from '../../components/goals/progressmarker';

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

export const EditGoalReminderDropdown = ({ goalid, deadline, reminders }) => {
    const [dayBefore, setDayBefore] = useState(false);    
    const [everyDay, setEveryDay] = useState(false);
    const [hour, setHour] = useState(12);
    const [ampm, setAmPm] = useState("AM");
    const dispatch = useDispatch(); 

    const getFormattedTime = (number) => {
        if(number > 43200) {
            number -= 43200; 
        } 
        number /= 3600; 
        if(number >= 10) {
            return parseInt(`${number}`.slice(0, 2)); 
        } else return parseInt(`${number}`[0]); 
    }

    const dayBeforeUpdate = () => {
        const newdaybefore = !dayBefore;
        dispatch(setReminders({ id: goalid, daybefore: newdaybefore }));
        console.log("goal reminder day before: ", newdaybefore);  
        setDayBefore(newdaybefore); 
    }

    const dailyUpdate = () => {
        if(!everyDay) {
            let newtime = 0;
            if(ampm === "PM") {
                newtime += 43200;
            }
            if(ampm === "AM" && hour === 12) {
                newtime = 0;
            } else {
                newtime += (3600 * hour);
            }
            dispatch(setReminders({ id: goalid, daily: newtime }));
            console.log("goal reminder daily: ", newtime, "timestamp: ", hour, ampm);  
            setEveryDay(true);
        } else {
            dispatch(setReminders({ id: goalid, daily: false }));
            console.log("goal reminder daily: ", false);  
            setEveryDay(false);
        }
    }
    return (
        <>
        <style type="text/css">
        {
            `
                .reminders-dropdown {
                    min-width: 250px;
                    background-color: rgba(100, 100, 100 0.2);
                }
                .dropdown-item:hover,
                .dropdown-item:active, 
                .dropdown-item:focus, 
                .dropdown-item:focus-visible {
                    background-color: rgba(100, 100, 100 0.2) !important;
                }
            `
        }
        </style>
        <Dropdown.Menu variant="dark" className="reminders-dropdown shadow-lg">
            <Dropdown.Item as={Col} className="d-flex align-items-center justify-content-between dropdown-item" >
                Day Before Deadline&nbsp;
                <Switch
                    checked={reminders?.daybefore || false}
                    onChange={() => { dayBeforeUpdate() }}
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
            </Dropdown.Item>
            <Dropdown.Item as={Col} className="reminders-dropdown d-flex align-items-center justify-content-between" onClick={(e) => { e.preventDefault() }}>                
                Every day&nbsp;&nbsp;<Form.Control 
                                onChange={(e) => { 
                                    setHour(e.target.value); 
                                }}                               
                                type="number" 
                                variant="dark"
                                className="form-control-date-picker reminder-number-picker-control"
                                placeholder={getFormattedTime(reminders.daily || 43200)}
                                min={1}
                                max={12}
                            />
                            <Form.Select 
                                onChange={(e) => { 
                                    setAmPm(e.target.value); 
                                }}                               
                                type="select" 
                                variant="dark"
                                className="form-control-date-picker reminder-number-picker-control"
                                placeholder={(reminders.daily > 43200) ? "PM" : "AM" }
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </Form.Select>
                <Switch
                    checked={reminders.daily !== false}
                    onChange={() => { dailyUpdate() }}
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
            </Dropdown.Item>
        </Dropdown.Menu>
        </>
    )
}
export default function EditGoal({ show, setShow, editGoalId, showDeleteGoal, setShowDeleteGoal, setMarkCompleteModalShow, ...props }) {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const goal = useSelector(selectGoal(editGoalId)); 
    const goals = useSelector(selectGoals);
    const dispatch = useDispatch();
    const [nameEditing, setNameEditing] = useState(false); 
    const [deadlineEditing, setDeadlineEditing] = useState(false); 
    const [signupError, setSignupError] = useState("");
    const [privacyChecked, setPrivacyChecked] = useState("");    
    const nameRef = useRef(null);
    const prioRef = useRef(null);
    const privateRef = useRef(null);
    const privateBoolRef = useRef(null);   
    const [time, setTime] = useState(0);
    const [enteredName, setEnteredName] = useState("");
    const [enteredDate, setEnteredDate] = useState("");
    const [enteredPrio, setEnteredPrio] = useState("");
    const [reminders, setReminders] = useState(false);
    const [prioEditing, setPrioEditing] = useState(false);
    const [remindersChecked, setRemindersChecked] =  useState(false);
    const [postponedChecked, setPostponedChecked] = useState(false);

    const handleTimeChange = (time) => {
        setSignupError("");
        setTime(time);
    } 

    const submitNameUpdate = () => {
        setSignupError("");
        const newName = nameRef.current.value;
        if(evalBio(newName)) {
            dispatch(updateGoal({ id: `${editGoalId}`, updateGoal: { name: `${newName}` }}));
            setNameEditing(false);
        } else {
            setSignupError("New deadline is invalid");
        }
    }

    const submitDeadlineUpdate = () => {
        setSignupError("");
        const newDeadline = getNumericDate(enteredDate, time);
        if(!isNaN(parseFloat(newDeadline) && isFinite(newDeadline))) {
            dispatch(updateGoal({ id: `${editGoalId}`, updateGoal: { deadline: newDeadline }}));
            setDeadlineEditing(false);
        }
        else { setSignupError("New deadline is invalid"); }
    }
    
    const submitPrioUpdate = () => {
        setSignupError("");
        const newPrio = enteredPrio; 
        if(!isNaN(parseInt(enteredPrio)) && isFinite(parseInt(enteredPrio))) {
            dispatch(setGoalIndex({ newIndex: newPrio - 1, index: goal.priority - 1 }));
            console.log("new goal prio", goal.priority);
        }
        setPrioEditing(false);
    }

    const submitPrivacyUpdate = () => {
        setSignupError("");
        const newPrivacy = !privacyChecked; 
        setPrivacyChecked(newPrivacy);
        if(goal.private !== newPrivacy) {
            dispatch(updateGoal({ id: `${editGoalId}`, updateGoal: { private: newPrivacy }}));
            console.log("new goal privacy", newPrivacy);
        }
    }

    const submitPostponedUpdate = () => {
        setSignupError("");
        const newPostponed = !postponedChecked; 
        setPostponedChecked(newPostponed);
        if(goal.postponed !== newPostponed) {
            dispatch(updateGoal({ id: `${editGoalId}`, updateGoal: { postponed: newPostponed }}));
            console.log("new goal postponed", newPostponed);
        }
    }

    const deleteAllGoalMedia = () => {
        dispatch(removeAllMedia({ id: editGoalId }));
    }
    
    return (
        <>
            <style type="text/css">
            {
                `
                    .edit-goal-off-canvas {
                        background-color: rgba(10, 10, 10, 0.95);
                        color: #aaaaaa; 
                        height: 80vh;
                    }
                    .edit-goal-off-canvas::-webkit-scrollbar-track {
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                        border-radius: 10px;
                        background-color: #191919;
                    }
                    .edit-goal-off-canvas::-webkit-scrollbar {
                        width: 12px;
                        background-color: #191919;
                    }
                    .edit-goal-off-canvas::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                        background-color: #353535;
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
                        background-color: rgba(100, 100, 100, 0.3);
                        color: #34aaaa;
                        border: none;
                    }
                    .form-control-date-picker {
                        width: min-content;
                        height: 80px;
                        font-size: 2.5vh;
                        margin-top: auto;
                        margin-bottom: -5px;
                        background-color: rgba(100, 100, 100, 0.3);
                        color: #34aaaa;
                        border: none;
                        margin-right: 3px;
                    }
                    .time-picker-input:active,
                    .form-control-date-picker:active,
                    .time-picker-input:hover,
                    .form-control-date-picker:hover,
                    .time-picker-input:focus,
                    .form-control-date-picker:focus,
                    .time-picker-input:focus-visible,
                    .form-control-date-picker:focus-visible {
                        background-color: rgba(40, 40, 40, 0.4);
                        color: #0199aa;
                        border: none;
                        outline: none;
                        box-shadow: none;
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
                        height: 70px;
                    }
                    .reminder-number-picker-control {
                        height: 40px;
                        width: 85px;
                        font-size: 14pt;
                    }
                    .reminders-actions {
                        width: fit-content;
                        display: inline;
                    }
                    .edit-goal-title {
                        color: #34dcbe;
                        font-size: 20pt;
                        font-weight: 500;
                        height: 70px;
                        align-items: center;
                    }
                    .dark-bg-title {
                        background-color: rgba(20, 20, 20, 0.7);
                        height: 80px;
                    }
                `
            }
            </style>
            <Offcanvas placement={"bottom"} className="edit-goal-off-canvas" show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton closeVariant="white" className="border-bottom border-dark dark-bg-title">
                    <Offcanvas.Title as={Container} className="d-flex justify-content-center edit-goal-title"><Icon.PencilSquare width={30} height={30} />&nbsp;Edit Goal</Offcanvas.Title>
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
                                                defaultValue={`${goal.name}`}
                                                onChange={(e) => { 
                                                    console.log(e.target.value); 
                                                    setEnteredName(e.target.value); 
                                                 }} 
                                                ref={nameRef} 
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
                                        {
                                            (goal?.complete || goal?.completedtime !== 0) ? "" : 
                                            <Icon.PencilFill className="icon-edit-profile" width={20} height={20} onClick={() => setNameEditing(true) } />
                                        }
                                    </>
                                }
                               
                            </Col>
                            <Col />
                        </Row>
                        {
                            (goal?.complete || goal?.completedtime !== 0) ? 
                            <>
                                <Row className={`desc-data-row mb-2 ${deadlineEditing ? "editing-row" : ""}`}>
                                    <Col />
                                    <Col xs="12" md="8" className={`d-flex border-bottom border-dark align-items-center pb-3`}>
                                        <div className="max-width-field-div">
                                            Completed 
                                        </div>
                                        <div className="desc-data-stats-goal-private ml-auto">
                                            {`${getDeadlineFormatted(goal?.completedtime || undefined)}`}
                                        </div>
                                        <div className="spacing-edit"></div>
                                    </Col>
                                    <Col />
                                </Row>
                            </>
                            : 
                            <Row className={`desc-data-row mb-2 ${deadlineEditing ? "editing-row" : ""}`}>
                                <Col />

                                <Col xs="12" md="8" className={`d-flex border-bottom border-dark align-items-center pb-3`}>
                                {
                                    (deadlineEditing) ? (
                                        <>
                                            <Col className="d-flex justify-content-start align-items-baseline">
                                                <span className="deadline-date">
                                                    <Form.Control 
                                                        defaultValue={
                                                            getDeadlineFormatted(Date.now() / 1000)
                                                        }
                                                        onChange={(e) => { 
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
                                                <Icon.CheckCircleFill className="submit-change-icon icon-edit-profile-action ml-auto" width={"5vw"} height={"5vw"} onClick={() => submitDeadlineUpdate() } />
                                                <Icon.X className="icon-edit-profile-action" width={"5vw"} height={"5vw"}  onClick={() => setDeadlineEditing(false) } />
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
                                            <Icon.PencilFill className="icon-edit-profile" width={20} height={20} onClick={() => setDeadlineEditing(true) } />
                                        </>
                                    )
                                }        
                                </Col>
                                <Col />
                            </Row>
                        }       
                        {
                            (goal?.complete || goal?.completedtime !== 0) ? "" :                
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
                                                                setEnteredPrio(e.target.value); 
                                                            }}                               
                                                            type="number" 
                                                            variant="dark"
                                                            className="form-control-date-picker number-picker-control"
                                                            placeholder={`${goal?.priority}`}
                                                            min={1}
                                                            max={goals.length - 1}
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
                                                        (goal?.priority === 1) ? <Icon.StarFill width={30} height={30} color={"rgba(213, 176, 0, 0.5)"} /> : <Icon.Star color={"rgba(213, 176, 0, 0.5)"} />
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
                        }
                        {
                            (goal?.complete || goal?.completedtime !== 0) ? "" : 
                                <Row className="desc-data-row mt-2 align-items-start">
                                    <Col />
                                        <Col xs="12" md="8"  className="reminders-col d-flex justify-content-between align-items-start border-bottom border-dark pb-3 mt-2">
                                            Reminders&nbsp;
                                            <OverlayTrigger
                                                    placement="top"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={<Tooltip>
                                                        Reminders
                                                    </Tooltip>}
                                                >
                                                <Dropdown autoClose="outside" drop={'start'}>
                                                    <Dropdown.Toggle as={CustomGoalReminderActions} id="dropdown-custom-components" />
                                                    <EditGoalReminderDropdown goalid={editGoalId} deadline={goal?.deadline} setReminders={setReminders} reminders={goal?.reminders} />
                                                </Dropdown>
                                            </OverlayTrigger>
                                        </Col>
                                    <Col />
                                </Row>
                        }
                        <Row className="desc-data-row mt-2 align-items-start">
                            <Col />
                                <Col xs="12" md="8" className="reminders-col d-flex justify-content-between align-items-start border-bottom border-dark pb-3 mt-2">
                                    Private&nbsp;<Switch
                                        checked={goal?.private || privacyChecked}
                                        onChange={() => { submitPrivacyUpdate(); }}
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
                        {
                            (goal?.complete || goal?.completedtime !== 0) ? "" : 
                                <Row className="desc-data-row mt-2 align-items-start">
                                    <Col />
                                        <Col xs="12" md="8" className="reminders-col d-flex justify-content-between align-items-start border-bottom border-dark pb-3 mt-2">
                                            Postponed&nbsp;<Switch
                                                checked={goal?.postponed || postponedChecked}
                                                onChange={() => { submitPostponedUpdate(); }}
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
                        }
                        <Row className="desc-data-row mt-3">
                            <Col />
                                <Col xs="12" md="8" className="d-flex justify-content-around flex-wrap align-items-end">       
                                    {
                                        (goal?.complete || goal?.completedtime !== 0) ? "" : 
                                        <Button variant="dark" className="edit-goal-actions shadow-lg" onClick={() => setMarkCompleteModalShow(true) } >
                                            <Icon.CheckCircleFill width={25} height={25} />&nbsp;
                                            Mark Complete
                                        </Button>
                                    }                      
                                    <Button variant="dark" className="edit-goal-actions shadow-lg" onClick={() => { deleteAllGoalMedia() }}>
                                        <Icon.ImageAlt width={25} height={25} />&nbsp;
                                        Delete all media
                                    </Button>
                                    <Button variant="dark" className="edit-goal-actions shadow-lg"  onClick={() => {  setShowDeleteGoal(true); }}>
                                        <Icon.Trash3 width={30} height={30} />&nbsp;
                                        Delete goal 
                                    </Button>
                                </Col>
                            <Col />
                        </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}