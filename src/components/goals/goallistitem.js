import { useEffect, forwardRef, useState } from 'react';
import { Container, Row, Col, Tooltip, OverlayTrigger, Dropdown, Form } from 'react-bootstrap'; 
import * as Icon from 'react-bootstrap-icons';
export const getDeadlineFormatted = (deadline) => {
    const unixEpochTimeMS = deadline * 1000;
    const d = new Date(unixEpochTimeMS);
    return d.toLocaleDateString();
}
export const renderMarkCompleteTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
       <h3>Mark Goal Complete</h3>
    </Tooltip>
  );

export const renderMoreTooltip = (props) => (
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
const renderEditDeadlineTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h3>Change Deadline</h3>
    </Tooltip>
);

const renderShareTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h3>Share</h3>
    </Tooltip>
);

export const renderFavoriteTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h3>Move to #1</h3>
    </Tooltip>
);

  
  export const CustomGoalActions = forwardRef(( { onClick }, ref) => (
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
                                        openDeleteModal
                                    }) {       
    const [showEditDate, setShowEditDate] = useState(false);
    const [newDeadline, setNewDeadline] = useState(deadline);
    const [enteredDate, setEnteredDate] = useState("");
    useEffect(() => {
        if(sortState === "deadline") {
            sortByDeadline();
        }
    }, [newDeadline]);
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
                    min-height: 150px;
                    cursor: pointer;
                    transition: all ease 0.2s;
                    background-color: rgba(100, 100, 100, 0.08);
                }
                .goal-list-cont:hover {
                    ${(complete) ? "background-color: rgba(39, 245, 157, 0.15);"
                        : "background-color: rgba(100, 100, 100, 0.2);"
                    }
                    transform: scale(1.01);
                }
                .goal-list-cont:focus,
                .goal-list-cont:active,
                .goal-list-cont:focus-visible {
                    background-color: rgba(120, 120, 120, 0.2);
                    transform: scale(1.00);
                }
                .goal-list-cont:hover .goal-name-span {
                    color: #34aaaa;
                }
                .priority-span {
                    color: #aaaaaa;
                    margin-right: 35px;
                    font-weight: 500;

                }
                .goal-name-span {
                    color: #bbbbbb;
                }
                .deadline-span,
                .completed-span {
                    font-size: 14pt;
                    font-weight: 300;
                    margin-top: auto;
                    margin-bottom: auto;
                    margin-right: 20px;
                    white-space: nowrap;
                    display: inline;
                }
                .completed-span {
                    color: #34aaaa;
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
                    cursor: pointer;
                    display: flex;
                    margin: 5px;
                }
                .deadline-date:hover {
                    transform: scale(1.01);
                    filter: brightness(1.05); 
                    font-weight: 400;
                }
                @media only screen and (max-width: 780px) {
                    .deadline-col {
                        margin-left: 4px;
                        margin-bottom: 15px;
                    } 
                    .goal-list-actions-col {
                        justify-content: space-between;
                    }
                }
                @keyframes growshrink {
                    0%   {transform: scale(1.0); }
                    50%  {transform: scale(1.1); }
                    100% {transform: scale(1.0); }
                }
                .goal-list-item-action {
                    color: #34aaaa; 
                    min-width: 60px;
                }
                .star-button {

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
                .form-control-date-picker * {
                    color: #dddddd !important;
                    cursor: pointer;
                }
                .icon-spacing-goal-list-actions {
                    width: 100px;
                }
                .edit-deadline-actions {
                    min-width: 50px; 
                    min-height: 50px;
                    color: #aaaaaa;
                    align-self: center;
                    margin: 5px;
                }
                .edit-deadline-actions:hover {
                    color: #34aaaa;
                } 
                .goal-completed {
                    background-color: rgba(39, 245, 157, 0.10);
                 }
                 .goal-name-span-center-align {
                    margin-left: 55px;
                 }
            `
        }
        </style>
        <Container className={`shadow-lg goal-list-cont ${(complete) ? "goal-completed" : ""}`} fluid>
            <Row className="goal-list-item-row">
                {
                    (rearrangeMode == true) ?    <>
                        <Col xs="6" sm="3" className="goal-list-item-col d-flex justify-content-around align-items-center">
                            {
                                (index === 0) ? "" : (
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderMoveUpTooltip}
                                    >
                                        <Icon.ArrowUpShort onClick={() => setIndex(index, index - 1)} className="goal-list-item-action" width={50} height={50} /> 
                                    </OverlayTrigger>
                                )
                            }  
                            {
                                (index === length - 1) ? "" : (
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderMoveDownTooltip}
                                    >
                                        <Icon.ArrowDownShort onClick={() => setIndex(index, index + 1)} className="goal-list-item-action" width={50} height={50} /> 
                                    </OverlayTrigger>
                                )
                            }                                        
                            {
                                (index === 0) ? (
                                    <Icon.StarFill className="goal-list-item-action" color={"rgba(213, 176, 0, 0.5)"} width={40} height={40} /> 
                                ) : (
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderStarTooltip}
                                >
                                    <Icon.Star className="goal-list-item-action" onClick={() => setIndex(index, 0)} color={"rgba(213, 176, 0, 0.5)"} width={40} height={40} /> 
                                </OverlayTrigger>
                                )
                            }
                        </Col>
                    </> :   ""
                }
                <Col sm="5" xs="12" className="goal-list-item-col d-flex justify-content-start">
                {
                    (rearrangeMode || showPrio === false || complete === true) ? "" : <span className="priority-span">{priority}</span>
                }    
                <span className={(complete === "true") ? "goal-name-span goal-name-span-center-align" :  "goal-name-span"}>{name}</span>
                </Col>
                <Col sm="12" xs="12" md="5" className="goal-list-item-col d-flex justify-content-start deadline-col">
                    <span className="deadline-span d-inline align-items-center">
                        {
                            (complete) ? <span className="completed-span">
                                Completed:<div className="deadline-date ">
                                            {getDeadlineFormatted(completedtime)}
                                        </div>
                            </span>
                         : <>
                            Deadline:
                           </>
                        }
                    </span>
                    {
                        (showEditDate) ? 
                        <span className="deadline-date">
                            <Form.Control 
                                defaultValue={
                                    getDeadlineFormatted(newDeadline)
                                }
                                onChange={(e) => { 
                                    console.log(e.target.value); 
                                    setEnteredDate(e.target.value); 
                                }}                               
                                type="date" 
                                variant="dark"
                                className="form-control-date-picker"
                            />
                            <Icon.Check onClick={() => {
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
                                                                setGoalDeadline(newdatestr, id);
                                                                setNewDeadline(newdatestr);   
                                                                setShowEditDate(false);    
                                                            } else {
                                                                setShowEditDate(false);
                                                            }                                                                        
                                                        }} 
                                        className="edit-deadline-actions"
                                        width={50} 
                                        height={50}                                             
                             />
                            <Icon.X onClick={() => setShowEditDate(false) } 
                                        className="edit-deadline-actions"
                                        width={50} 
                                        height={50}  
                            />
                        </span>
                        :       
                        <>
                        {
                            (complete) ? "" : (<OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderEditDeadlineTooltip}
                        >
                            <span className="deadline-date" onClick={() => setShowEditDate(true)}>
                                {getDeadlineFormatted(newDeadline)}
                            </span>
                        </OverlayTrigger>) 
                        }
                        </>
                   
                    }
                </Col>
                {
                    (rearrangeMode === true) ?
                    ""
                    :
                    <Col md="2" sm="12" xs="12" className="goal-list-item-col d-flex justify-content-around align-items-center goal-list-actions-col">       
                        {
                            (complete === true) ? ( 
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderShareTooltip}
                                    >
                                    <Icon.Share className="goal-list-item-action" width={40} height={40} /> 
                                </OverlayTrigger>
                            )
                            : (
                                <>
                                    {
                                        (priority !== 1) ? 
                                        (
                                        <>
                                           {
                                                (sortState === "deadline") ? "" : (
                                                    <>
                                                        <OverlayTrigger
                                                            placement="top"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={renderFavoriteTooltip}
                                                        >
                                                            <Icon.Star onClick={() => setIndex(index, 0) } className="goal-list-item-action" color={"rgba(213, 176, 0, 0.5)"} width={40} height={40} /> 
                                                        </OverlayTrigger>
                                                        <div className="icon-spacing-goal-list-actions"></div> 
                                                    </>
                                                )
                                           } 
                                        </>)
                                        :  (
                                            <>
                                            {
                                                 (sortState === "deadline") ? "" : (
                                                    <>
                                                        <Icon.StarFill className="goal-list-item-action" color={"rgba(213, 176, 0, 0.5)"} width={40} height={40} /> 
                                                         <div className="icon-spacing-goal-list-actions"></div>
                                                    </> 
                                                 )
                                            }
                                            </>
                                        )
                                    }
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderMarkCompleteTooltip}
                                        >
                                        <Icon.CheckCircleFill className="goal-list-item-action" width={40} height={40} /> 
                                    </OverlayTrigger>
                                </>
                            )
                        }
                     
                        <div className="icon-spacing-goal-list-actions"></div>
                        <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderMoreTooltip}
                                >
                            <Dropdown drop={'start'}>
                                <Dropdown.Toggle as={CustomGoalActions} id="dropdown-custom-components" />
                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item as={Col} onClick={(e) => {  }}><Icon.Trophy color={"#34dcbe"} />&nbsp;&nbsp;View</Dropdown.Item>
                                    <Dropdown.Item as={Col} onClick={(e) => { setShowEditGoal(true) }}><Icon.PencilFill color={"#34dcbe"}/>&nbsp;&nbsp;Edit</Dropdown.Item>
                                    <Dropdown.Item as={Col} onClick={(e) => { e.preventDefault(); openDeleteModal(id); }}><Icon.Trash color={"#34dcbe"}/>&nbsp;&nbsp;Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </OverlayTrigger>
                    </Col>
                }  
            </Row>
        </Container>
        </>
    )
}