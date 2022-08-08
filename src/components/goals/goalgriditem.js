import { useState, useEffect } from 'react';
import { Container, Row, Col, OverlayTrigger, Dropdown, Tooltip } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GridItemMedia from '../../containers/goals/griditemmedia';
import { getDeadlineFormatted } from './goallistitem';
import { renderFavoriteTooltip, renderMarkCompleteTooltip, renderMoreTooltip, CustomGoalActions } from './goallistitem';
import { setGoalIndex } from '../../app/features/goals/goalSlice';
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
                                        index,
                                        length,
                                        showEditGoal, 
                                        setShowEditGoal,
                                        setShowEditGoalId,
                                        sortState,
                                        sortByDeadline,
                                        setGoalDeadline,
                                        id, 
                                        currentSortState, 
                                        openDeleteModal,
                                        setMarkCompleteId, 
                                        setMarkCompleteModalShow
                                     }){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const setIndex = (index, newIndex) => {
        dispatch(setGoalIndex({ index, newIndex }));
    }
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
                        max-height: 400px;
                        min-height: 400px;
                        color: #aaaaaa; 
                        background-color: rgba(100, 100, 100, 0.2);
                        cursor: pointer; 
                        margin: 10px;
                        border-radius: 10px;
                    }
                    .grid-item:hover {
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
                    .grid-item-actions-row,
                    .grid-item-actions-row-complete {
                        min-height: 80px;
                    }
                    .grid-item-actions-row-complete {
                        margin-top: 60%;
                    }
                    .goal-completed {
                        background-color: rgba(0, 99, 56, 0.5);
                    }   
                    .goal-completed:hover {
                        background-color: rgba(0, 99, 56, 0.2);
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
            <Container fluid className={` shadow-lg grid-item ${(complete === true) ? "goal-completed" : ""} `}>
                <Row className="d-flex justify-content-between mt-2">
                    <Col xs="8" className="d-flex justify-content-start goal-griditem-name-col align-items-center" onClick={() => navigate(`/app/goal/${id}`)}>
                        {
                            (currentSortState === "priority" && priority !== -1) ? <span className="priority-span">{priority}</span> : ""   
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
                                    <Dropdown.Item onClick={(e) => { navigate(`/app/goal/${id}`); }}><Icon.Trophy color={"#34dcbe"} />&nbsp;&nbsp;View</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => { setShowEditGoalId(id); setShowEditGoal(true); }}><Icon.PencilFill color={"#34dcbe"}/>&nbsp;&nbsp;Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => {  e.preventDefault(); openDeleteModal(id); }}><Icon.Trash color={"#34dcbe"}/>&nbsp;&nbsp;Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </OverlayTrigger>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-start mt-2">
                {
                  (complete === true) ?
                    <Col className="d-flex justify-content-start timestamp-col mt-2">
                        Completed:&nbsp;<span className="timestamp-color">{getDeadlineFormatted(completedtime)}</span>
                    </Col>
                    : 
                    <Col className="d-flex justify-content-start timestamp-col">
                        Deadline:&nbsp;<span className="timestamp-color">{getDeadlineFormatted(deadline)}</span>
                    </Col>
                }  
                </Row>
                {
                    (!complete || media.length > 0) ? 
                    <Row onClick={() => { navigate(`/app/goal/${id}`)}}>
                        <Col>
                            <GridItemMedia 
                                id={id}
                                setShowEditGoalId={setShowEditGoalId} 
                                setShowEditGoal={setShowEditGoal} 
                                media={media} />                    
                        </Col>
                    </Row> : ""
                }
                {
                    (!complete) ? 
                        <Row className="grid-item-actions-row">
                            <Col className="d-flex justify-content-center">
                                {
                                    (priority !== 1 && currentSortState === "priority") ? (
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderFavoriteTooltip}
                                        >
                                        <Icon.Star color={"rgba(213, 176, 0, 0.5)"} width={40} height={40} className="mark-complete-button" onClick={() => setIndex(priority - 1, 0)} />
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
                                    <Icon.CheckCircleFill width={40} height={40} color={"#34dcbe"} className="mark-complete-button" onClick={() => { setMarkCompleteId(id); setMarkCompleteModalShow(true); }} />
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