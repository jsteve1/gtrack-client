import { Container, Row, Col, Button, OverlayTrigger , Tooltip, Dropdown } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'; 
import { useState, useEffect } from 'react';
import { getDeadlineFormatted, CustomGoalActions } from '../../components/goals/goallistitem';
import { useDispatch, useSelector } from 'react-redux';
import { setGoalIndex, selectGoal } from '../../app/features/goals/goalSlice';

const renderUploadTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
       <h3>Upload Media</h3>
    </Tooltip>
  );

const renderEditTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h3>Edit Goal</h3>
    </Tooltip>
);

const renderShareTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h3>Share Goal</h3>
    </Tooltip>
)
const renderStarTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h3>Move to #1</h3>
    </Tooltip>
);


export default function SingleGoalInfo({ goalid, setUploadModalShow, setShowEdit, openDeleteModal, setMarkCompleteModalShow }) {
    const dispatch = useDispatch(); 
    const goal = useSelector(selectGoal(goalid));
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
                            50%  {transform: scale(1.2); }
                            100% {transform: scale(1.0); }
                        }
                        .myprofileinfo-cont {
                                padding-top: 25px;
                                color: #aaaaaa;
                                padding-bottom: 30px;
                                ${(goal?.complete === true) ? "background-color: rgba(0, 99, 56, 0.5);" : "background-color: rgba(100, 100, 100, 0.2);"}
                                min-height: 100px;
                                padding-left: 50px;
                                border-radius: 15px;
                                max-width: 800px;
                        }
                        .name-col {
                            font-size: 25pt; 
                            font-weight: 500; 
                        }
                        .email-col, .bio-col {
                            font-size: 3vh; 
                            font-weight: 300; 
                        }
                        .bio-col {
                            font-size: 2vh; 

                        }
                        .edit-profile-btn {
                            font-weight: 300; 
                            font-size: 2vh;
                            background-color: transparent;
                            color: #ddddddd;
                            padding: 15px;
                            border-radius: 10px; 
                            max-width: 200px !important;
                            margin-left: 50px;
                            height: 100px;
                            outline: none; border: none;
                        }
                        .edit-profile-pencil:hover,
                        .edit-profile-pencil:active,
                        .edit-profile-pencil:focus,
                        .edit-profile-pencil:focus-visible {
                            color: #34dcbe;
                            filter: brightness(1.05);
                            cursor: pointer;
                            animation-name: growshrink;
                            animation-duration: 0.5s; 
                        }
                        .action-buttons-col {
                            padding-right: 15px;
                            margin-top: 15px; 
                            margin-bottom: 15px;
                        }
                        .fname-lname-span, 
                        .deadline-text-span,
                        .priority-text-span {
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            margin-right: 10%;
                        }
                        .fname-lname-span {
                            font-size: 36pt;
                            white-space: normal;
                        }
                        .deadline-text-span,
                        .priority-text-span {
                            font-size: 20pt;
                            color: #999999;
                        }
                        .edit-profile-span {
                            display: flex; 
                            width: 30%;
                            justify-content: space-around;
                            align-items: center;
                        }
                        .deadline-span {
                            color: #34dcbe;
                            font-size: 20pt;
                            margin-left: 25px;
                        }
                        .dropdown-ctm-cols {
                            cursor: pointer;
                        }
                        .deadline-name-col {
                            width: 80%;
                            margin-left: 25px;
                        }

                        .goal-single-action-star {
                            cursor: pointer; 

                        }
                        .goal-single-action-star:hover,
                        .goal-single-action-star:active,
                        .goal-single-action-star:focus,
                        .goal-single-action-star:focus-visible {
                            color: #34dcbe;
                            filter: brightness(1.05);
                            cursor: pointer;
                            animation-name: growshrink;
                            animation-duration: 0.5s; 
                        }
                        .nowrap {
                            white-space: nowrap;
                        }
                        @media only screen and (max-width: 668px) {
                            .deadline-span {
                                white-space: normal !important;
                            }
                        }
                    `
                }
                </style>
                <Container fluid className="myprofileinfo-cont shadow-lg">
                    <Row className={`mb-1 ml-5 pb-3 ${(goal?.complete === true) ? "" : "border-bottom border-secondary "}`}>
                        <Col xs="12" className="d-flex justify-content-center name-col">
                            <span className="fname-lname-span">{`${goal.name}`}</span>                
                        </Col>
                        {
                            (goal.complete || goal.completedtime !== 0) ?
                            <>
                                <Col xs="12" sm="9" md="4" className="d-flex justify-content-between name-col nowrap">
                                    <span className="deadline-text-span">Completed:</span><span className="deadline-span">{getDeadlineFormatted(goal.completedtime)}</span>             
                                </Col> 
                            </>
                            : 
                            <>
                                <Col xs="12" className="deadline-col ml-5">
                                    <div className="d-flex justify-content-between deadline-name-col nowrap">
                                        <span className="deadline-text-span">Deadline:</span><span className="deadline-span">{getDeadlineFormatted(goal.deadline)}</span>             
                                    </div>
                                </Col>
                                <Col xs="12" className="deadline-col">
                                    <div className="d-flex justify-content-between deadline-name-col nowrap">
                                        <span className="priority-text-span">Priority:</span><span className="deadline-span">{goal.priority}</span>  
                                    </div>          
                                </Col>
                            </>
                        }
                    </Row>
                    {
                        
                        (goal?.complete !== true) ?
                        <Row>
                                <Col />
                                    <Col xs="8" className="d-flex justify-content-between mt-4 p-1">
                                        {
                                            (goal.complete || goal.completedtime !== 0) ? "" :     
                                                <OverlayTrigger
                                                    placement="left"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={<Tooltip><h3>Mark Complete</h3></Tooltip>}
                                                    >
                                                        <Icon.CheckCircleFill className="edit-profile-pencil upload-cloud" color={"#34dcbe"} width={"40px"} height={"40px"} onClick={() => { setMarkCompleteModalShow(true) }} />
                                                </OverlayTrigger>
                                        }
                                        <OverlayTrigger
                                                placement="left"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderUploadTooltip}
                                            >
                                                <Icon.CloudUploadFill className="edit-profile-pencil upload-cloud" width={"40px"} height={"40px"} onClick={() => setUploadModalShow(true)} />
                                        </OverlayTrigger>
                                        {
                                                (goal.priority === 1) ? (
                                                        <Icon.StarFill className="goal-single-action-star" color={"rgba(213, 176, 0, 0.5)"} width={40} height={40} /> 
                                                    ) : (
                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={renderStarTooltip}
                                                    >
                                                        <Icon.Star className="goal-single-action-star" onClick={() => setIndex(goal?.priority - 1, 0)} color={"rgba(213, 176, 0, 0.5)"} width={40} height={40} /> 
                                                    </OverlayTrigger>
                                                    )
                                        }
                                    </Col>
                                <Col />
                            </Row>
                        :
                        ""
                    }
                </Container>
        </>
    )
}
