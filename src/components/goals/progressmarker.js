import { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { Row, Col, Button, Container, OverlayTrigger, Tooltip, FloatingLabel, Form } from 'react-bootstrap';
import { getDeadlineFormatted } from './goallistitem';
import * as Icon from 'react-bootstrap-icons';
import { evalBio  } from '../../app/utils';
import { addProgressMarker } from '../../app/features/goals/goalSlice';
import MarkCompleteModal from '../../containers/ui/markcompletemodal';
import TimePicker from 'react-bootstrap-time-picker';

export default function ProgressMarker({ marker, markers, setMarkers }) {
    const [editable, setEditable] = useState(false); 
    const [nameValid, setNameValid] = useState(true);
    const dispatch = useDispatch();
    const nameref = useRef(null);
    const [enteredDate, setEnteredDate] = useState("");
    const [enteredName, setEnteredName] = useState("");
    const [numberDate, setNumberDate] = useState(0);
    const [time, setTime] = useState("");

    const removeMarker = () => {
        const _markers = markers.filter(mkr => mkr.id !== marker.id);
        console.log(_markers);
        setMarkers(_markers);
    }

    const removeNewMarker = () => {
        const _markers = markers.filter(marker => marker.newmarker !== true); 
        console.log(_markers);
        setMarkers(_markers);
    }

    const getNumericDate = () => {
        const [year, month, day] = enteredDate.split("-"); 
        const date = new Date(year, month - 1, day);
        if(!isNaN(date.getTime()) &&
            parseInt(year) >= 2022 && 
            parseInt(month) >= 0 && 
            parseInt(month) <= 12 &&
            parseInt(day) >= 1 &&
            parseInt(day) <= 31
        ) {
            const newdatestr = date.getTime() /  1000;
            const newdatenum = newdatestr + time;
            setNumberDate(newdatenum);
            return newdatenum;
        }
    }

    const checkName = () => {
        if(enteredName.length === 0 || enteredName.length > 50 || !evalBio(enteredName)) {
            console.log("Error: Name entered is invalid");
            setNameValid(false); 
            return false; 
        }
        return true;
    }

    const newProgressMarker = () => {
        if(!checkName()) return; 
        const numericdate = getNumericDate();
        const newMarker = {
            name: enteredName,
            deadline: numericdate,
            goalid: marker.id,
            newmarker: false,
            completed: false
        }
        dispatch(addProgressMarker({ progressMarker: newMarker, goalid: marker.id }));
        const _markers = markers.filter(marker => marker.newmarker !== true); 
        setMarkers([newMarker, ..._markers]);
    }

    const handleTimeChange = (time) => {
        console.log(time);
        setTime(time);
    }

    const markerComplete = () => {
        const newMarker = {
            id: marker.id,
            name: marker.name,
            deadline: marker.deadline,
            goalid: marker.goalid,
            newmarker: false,
            completed: true
        }
        const _markers = markers.filter(marker => newMarker.id !== marker.id); 
        setMarkers([newMarker, ..._markers]);
    }
    return (
        <>
            <style type="text/css">
                {
                    `
                        .progress-marker {
                            max-width: 250px; 
                            height: 220px;
                            background-color: rgba(100,100,100,0.2);
                            cursor: pointer;
                            margin: 10px;
                            border-radius: 10px;
                        }
                        .new-progress-marker {
                            max-width: 350px; 
                            height: 375px;
                            cursor: pointer;
                            margin: 10px;
                            border-radius: 10px;
                        }
                        .deadline-date {
                            color: #34dcbe;
                            font-size: 4vh;
                            font-weight: 300;
                            cursor: pointer;
                            display: flex;
                            margin: 5px;
                            max-width: 200px;
                            width:175px;
                        }
                        .deadline-date:hover {
                            transform: scale(1.01);
                            filter: brightness(1.05); 
                            font-weight: 400;
                        }
                        .progress-marker:hover {
                            background-color: rgba(100, 100, 100, 0.3);
                        }
                        .new-progress-marker:hover {
                            background-color: rgba(100,100,100,0.2);
                        }
                        .mark-complete-button:hover,
                        .mark-complete-button:active,
                        .mark-complete-button:focus,
                        .mark-complete-button:focus-visible {
                            color: #34dcbe;
                            filter: brightness(1.05);
                            cursor: pointer;
                            animation-name: growshrink;
                            animation-duration: 0.5s; 
                        }

                        @keyframes growshrink {
                            0%   {transform: scale(1.0); }
                            50%  {transform: scale(1.02); }
                            100% {transform: scale(1.0); }
                        }
                        .marker-name {

                            height: 80px;
                            font-size: 16pt;
                        }
                        .marker-name {
                            height: 40px;
                            font-size: 16pt;
                        }
                        .marker-name-input {
                            background-color: #101010;
                            color: #34aaaa; 
                            box-shadow: none; 
                            outline: none;
                            border:none;
                            font-size: 18pt;
                            font-weight: 500;
                        }
                        .marker-name-input:hover,                                         
                        .marker-name-input:focus, 
                        .marker-name-input:active, 
                        .marker-name-input:focus-visible {
                            background-color: #101010;
                            color: #34aaaa;
                            border: none; 
                            box-shadow: none; 
                            outline: none;
                            border: 1px solid #34aaaa;
                        }
                        .floating-label-color  {
                            color: #aaaaaa;
                        }
                        .marker-name-input-fname input {
                            padding-left: 15px;
                            background-color: #191919 !important;
                        }
                        .marker-deadline {
                            margin-top: 35px;
                        }
                        .marker-buttons {
                            margin-top: auto;
                        }
                        .new-title  {
                            font-size: 16pt; 
                            font-weight: 400;
                            color: #34aaaa;
                        }
                        .form-control-date-picker {
                            background-color: rgba(100, 100, 100, 0.3);
                            color: #34dcbe;
                            cursor: pointer;
                            border: none; outline: none;
                            align-self: center;
                            margin-top: 15px;
        
                        }
                        .form-control-date-picker:active,
                        .form-control-date-picker:hover,
                        .form-control-date-picker:focus,
                        .form-control-date-picker:focus-visible {
                            background-color: rgba(100, 100, 100, 0.3);
                            color: #34dcbe;
                            border: 1px solid #34dcbe;
                        }
                        .deadline-label {
                            font-size: 10pt; 
                            font-weight:500;
                            text-align: lef
                        }
                        .marker-button:hover {
                            background-color: rgba(100, 100, 100, 0.3);
                            color: #34aaaa;
                        }
                        .create-text {
                            color: #34aaaa;
                        }
                        .cancel-text {
                            color: #34aaaa;
                        }
                        .time-picker-input {
                            background-color: rgba(100, 100, 100, 0.3); 
                            color: #34dcbe;
                            max-width: 200px;
                            width:175px;
                            border: none; 
                            text-align: center;
                        }
                        .completed-prg-mrk {
                            background-color: rgba(0, 99, 56, 0.5);
                        }
                    `
                }
            </style>
            {
                (marker.newmarker === true) ? (
                <>
                    <Container className={`progress-marker new-progress-marker pt-3 shadow-lg`}>
                        <Row className="new-title d-flex justify-content-center mb-3 pb-2 border-bottom border-secondary">
                            New progress marker
                        </Row>
                        <Row className="marker-name new-progress-marker-name-input">
                                <FloatingLabel
                                    controlId="floatingFirstName"
                                    label="Name"
                                    className="floating-label-color mb-3"
                                >
                                    <Form.Control 
                                    required 
                                    isInvalid={!nameValid} 
                                    onChange={(e) => { if(!evalBio(e.target.value)) 
                                                        setNameValid(false); 
                                                       else { 
                                                        if(nameValid) setEnteredName(e.target.value); 
                                                        else setNameValid(true); }  
                                                    }}
                                 ref={nameref} 
                                 className="marker-name-input marker-name-input-fname" 
                                 variant="dark" 
                                 type="text" 
                                 placeholder="John" />
                                    <Form.Control.Feedback type="invalid">
                                        No special characters.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                        </Row>
                        <Row className="d-flex justify-content-center marker-deadline">
                            Deadline
                        </Row>
                        <Row className="d-flex justify-content-between  border-bottom border-secondary pb-3 align-items-baseline" >
                            <Col xs="12" md="6"  className="d-flex justify-content-center">
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
                            </Col>
                            <Col xs="12" md="6" className="d-flex justify-content-center">
                                <TimePicker className="time-picker-input" onChange={handleTimeChange} value={time} start="00:00" end="23:59" step={15} />
                            </Col>
                        </Row>
                        <Row className="marker-buttons mt-1">
                            <Col xs="6" className="marker-button"  onClick={() => removeNewMarker()} >
                                <span className="cancel-text">Cancel</span><br></br><Icon.X width={50} height={50}/>
                            </Col>
                            <Col xs="6" className="marker-button" onClick={()  =>  newProgressMarker()} >
                                <span className="create-text">Create</span><br></br><Icon.Check width={50} height={50} />                            
                            </Col>
                        </Row>
                    </Container>
                </>
                ) : (
                <>
                    <Container className={`progress-marker pt-3 shadow-lg ${(marker.completed === true) ? "completed-prg-mrk" : ""}`}>
                        <Row className="marker-name">
                            {marker.name}
                        </Row>
                        {
                            (marker.completed === true) ? (
                                <>
                                    <Row className="marker-name">
                                        Complete
                                    </Row>
                                </>
                            ) : (
                                <Row className="marker-name">
                                    Deadline: {getDeadlineFormatted(marker.deadline)}
                                </Row>
                            )
                        }
                        <Row>
                            {
                                (marker.completed === true) ? "" : (
                                <Col xs="6" className="d-flex justify-content-end mt-5">
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip><h4>Mark Complete</h4></Tooltip>}
                                    >
                                    <Icon.CheckCircleFill width={40} height={40} color={"#999999"} className="mark-complete-button" onClick={() => { markerComplete()  }} />
                                    </OverlayTrigger>
                                </Col>
                                )
                            }
                            <Col xs="6" className="d-flex justify-content-end mt-5" >
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={<Tooltip><h4>Delete</h4></Tooltip>}
                                >
                                <Icon.Trash width={40} height={40} color={"#999999"} className="mark-complete-button" onClick={() => { removeMarker() }} />
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </Container>
                </>
                )
            }
        </>
    );
}