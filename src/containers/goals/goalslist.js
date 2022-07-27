import  { useDispatch, useSelector } from 'react-redux';
import { selectGoals, setGoalIndex, updateGoal } from '../../app/features/goals/goalSlice';
import { Container, Row, Col, Tooltip, OverlayTrigger, Button, ButtonGroup } from 'react-bootstrap'; 
import { useEffect, useState } from 'react';
import GoalListItem from '../../components/goals/goallistitem';
import * as Icon from 'react-bootstrap-icons';
import { current } from '../../../node_modules/@reduxjs/toolkit/dist/index';

export const setGoalsDeadline = ({ deadline, id, _goals, _setGoals }) => {
    let goalsCopy = JSON.parse(JSON.stringify(_goals));
    for(let goal of goalsCopy) {
        if(goal.id === id) {
            goal.deadline = deadline; 
        }
    }
    _setGoals(goalsCopy); 
}

export const setGoalsIndex = ({ index, newIndex, _goals, _setGoals }) => {
    if(index > -1 && index < _goals.length && index !== 0 && newIndex === 0) {
        const goal = _goals[index]; 
        let newGoals = JSON.parse(JSON.stringify(_goals)).filter(goal => goal.complete === false);
        newGoals = newGoals.filter((val, idx) => {
            return index !== idx;
        });
        newGoals.unshift(goal);
        for(let i = 0; i < newGoals.length; i++) {
            let newGoal = JSON.parse(JSON.stringify(newGoals[i]));
            newGoal.priority = i + 1;
            newGoals[i] = JSON.parse(JSON.stringify(newGoal));
        }
        _setGoals(newGoals);
        return;
    }
    if(index > _goals.length - 1 || index < 0) {
        console.log("index does not exist", index); 
    } else if(index === _goals.length - 1 && newIndex > index) {
        console.log("already at end");
    } else if(newIndex > _goals.length - 1) {
        console.log("cannot swap beyond length");
    } else if(newIndex < 0) {
        console.log("invalid new index");
    } else if(newIndex === index) {
        console.log("invalid new index");
    } else {
        const goalsCopy = JSON.parse(JSON.stringify(_goals)).filter(goal => goal.complete === false);
        const currGoal = _goals[index]; 
        const otherGoal = _goals[newIndex];
        goalsCopy[newIndex] = currGoal; 
        goalsCopy[index] = otherGoal; 
        let newIdx = 1;  
        for(let goal of goalsCopy) {
            let newGoal = JSON.parse(JSON.stringify(goal));
            newGoal.priority = newIdx;
            goal = JSON.parse(JSON.stringify(newGoal));
            newIdx++;
        }
        _setGoals(goalsCopy);
    }
}

export const sortGoalsByDeadline = ({ _goals, _setGoals, sortAscending }) => {
    let goalsCopy = JSON.parse(JSON.stringify(_goals));
    goalsCopy = goalsCopy.filter((goal) => {
        return goal.complete === false && goal.completedtime === 0; 
    }); 
    goalsCopy.sort((a, b) => {
        if(sortAscending) 
            return a.deadline - b.deadline 
        else return b.deadline - a.deadline;
    })
    _setGoals(goalsCopy);   
}

export const sortGoalsByPriority = ({ _goals, _setGoals, sortAscending }) => {
    let goalsCopy = JSON.parse(JSON.stringify(_goals));
    goalsCopy = goalsCopy.filter((goal) => {
        return goal.complete == false && goal.completedtime == 0; 
    }); 
    goalsCopy.sort((a, b) => {
        if(sortAscending)
            return a.priority - b.priority;
        else return b.priority - a.priority;

    })
    _setGoals(goalsCopy);   
}

