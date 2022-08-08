import { useEffect, forwardRef, useState } from 'react';
import { Container, Row, Col, Tooltip, OverlayTrigger, Dropdown, Form } from 'react-bootstrap'; 
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import TimePicker from 'react-bootstrap-time-picker';

export const getDeadlineFormatted = (deadline, includeTime = true) => {
    const unixEpochTimeMS = deadline * 1000;
    const d = new Date(unixEpochTimeMS);
    console.log(d);
    const time = d.toLocaleTimeString(); 
    const ampm = time.split(" ")[1]; 
    const hour = time.split(":")[0]; 
    const minute = time.split(":")[1];
    const timeString = `, ${hour}:${minute}${ampm}`;
    const dateString =  d.toLocaleDateString();
    if(includeTime) {
        return dateString + timeString;
    } else
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
                                        setShowEditGoalId, 
                                        sortState,
                                        sortByDeadline,
                                        setGoalDeadline,
                                        id,
                                        openDeleteModal,
                                        setMarkCompleteModalShow,
                                        setMarkCompleteId 
                                    }) {       
    const [showEditDate, setShowEditDate] = useState(false);
    const [newDeadline, setNewDeadline] = useState(deadline);
    const [enteredDate, setEnteredDate] = useState("");
    const [time, setTime] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if(sortState === "deadline") {
            sortByDeadline();
        }
    }, [newDeadline]);
    const handleTimeChange = (time) => {
        console.log(time);
        setTime(time);
    }
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
                    width: 95%;
                    border-radius: 10px;
                    min-height: 150px;
                    cursor: pointer;
                    transition: all ease 0.2s;
                    background-color: rgba(100, 100, 100, 0.08);
                }                            
                .goal-list-cont:hover {
                    ${(complete) ? "background-color: rgba(0, 99, 56, 0.5);"
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
                    margin-left: 15px;
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
                    background-color: rgba(0, 99, 56, 0.5);
                 }
                 .goal-completed:hover {
                    background-color: rgba(0, 99, 56, 0.2);
                }
                 .goal-name-span-center-align {
                    margin-left: 55px;
                 }
                 .time-picker-input {
                    background-color: rgba(100, 100, 100, 0.3); 
                    color: #34dcbe;
                    max-width: 200px;
                    width:175px;
                    border: none; 
                    text-align: center;
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
                    (rearrangeMode || showPrio === false || complete === true) ? "" : <span className="priority-span" onClick={() => navigate(`/app/goal/${id}`) }>{priority}</span>
                }    
                <span className={(complete === "true") ? "goal-name-span goal-name-span-center-align" :  "goal-name-span"} onClick={() => navigate(`/app/goal/${id}`) }>{name}</span>
                </Col>
                <Col sm="12" xs="12" md="5" className="goal-list-item-col d-flex justify-content-start deadline-col" onClick={() => navigate(`/app/goal/${id}`) }>
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
                            <TimePicker className="time-picker-input" onChange={handleTimeChange} value={time} start="00:00" end="23:59" step={15} />
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
                            (complete) ? "" : (
                            <span className="deadline-date" onClick={(e) => { e.preventDefault(); }}>
                                {getDeadlineFormatted(newDeadline)}
                            </span>) 
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
                            (complete === true) ? ""
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
                                        <Icon.CheckCircleFill className="goal-list-item-action" width={40} height={40} onClick={() => { setMarkCompleteModalShow(true); setMarkCompleteId(id); }} /> 
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
                                    <Dropdown.Item as={Col} onClick={(e) => {  navigate(`/app/goal/${id}`);   }}><Icon.Trophy color={"#34dcbe"} />&nbsp;&nbsp;View</Dropdown.Item>
                                    <Dropdown.Item as={Col} onClick={(e) => { setShowEditGoalId(id); setShowEditGoal(true) }}><Icon.PencilFill color={"#34dcbe"}/>&nbsp;&nbsp;Edit</Dropdown.Item>
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