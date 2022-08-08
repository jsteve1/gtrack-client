import { Col, Form, CloseButton, Dropdown  } from 'react-bootstrap';
import { useState } from 'react';
import Switch from "react-switch";

export default function NewGoalReminders({ reminders, setReminders, setShow }){
    const [dayBefore, setDayBefore] = useState(false);    
    const [everyDay, setEveryDay] = useState(false);
    const [hour, setHour] = useState(12);
    const [ampm, setAmPm] = useState("AM");
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
            setEveryDay(true);
        } else {
            setEveryDay(false);
        }
    }
    return (
            <>
                <style type="text/css">
                {
                    `
                        .reminders-dropdown {
                            max-width: 375px;
                            background-color: #191919;
                            border: 1px solid #247575;
                            border-radius: 15px;
                        }
                        .dropdown-item:hover,
                        .dropdown-item:active, 
                        .dropdown-item:focus, 
                        .dropdown-item:focus-visible {
                            background-color: rgba(100, 100, 100 0.2) !important;
                        }
                        .form-control-reminder-picker,
                        .form-control-reminder-picker-time {
                            width: 110px;
                            min-width: 110px;
                            height: 80px;
                            font-size: 2.5vh;
                            margin-top: auto;
                            margin-bottom: -5px;
                            background-color: rgba(100, 100, 100, 0.3);
                            color: #34aaaa;
                            border: none;
                            margin-right: 3px;
                        }
                        .form-control-reminder-picker-time {
                            width: 75px;
                            min-width: 75px;
                            font-size: 14pt;
                        }
                        .dark-active:hover, 
                        .dark-active:active, 
                        .dark-active:focus, 
                        .dark-active:focus-visible {
                            filter: brightness(1.05);
                            background-color: #555555;
                            color: #34aaaa;
                        }
                    `
                }
                </style>
                <Dropdown.Menu variant="dark" className="reminders-dropdown shadow-lg">
                <Dropdown.Header className="d-flex justify-content-between">Reminders&nbsp;<CloseButton variant="white" onClick={() => setShow(false) } /></Dropdown.Header>
                <Dropdown.ItemText as={Col} className="d-flex align-items-center justify-content-between dropdown-item" >
                    Day before&nbsp;
                    <Switch
                        checked={dayBefore || false}
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
                </Dropdown.ItemText>
                <Dropdown.ItemText as={Col} className="d-flex align-items-center justify-content-between" onClick={(e) => { e.preventDefault() }}>                
                    Every&nbsp;day&nbsp;&nbsp;<Form.Control 
                                    onChange={(e) => { 
                                        setHour(e.target.value); 
                                    }}                               
                                    type="number" 
                                    variant="dark"
                                    className="form-control-reminder-picker reminder-number-picker-control dark-active"
                                    placeholder={getFormattedTime(43200)}
                                    min="1"
                                    max="12"
                                />
                                <Form.Select 
                                    onChange={(e) => { 
                                        setAmPm(e.target.value); 
                                    }}                               
                                    type="select" 
                                    variant="dark"
                                    className="form-control-reminder-picker-time reminder-number-picker-control dark-active"
                                    placeholder={"AM" }
                                >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </Form.Select>
                                &nbsp;
                    <Switch
                        checked={everyDay}
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
                </Dropdown.ItemText>
            </Dropdown.Menu>
        </>
    )
}