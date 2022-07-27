import  { useSelector } from 'react-redux';
import { selectGoals } from '../../app/features/goals/goalSlice';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap'; 
import { useEffect, useState } from 'react';
import GoalGridItem from '../../components/goals/goalgriditem';
import * as Icon from 'react-bootstrap-icons';
import { showCompleted, setGoalsDeadline, setGoalsIndex, sortGoalsByDeadline, sortGoalsByPriority } from './goalslist';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import MarkCompleteModal from '../ui/markcompletemodal';

export default function GoalsGrid({ setShowEditGoal, setShowEditGoalId, openDeleteModal, setMarkCompleteModalShow, setMarkCompleteId  }) {   
    const { height, width } = useWindowDimensions();
    const [_goals, _setGoals] = useState([]);
    const goals = useSelector(selectGoals);
    const [currentSortState, setCurrentSortState] = useState("priority");
    const [sortAscending, setSortAscending] = useState(true);
    const setGoalDeadline = (deadline, id) => {
        setGoalsDeadline({ deadline, id,  _goals: goals,  _setGoals });
    }
    const sortByDeadline = () => {
        sortGoalsByDeadline({ _goals: goals, _setGoals, sortAscending }); 
    }
    const sortByPriority = () => {
        sortGoalsByPriority({  _goals: goals, _setGoals, sortAscending });
    }
    const showCompletedGoals = () => {
        showCompleted({  _goals: goals, _setGoals, sortAscending });
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
                .goals-list-cont {
                    margin-bottom: 100px; 
                    overflow-x: hidden;
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
                    margin-right: 25px;
                }
                .sort-button-row {
                    min-height: 60px;
                    width: 100%;
                }
                .selected-sort-button {
                    background-color: #34aaaa;
                    color: #080808;
                }
                .sort-button-secondary {
                    white-space: nowrap;
                    font-size: 13pt ;
                    background-color: transparent;
                    color: #34aaaa;
                    border: none;
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
        <Container className={`goals-list-cont d-flex flex-wrap align-content-start ${(_goals.length <= 5 && width < 1000) ? "" : "justify-content-center"}`} fluid>
            <Row className="sort-button-row align-self-start">
            <Col className="d-flex justify-content-start align-items-center flex-wrap select-sort-col">
                <span className="sort-by-span">Sort by:</span>
                {
                (currentSortState === "priority") ? 
                    <ButtonGroup>
                        <Button className={`sort-button-grid ${(currentSortState === 'priority') ? "selected-sort-button" : ""}`} variant="dark">Priority</Button>
                        <Button className={`sort-button-grid sort-button-secondary ${(sortAscending) ? "selected-sort-button-secondary" : ""}`} variant="dark" onClick={() => { setSortAscending(true); }}><Icon.SortUpAlt />&nbsp;Ascending</Button>
                        <Button className={`sort-button-grid sort-button-secondary ${(!sortAscending) ? "selected-sort-button-secondary" : ""}`} variant="dark" onClick={() => { setSortAscending(false);   }}><Icon.SortDown />&nbsp;Descending</Button>
                    </ButtonGroup> 
                    :
                    <Button 
                        variant="dark" 
                        className={`sort-button-grid ${(currentSortState === 'priority') ? "selected-sort-button" : ""}`} 
                        onClick={() => { if(currentSortState !== "priority") setCurrentSortState("priority");  }} >
                            Priority
                    </Button>
                }
                {
                    (currentSortState === "deadline") ? 
                    <ButtonGroup>
                        <Button className={`sort-button-grid ${(currentSortState === 'deadline') ? "selected-sort-button" : ""}`} variant="dark">Deadline</Button>
                        <Button className={`sort-button-grid sort-button-secondary ${(sortAscending) ? "selected-sort-button-secondary" : ""}`} variant="dark" onClick={() => setSortAscending(true)}><Icon.SortUpAlt />&nbsp;Upcoming</Button>
                        <Button className={`sort-button-grid sort-button-secondary ${(!sortAscending) ? "selected-sort-button-secondary" : ""}`} variant="dark" onClick={() => setSortAscending(false)}><Icon.SortDown />&nbsp;Descending</Button>
                    </ButtonGroup> 
                  :  <Button 
                        variant="dark" 
                        className={`sort-button-grid ${(currentSortState === 'deadline') ? "selected-sort-button" : ""}`}
                        onClick={() => { if(currentSortState !== "deadline") setCurrentSortState("deadline"); }} >
                            Deadline
                    </Button>
                }
                {
                    (currentSortState === "completed") ?
                    <ButtonGroup>
                        <Button className={`sort-button-grid ${(currentSortState === 'completed') ? "selected-sort-button" : ""}`} variant="dark">Completed</Button>
                        <Button className={`sort-button-grid sort-button-secondary ${(sortAscending) ? "selected-sort-button-secondary" : ""}`} variant="dark" onClick={() => { setSortAscending(true);  }}><Icon.SortUpAlt />&nbsp;Most Recent</Button>
                        <Button className={`sort-button-grid sort-button-secondary ${(!sortAscending) ? "selected-sort-button-secondary" : ""}`} variant="dark" onClick={() => { setSortAscending(false);  }}><Icon.SortDown />&nbsp;Descending</Button>
                    </ButtonGroup>
                        :  
                    <Button 
                        variant="dark" 
                        className={`sort-button-grid ${(currentSortState === 'completed') ? "selected-sort-button" : ""}`} 
                        onClick={() => { if(currentSortState !== "completed") setCurrentSortState("completed");  }} >
                            Completed
                    </Button>
                }
            
            </Col>
            </Row>
            <Row>
            {
                _goals.map((goal, index) => (
                    <GoalGridItem 
                        setShowEditGoal={setShowEditGoal}
                        setShowEditGoalId={setShowEditGoalId}
                        media={goal.media} id={goal.id} 
                        setGoalDeadline={setGoalDeadline} 
                        sortByDeadline={sortByDeadline} 
                        sortState={currentSortState} 
                        length={_goals.length}
                        index={index} 
                        rearrangeMode={true}  
                        showPrio={currentSortState === "priority"} 
                        priority={goal.priority} 
                        name={goal.name} 
                        deadline={goal.deadline}  
                        currentSortState={currentSortState}
                        complete={goal.complete === true}
                        completedtime={goal.completedtime}
                        openDeleteModal={openDeleteModal}
                        setMarkCompleteModalShow={setMarkCompleteModalShow} 
                        setMarkCompleteId={setMarkCompleteId} 
                    />
                ))
            }
            </Row>
        </Container>
        </>
    )
}