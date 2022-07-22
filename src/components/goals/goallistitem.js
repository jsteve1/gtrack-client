import { useEffect, forwardRef, useState } from 'react';
import { Container, Row, Col, Tooltip, OverlayTrigger, Dropdown } from 'react-bootstrap'; 
import * as Icon from 'react-bootstrap-icons';
const getDeadlineFormatted = (deadline) => {
    const unixEpochTimeMS = deadline * 1000;
    const d = new Date(unixEpochTimeMS);
    return d.toLocaleDateString();
}
const renderMarkCompleteTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
       <h3>Mark Goal Complete</h3>
    </Tooltip>
  );

const renderMoreTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
       <h3>More...</h3>
    </Tooltip>
  );
const renderMoveUpTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h3>Move Up</h3>
    </Tooltip>
);
const renderMoveDownTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h3>Move Down</h3>
    </Tooltip>
);
const renderStarTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h3>Move to #1</h3>
    </Tooltip>
);

  
  const CustomGoalActions = forwardRef(( { onClick }, ref) => (
    <>
        <style type="text/css">
            {
                `
                    .icon-person-top-nav {
                        cursor: pointer;
                        color: #34aaaa;
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


export default function GoalsListItem({ name, 
                                        media, 
                                        deadline, 
                                        postponed,
                                        complete, 
                                        reminders,
                                        priority,
                                        rearrangeMode,
                                        showPrio
                                         }) {       
    return (
        <>
        <style type="text/css">
        {
            `
                .goal-list-item-col {
                    font-size: 4vh;
                    color: white;
                    text-align: center;
                    margin-top: 25px;
                    white-space: nowrap;
                }
                .goal-list-cont {
                    min-height: 100px;
                    cursor: pointer;
                    transition: all ease 0.2s;
                }
                .goal-list-cont:hover {
                    background-color: rgba(100, 100, 100, 0.2);
                    transform: scale(1.01);
                }
                .goal-list-cont:focus,
                .goal-list-cont:active,
                .goal-list-cont:focus-visible {
                    background-color: rgba(120, 120, 120, 0.2);
                    transform: scale(1.00);
                }
                .priority-span {
                    color: #aaaaaa;
                    margin-right: 35px;
                    font-weight: 500;

                }
                .goal-name-span {
                    color: #34dcbe;
                }
                .deadline-span {
                    font-size: 14pt;
                    font-weight: 300;
                    margin-top: auto;
                    margin-bottom: auto;
                    margin-right: 20px;
                    white-space: nowrap;
                }
                .priority-span {
                    font-weight: 700;
                    font-size: 4.5vh;
                }
                .goal-list-item-row {
                    padding-bottom: 15px;
                }
                .deadline-date {
                    color: #34dcbe;
                    font-size: 4vh;
                    font-weight: 300;
                }
                @media only screen and (max-width: 780px) {
                    .deadline-col {
                        margin-left: 4px;
                        margin-bottom: 15px;
                    } 
                    .goal-list-actions-col {
                        justify-content: space-between;
                        width: 100%;
                    }
                }
                @keyframes growshrink {
                    0%   {transform: scale(1.0); }
                    50%  {transform: scale(1.1); }
                    100% {transform: scale(1.0); }
                }
                .goal-list-item-action {
                    color: #34aaaa;
                }
                .goal-list-item-action:hover,
                .goal-list-item-action:active,
                .goal-list-item-action:focus,
                .goal-list-item-action:focus-visible {
                    color: #34dcbe;
                    filter: brightness(1.05);
                    cursor: pointer;
                    animation-name: growshrink;
                    animation-duration: 0.5s; 
                }
            `
        }
        </style>
        <Container className="goal-list-cont border-bottom border-secondary" fluid>
            <Row className="goal-list-item-row">
                {
                    (rearrangeMode == true) ?    <>
                        <Col xs="6" sm="3" className="goal-list-item-col d-flex justify-content-around align-items-center">
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderMoveUpTooltip}
                            >
                                <Icon.ArrowUpShort className="goal-list-item-action" width={50} height={50} /> 
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderMoveDownTooltip}
                            >
                                <Icon.ArrowDownShort className="goal-list-item-action" width={50} height={50} /> 
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderStarTooltip}
                            >
                                <Icon.StarFill className="goal-list-item-action" width={35} height={35} /> 
                            </OverlayTrigger>
                        </Col>
                    </> :   ""
                }
                <Col sm="5" xs="12" className="goal-list-item-col d-flex justify-content-start">
                {
                    (rearrangeMode || showPrio === false) ? "" : <span className="priority-span">{priority}</span>
                }    
                <span className="goal-name-span">{name}</span>
                </Col>
                <Col sm="4" xs="12" className="goal-list-item-col d-flex justify-content-start deadline-col">
                    <div className="deadline-span">Deadline:</div><span className="deadline-date">{getDeadlineFormatted(deadline)}</span>
                </Col>
                {
                    (rearrangeMode === true) ?
                    ""
                    :
                    <>
                        <Col sm="3" xs="12" className="goal-list-item-col d-flex justify-content-around goal-list-actions-col">       
                            <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderMarkCompleteTooltip}
                                >
                                <Icon.CheckCircleFill className="goal-list-item-action" width={60} height={60} /> 
                            </OverlayTrigger>
                            <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderMoreTooltip}
                                    >
                                <Dropdown drop={'start'}>
                                    <Dropdown.Toggle as={CustomGoalActions} id="dropdown-custom-components" />
                                    <Dropdown.Menu variant="dark">
                                        <Dropdown.Item onClick={(e) => {  }}><Icon.Trophy color={"#34dcbe"} />&nbsp;&nbsp;View</Dropdown.Item>
                                        <Dropdown.Item onClick={(e) => { }}><Icon.Trash color={"#34dcbe"}/>&nbsp;&nbsp;Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </OverlayTrigger>
                        </Col>
                    </>
                }  
            </Row>
        </Container>
        </>
    )
}