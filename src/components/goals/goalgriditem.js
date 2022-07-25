import { useState, useEffect } from 'react';
import { Container, Row, Col, OverlayTrigger, Dropdown } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import GridItemMedia from '../../containers/goals/griditemmedia';
import { getDeadlineFormatted } from './goallistitem';
import { renderFavoriteTooltip, renderMarkCompleteTooltip, renderMoreTooltip, CustomGoalActions } from './goallistitem';
export default function GoalGridItem({
                                        name, 
                                        media, 
                                        deadline, 
                                        completedtime,
                                        postponed,
                                        complete, 
                                        reminders,
                                        priority,
                                        rearrangeMode,
                                        showPrio,
                                        index, setIndex,
                                        length,
                                        showEditGoal, 
                                        setShowEditGoal,
                                        sortState,
                                        sortByDeadline,
                                        setGoalDeadline,
                                        id, 
                                        currentSortState
                                     }){

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
                    .grid-item {
                        min-width: 325px; 
                        max-width: 325px;
                        max-height: 340px;
                        min-height: 320px;
                        color: #aaaaaa; 
                        background-color: rgba(100, 100, 100, 0.2);
                        cursor: pointer; 
                        margin: 10px;
                    }
                    .grid-item:hover {
                        animation-name: growshrink;
                        animation-duration: 0.3s; 
                        background-color: rgba(100, 100, 100, 0.3);                        
                    }
                    .goal-griditem-name-col {
                        color: #bbbbbb;
                        font-size: 20pt;
                        padding-top: 5px;
                        white-space: nowrap;
                    }
                    @media only screen and (max-width: 713px) {
                        .grid-item {
                            max-width: 500px;
                        }
                    }
                    .mark-complete-button {

                    }
                    .priority-span {
                        margin-right: 15px;
                        font-weight: 500;
                        font-size: 22pt;
                    }
                    .grid-item-actions-row {
                        min-height: 80px;
                    }
                    .goal-completed {
                       background-color: rgba(39, 245, 157, 0.10);
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
                    .timestamp-col {
                        font-size: 18pt;
                        margin-left: 25px;
                    }
                    .timestamp-color {
                        color: #34aaaa;
                    }
                `
            }
            </style>
            <Container fluid className={`grid-item ${(complete === true) ? "goal-completed" : ""} `}>
                <Row className="d-flex justify-content-between mt-2">
                    <Col xs="8" className="d-flex justify-content-start goal-griditem-name-col align-items-center">
                        {
                            (currentSortState === "priority") ? <span className="priority-span">{priority}</span> : ""   
                        }
                        {name}
                    </Col>
                    <Col xs="4" className="d-flex justify-content-end align-items-center">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderMoreTooltip}
                        >
                            <Dropdown drop={'start'}>
                                <Dropdown.Toggle as={CustomGoalActions} id="dropdown-custom-components" />
                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item onClick={(e) => {  }}><Icon.Trophy color={"#34dcbe"} />&nbsp;&nbsp;View</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => { setShowEditGoal(true) }}><Icon.PencilFill color={"#34dcbe"}/>&nbsp;&nbsp;Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => { }}><Icon.Trash color={"#34dcbe"}/>&nbsp;&nbsp;Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </OverlayTrigger>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-start">
                {
                  (complete === true) ?
                    <Col className="d-flex justify-content-start timestamp-col">
                        Completed:&nbsp;<span className="timestamp-color">{getDeadlineFormatted(completedtime)}</span>
                    </Col>
                    : 
                    <Col className="d-flex justify-content-start timestamp-col">
                        Deadline:&nbsp;<span className="timestamp-color">{getDeadlineFormatted(deadline)}</span>
                    </Col>
                }  
                </Row>
                <Row>
                    <Col>
                        <GridItemMedia setShowEditGoal={setShowEditGoal} media={media} />                    
                    </Col>
                </Row>
                {
                    (!complete) ? <Row className="grid-item-actions-row">
                                    <Col className="d-flex justify-content-center">
                                        {
                                            (priority !== 1 && currentSortState === "priority") ? (
                                            <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderFavoriteTooltip}
                                                >
                                                <Icon.Star color={"rgba(213, 176, 0, 0.5)"} width={40} height={40} className="mark-complete-button" />
                                            </OverlayTrigger>
                                            ) : <>
                                                {
                                                    (currentSortState !== "priority") ? "" : (
                                                        <Icon.StarFill color={"rgba(213, 176, 0, 0.5)"} width={40} height={40} className="mark-complete-button" />
                                                    )
                                                }
                                            </>
                                            
                                        }
                                    </Col>
                                    <Col className="d-flex justify-content-center">
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderMarkCompleteTooltip}
                                        >
                                            <Icon.CheckCircleFill width={40} height={40} className="mark-complete-button" />
                                        </OverlayTrigger>
                                    </Col>
                                </Row> 
                                : 
                                ""
                }
            </Container>
        </>
    )
}