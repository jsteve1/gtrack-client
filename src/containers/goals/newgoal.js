import { useState, useRef } from 'react';
import { Offcanvas, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowNewGoal, setShowNewGoal } from '../../app/features/ui/uiSlice';
import { evalBio } from '../../app/utils';
import { getDeadlineFormatted } from '../../components/goals/goallistitem';
import TimePicker from 'react-bootstrap-time-picker';
import * as Icon from 'react-bootstrap-icons';
import Switch from "react-switch";

export default function NewGoal({ ...props }) {
    const dispatch = useDispatch();
    const showNewGoal = useSelector(selectShowNewGoal);
    const handleClose = () => {
        dispatch(setShowNewGoal(false));
    }  
    const handleShow = () => {
        dispatch(setShowNewGoal(true));
    } 
    const handleTimeChange = (time) => {
        console.log(time);
        setTime(time);
    }
    const nameRef = useRef(null);
    const [enteredName, setEnteredName] = useState("");
    const [nameInvalid, setNameInvalid] = useState(false);
    const [enteredDate, setEnteredDate] = useState(""); 
    const [time, setTime] = useState(""); 
    
    return (
        <>
            <style type="text/css">
            {
                `
                    .new-goal-off-canvas {
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
                        width: 80%;
                        height: 70px;
                        font-size: 21pt; 
                        min-width: 350px;
                        max-width: 360px;
                    }
                    .signup-input:hover {
                        background-color: #202020;
                        color: #aaaaaa;
                        border: none; 
                        box-shadow: none; 
                        outline: none;
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
                    .edit-profile-title {
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
                    .number-picker-control {
                        width: 120px;
                        height: 70px;
                    }
                    .private-new-goal-col {
                        font-weight: 400; 
                        color: #aaaaaa;
                    }
                    .deadline-date-newgoal {
                        margin-left: 15px;
                    }
                    @media only screen and (max-width: 576px) {
                        .deadline-date-newgoal {
                            margin-left: 2px;
                        }
                    }
                    .create-new-goal {
                        font-weight: 300; 
                        font-size: 4vh;
                        background-color: rgba(100, 100, 100, 0.2);
                        border: 1px solid #096666;
                        color: #ddddddd;
                        padding: 15px;
                        border-radius: 10px; 
                        width: 100%;
                        max-width: 360px;
                        min-width: 350px;
                    }
                `
            }
            </style>
            <Offcanvas placement={"bottom"} className="new-goal-off-canvas" show={showNewGoal} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton closeVariant="white" className="border-bottom border-dark dark-bg-title">
                    <Offcanvas.Title as={Container} className="d-flex justify-content-center edit-profile-title"><Icon.PencilSquare width={40} height={40} color={"#34dcbe"} />&nbsp;New Goal</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body as={Container}>
                    <Row className="mt-2 mb-2 border-bottom border-dark pb-4 pl-2">
                        <Col xs="12" className="d-flex justify-content-center align-items-center">
                            <Form.Control 
                                isInvalid={nameInvalid}
                                required 
                                onChange={(e) => { 
                                    if(evalBio(e.target.value)) {
                                        setNameInvalid(false); 
                                    }
                                    else { 
                                        if(!nameInvalid)
                                            setNameInvalid(true); 
                                    }
                                }} 
                                ref={nameRef}
                                className="signup-input shadow-lg" 
                                variant="dark" 
                                type="text" 
                                placeholder={`Goal Name`} 
                            />    
                        </Col>           
                    </Row>
                    <Row className="mt-1 mb-2 pl-3 d-flex justify-content-center">
                        Deadline: 
                    </Row>
                    <Row className="pl-2 border-bottom border-dark pb-4">
                        <Col className="d-flex justify-content-center align-items-baseline">
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
                    </Row>
                    <Row className="pl-2 border-bottom border-dark pb-4 pt-4">
                        <Col xs="7" sm="6" className="d-flex justify-content-end align-items-center">
                            Priority&nbsp;
                            <span className="deadline-date-newgoal">
                                <Form.Control 
                                    onChange={(e) => { 
                             
                                    }}                               
                                    type="number" 
                                    variant="dark"
                                    className="form-control-date-picker number-picker-control"
                                    min={1}
                                />
                            </span>
                        </Col>
                        <Col xs="5" sm="6" className="private-new-goal-col d-flex justify-content-start mt-3">
                            Private&nbsp;
                                <span className="deadline-date-newgoal">
                                    <Switch
                                        checked={false}
                                        onChange={() => {  }}
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
                            </span>
                        </Col>
                    </Row>
                    <Row className="pt-3">
                        <Col xs="12" className="d-flex justify-content-center align-items-center">
                            <Button variant="dark" className="create-new-goal">
                                <Icon.TrophyFill color="#34dcbe" /> Create 
                            </Button>
                        </Col>  
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}