export const showCompleted = ({ _goals, _setGoals, sortAscending = false }) => {
    let goalsCopy = JSON.parse(JSON.stringify(_goals));
    goalsCopy = goalsCopy.filter((goal) => {
        return goal.complete == true;
    }); 
    goalsCopy.sort((a, b) => {
        if(sortAscending) 
            return a.deadline - b.deadline 
        else return b.deadline - a.deadline;
    })
    _setGoals(goalsCopy);   
}

export default function GoalsList({ startingSortState, setShowEditGoal, openDeleteModal  }) {   
    const dispatch = useDispatch();
    const [_goals, _setGoals] = useState([]);
    const goals = useSelector(selectGoals);
    const [currentSortState, setCurrentSortState] = useState(startingSortState || "priority");
    const [sortAscending, setSortAscending] = useState(true);
    const [rearrangeMode, setRearrangeMode] = useState(false); 
    const setGoalDeadline = (deadline, id) => {
        dispatch(updateGoal({ id: id, updateGoal: { deadline }}));
    }
    const setIndex = (index, newIndex) => {
        dispatch(setGoalIndex({ index, newIndex }));
    }
    const sortByDeadline = () => {
        sortGoalsByDeadline({ _goals: goals, _setGoals, sortAscending }); 
    }
    const sortByPriority = () => {
        sortGoalsByPriority({ _goals: goals, _setGoals, sortAscending });
    }
    const showCompletedGoals = () => {
        showCompleted({ _goals: goals, _setGoals, sortAscending });
    }
    useEffect(() => {
        if(currentSortState === "deadline") {
            console.log("sorting by deadline " + `${sortAscending ? "ascending" : "descending"}`)
            sortByDeadline();
        }
        if(currentSortState === "priority") {
            console.log("sorting by prio" + `${sortAscending ? "ascending" : "descending"}`)
            sortByPriority();
        }
        if(currentSortState === "completed") {
            console.log("showing completed goals " + `${sortAscending ? "ascending" : "descending"}`); 
            showCompletedGoals();
        }
    }, [currentSortState, goals, sortAscending]);
    useEffect(() => {
        if(currentSortState === "priority") {
            console.log("sorting by prio " + `${sortAscending ? "ascending" : "descending"}`)
            sortByPriority();
        }
    }, []);
    return (
        <>
        <style type="text/css">
        {
            `
                .goal-list-item-row {
                    font-size: 4vh;
                    color: white;
                    text-align: center;
                }
                .goal-list-item-cont-add {
                    min-height: 150px;
                    cursor: pointer;
                    max-width: 300px;
                    transition: all ease 0.2s;
                    background-color: rgba(100, 100, 100, 0.08);
                }
                .goals-list-cont {
                    margin-bottom: 100px;
                    overflow-x: hidden;
                }
                .goal-list-item-row-sort {
                    min-height: 60px;
                    max-width: 100%;
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
                .sort-button,
                .rearrange-button {
                    background-color: transparent; 
                    outline: none; 
                    border: 1px solid #34aaaa; 
                    font-size: 12pt; 
                    color: #34aaaa;
                    max-height: 50px;
                    margin-left: 10px;
                    width: fit-content;
                    white-space: nowrap;
                }
                .rearrange-button {
                    margin-right: 40px;
                    ${(rearrangeMode) ? "color: #34dcbe; background-color: rgba(100,100,100,0.3)" : ""}
                }
                .selected-sort-button {
                    background-color: rgba(100,100,100,0.3);
                    color: #dddddd;
                }
                .sort-button:first-of-type {
                    margin-left: 20px;
                }
                .sort-button:hover, 
                .sort-button:focus,
                .sort-button:focus-visible,
                .sort-button:active {
                    background-color: transparent; 
                    color: #34dcbe;
                    border: 1px solid #34dcbe;
                }
                .col-sort-by-text {
                    color: #dddddd;
                    min-height: 60px;
                }
                .rearrange-action {
                    color: #34dcbe;
                    cursor: pointer;
                }
                .rearrange-action:hover,
                .rearrange-action:active, 
                .rearrange-action:focus, 
                .rearrange-action:focus-visible {
                    filter: brightness(1.50);
                    animation-name: growshrink;
                    animation-duration: 0.5s; 
                }
                .rearrange-actions-span {
                    font-size: 8pt;
                    color: #aaaaaa;
                }
                .goal-list-item-row-sort {
                    min-height: 60px;
                    max-width: 100%;
                }
                .sort-button-grid {
                    color: #aaaaaa; 
                    background-color: transparent;
                    font-size: 15pt; 
                    max-width: 150px;
                    max-height: 60px;
                    border: 1px solid #34aaaa;
                    margin-right: 5px;
                }
                .sort-button-grid:hover, 
                .sort-button-grid:focus, 
                .sort-button-grid:active, 
                .sort-button-grid:focus-visible {
                    background-color: rgba(100, 100, 100, 0.4);
                    color: #34dcbe; 
                    border: none; 
                    box-shadow: none; 
                    outline: none; 
                }
                .sort-by-span {
                    margin-right: 10px;
                    color: #34dcbe;
                }
                .sort-button-row {
                    min-height: 60px;
                    width: 100%;
                }
                .sort-button-secondary {
                    white-space: nowrap;
                    font-size: 13pt ;
                    background-color: transparent;
                    color: #34aaaa;
                    border: none;
                }
                .selected-sort-button {
                    background-color: #34aaaa;
                    color: #080808;
                }
                .selected-sort-button-secondary {
                    background-color: rgba(100, 100, 100, 0.3);
                    color: #34dcbe;
                }
                .selected-sort-button:active, 
                .selected-sort-button:focus, 
                .selected-sort-button:focus-visible, 
                .selected-sort-button:hover {
                    background-color: #34aaaa;
                    color: #080808;
                } 
                .selected-sort-button-secondary:active, 
                .selected-sort-button-secondary:focus, 
                .selected-sort-button-secondaryfocus-visible, 
                .selected-sort-button-secondary:hover {
                    background-color: rgba(100, 100, 100, 0.3);
                    color: #34dcbe;
                }
                .
                .select-sort-col {
                    color: #aaaaaa;
                }
                .icon-add-new {
                    margin-top: 40px;
                }

            `
        }
        </style>
        <Container className="goals-list-cont" fluid>
        <Row className="sort-button-row">
            <Col className="d-flex justify-content-start align-items-center flex-wrap select-sort-col">
                <span className="sort-by-span">Sort by:</span>
                {
                (currentSortState === "priority") ? 
                    <>
                        <ButtonGroup>
                            <Button className={`sort-button-grid ${(currentSortState === 'priority') ? "selected-sort-button" : ""}`} variant="dark">Priority</Button>
                            <Button className={`sort-button-grid sort-button-secondary ${(sortAscending) ? "selected-sort-button-secondary" : ""}`} variant="dark" onClick={() => { setSortAscending(true); setRearrangeMode(false); }}><Icon.SortUpAlt />&nbsp;Ascending</Button>
                            <Button className={`sort-button-grid sort-button-secondary ${(!sortAscending) ? "selected-sort-button-secondary" : ""}`} variant="dark" onClick={() => { setSortAscending(false); setRearrangeMode(false);   }}><Icon.SortDown />&nbsp;Descending</Button>
                            <Button 
                                variant="dark" 
                                className={`sort-button-grid sort-button-secondary ${(rearrangeMode === true) ? "selected-sort-button-secondary"  : ""}`}
                                onClick={() => { setSortAscending(true); setRearrangeMode(!rearrangeMode) }} >
                                    Rearrange
                            </Button>
                        </ButtonGroup> 
                    </>
                    :
                    <Button 
                        variant="dark" 
                        className={`sort-button-grid ${(currentSortState === 'priority') ? "selected-sort-button" : ""}`} 
                        onClick={() => { if(currentSortState !== "priority") setCurrentSortState("priority");  setRearrangeMode(false); }} >
                            Priority
                    </Button>
                }
                {
                    (currentSortState === "deadline") ? 
                    <>
                        <ButtonGroup>
                            <Button className={`sort-button-grid ${(currentSortState === 'deadline') ? "selected-sort-button" : ""}`} variant="dark">Deadline</Button>
                            <Button className={`sort-button-grid sort-button-secondary ${(sortAscending) ? "selected-sort-button-secondary" : ""}`} variant="dark" onClick={() => setSortAscending(true)}><Icon.SortUpAlt />&nbsp;Upcoming</Button>
                            <Button className={`sort-button-grid sort-button-secondary ${(!sortAscending) ? "selected-sort-button-secondary" : ""}`} variant="dark" onClick={() => setSortAscending(false)}><Icon.SortDown />&nbsp;Descending</Button>
                        </ButtonGroup>
                    </> 
                  :  <Button 
                        variant="dark" 
                        className={`sort-button-grid ${(currentSortState === 'deadline') ? "selected-sort-button" : ""}`}
                        onClick={() => { if(currentSortState !== "deadline") setCurrentSortState("deadline"); setRearrangeMode(false); }} >
                            Deadline
                    </Button>
                }
                {
                    (currentSortState === "completed") ?
                    <ButtonGroup >
                        <Button className={`sort-button-grid ${(currentSortState === 'completed') ? "selected-sort-button" : ""}`} variant="dark">Completed</Button>
                        <Button className={`sort-button-grid sort-button-secondary ${(sortAscending) ? "selected-sort-button-secondary" : ""}`} variant="dark" onClick={() => { setSortAscending(true); setRearrangeMode(false); }}><Icon.SortUpAlt />&nbsp;Ascending</Button>
                        <Button className={`sort-button-grid sort-button-secondary ${(!sortAscending) ? "selected-sort-button-secondary" : ""}`} variant="dark" onClick={() => { setSortAscending(false); setRearrangeMode(false);   }}><Icon.SortDown />&nbsp;Descending</Button>
                    </ButtonGroup>
                        :  
                    <Button 
                        variant="dark" 
                        className={`sort-button-grid ${(currentSortState === 'completed') ? "selected-sort-button" : ""}`} 
                        onClick={() => { if(currentSortState !== "completed") setCurrentSortState("completed");  setRearrangeMode(false); }} >
                            Completed
                    </Button>
                }
            
            </Col>
        </Row>
        {
            (rearrangeMode) ? <>
                {
                    _goals.map((goal, index) => 
                        <>
                            {
                                (goal.complete === true) ? "" :
                                (
                                    <Row className="goal-list-item-row" key={goal.id}>
                                        <GoalListItem openDeleteModal={openDeleteModal} complete={goal.complete} completedtime={goal.completedtime} id={goal.id} setGoalDeadline={setGoalDeadline} sortByDeadline={sortByDeadline} sortState={currentSortState} setShowEditGoal={setShowEditGoal} length={_goals.length} setIndex={setIndex} index={index} rearrangeMode={true}  showPrio={currentSortState !== "deadline"} priority={goal.priority} name={goal.name} deadline={goal.deadline} />
                                    </Row>
                                )
                            }
                        </>
                    )
                }
            </> : <>
                {
                      _goals.map((goal, index) => (
                        <>
                            <Row className="goal-list-item-row" key={goal.id}>
                                <GoalListItem openDeleteModal={openDeleteModal}  complete={goal.complete} completedtime={goal.completedtime} id={goal.id} setGoalDeadline={setGoalDeadline} sortByDeadline={sortByDeadline} sortState={currentSortState} setShowEditGoal={setShowEditGoal} length={_goals.length} setIndex={setIndex} index={index} rearrangeMode={false} showPrio={currentSortState !== "deadline"} priority={goal.priority} name={goal.name} deadline={goal.deadline} />
                            </Row>
                        </>
                    ))
                }
            </>
        }
        </Container>
        </>
    )
}