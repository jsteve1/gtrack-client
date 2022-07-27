import {Container, Row, Col, Button, Dropdown, Tooltip, OverlayTrigger } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'; 
import { useState, useEffect } from 'react';
import Switch from "react-switch";
import { CustomGoalActions } from '../../components/goals/goallistitem';

export default function SingleGoalActions({ goal, setShowEdit, openDeleteModal }) {
    const [goalViewable, setGoalViewable] = useState(goal.viewable); 
    const [goalReminders, setGoalReminders] = useState(goal.remidners); 
    return (
        <>
           <style type="text/css">
            {
                `
                    @keyframes growshrink {
                        0%   {transform: scale(1.0); }
                        50%  {transform: scale(1.02); }
                        100% {transform: scale(1.0); }
                    }    
                    .goal-actions-cont {
                        padding-top: 25px;
                        color: #aaaaaa;
                        padding-bottom: 30px;
                        background-color: rgba(100, 100, 100, 0.2);
                        min-height: 100px;
                        padding-left: 50px;
                        border-radius: 15px;
                        max-width: 800px;
                        margin-top: 30px;
                    }
                    .star-button {
                        background-color: transparent;
                        color: #34aaaa;
                        width: 80%;
                        max-width: 200px;
                        font-size: 16pt;
                        border-radius: 15px;
                        border: none;
                        transition: all ease 0.2s;
                    }   
                    .star-button:hover, 
                    .star-button:focus,
                    .star-button:active,
                    .star-button:focus-visible {
                        background-color: transparent;
                        border: none;
                        color: #34dcbe;
                        transform: scale(1.01);
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
                    .col-switch {
                        color: #aaaaaa;
                        font-size: 18pt;
                    }
                    .selected-switch-text {
                        color: #34dcbe;
                    }
                `
            }
           </style>
           <Container fluid className="goal-actions-cont shadow-lg">
                <Row>
                    <Col xs="12" md="4" className={`col-switch d-flex justify-content-between align-items-center ${goalReminders ? "selected-switch-text" : ""}`}>
                        Reminders:<Switch
                            checked={goalReminders}
                            onChange={() => { setGoalReminders(!goalReminders) }}
                            onColor="#098888"
                            onHandleColor="#34dcbe"
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
                    <Col xs="12" md="4" className={`col-switch d-flex justify-content-between align-items-center ${goalViewable ? "selected-switch-text" : ""}`}> 
                        Private:<Switch
                            checked={goalViewable}
                            onChange={() => { setGoalViewable(!goalViewable) }}
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
                    <Col xs="12" md="4" className={`col-switch d-flex justify-content-end`}>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip><h4>More...</h4></Tooltip>}
                        >
                            <Dropdown drop={'start'}>
                                <Dropdown.Toggle as={CustomGoalActions} id="dropdown-custom-components" />
                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item className="dropdown-ctm-cols" as={Col} onClick={(e) => { setShowEdit(true) }}><Icon.PencilFill color={"#34dcbe"}/>&nbsp;&nbsp;Edit Goal</Dropdown.Item>
                                    <Dropdown.Item className="dropdown-ctm-cols" as={Col} onClick={(e) => { e.preventDefault(); openDeleteModal(true); }}><Icon.Trash color={"#34dcbe"}/>&nbsp;&nbsp;Delete Goal</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </OverlayTrigger>
                    </Col>
                </Row>
            </Container>
        </>
    )
}