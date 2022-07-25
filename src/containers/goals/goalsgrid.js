import  { useSelector } from 'react-redux';
import { selectGoals } from '../../app/features/goals/goalSlice';
import { Container, Row, Col, Tooltip, OverlayTrigger, Button } from 'react-bootstrap'; 
import { useEffect, useState } from 'react';
import GoalGridItem from '../../components/goals/goalgriditem';
import * as Icon from 'react-bootstrap-icons';
import { showCompleted, setGoalsDeadline, setGoalsIndex, sortGoalsByDeadline, sortGoalsByPriority } from './goalslist';

export default function GoalsGrid({ setShowEditGoal }) {   
    const [_goals, _setGoals] = useState([]);
    const goals = useSelector(selectGoals);
    const [currentSortState, setCurrentSortState] = useState("priority");
    const setGoalDeadline = (deadline, id) => {
        setGoalsDeadline({ deadline, id,  _goals: goals,  _setGoals });
    }
    const setIndex = (index, newIndex) => {
        setGoalsIndex({ index, newIndex,  _goals: goals, _setGoals });
    }
    const sortByDeadline = () => {
        sortGoalsByDeadline({ _goals: goals, _setGoals }); 
    }
    const sortByPriority = () => {
        sortGoalsByPriority({  _goals: goals, _setGoals });
    }
    const showCompletedGoals = () => {
        showCompleted({  _goals: goals, _setGoals });
    }
    useEffect(() => {
        if(currentSortState === "deadline") {
            console.log("sorting by deadline descending")
            sortByDeadline();
        }
        if(currentSortState === "priority") {
            console.log("sorting by prio ascending")
            sortByPriority();
        }
        if(currentSortState === "completed") {
            console.log("showing completed goals"); 
            showCompletedGoals();
        }
    }, [currentSortState]);
    useEffect(() => {
        console.log("goals grid loaded", goals);
        sortByPriority(goals, _setGoals);
    }, [goals]);
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
                .selected-sort-button:active, 
                .selected-sort-button:focus, 
                .selected-sort-button:focus-visible, 
                .selected-sort-button:hover {
                    background-color: #34aaaa;
                    color: #080808;
                } 
                .select-sort-col {
                    color: #aaaaaa;
                }
                `
        }
        </style>
        <Container className="goals-list-cont d-flex flex-wrap align-content-start" fluid>
            <Row className="sort-button-row">
                <Col className="d-flex justify-content-start align-items-center select-sort-col">
                    <span className="sort-by-span">Sort by:</span>
                    <Button 
                        variant="dark" 
                        className={`sort-button-grid ${(currentSortState === 'priority') ? "selected-sort-button" : ""}`} 
                        onClick={() => { if(currentSortState !== "priority") setCurrentSortState("priority") }} >
                            Priority
                    </Button>
                    <Button 
                        variant="dark" 
                        className={`sort-button-grid ${(currentSortState === 'deadline') ? "selected-sort-button" : ""}`}
                        onClick={() => { if(currentSortState !== "deadline") setCurrentSortState("deadline") }} >
                            Deadline
                    </Button>
                    <Button 
                        variant="dark" 
                        className={`sort-button-grid ${(currentSortState === 'completed') ? "selected-sort-button" : ""}`} 
                        onClick={() => { if(currentSortState !== "completed") setCurrentSortState("completed") }} >
                            Completed
                    </Button>
                </Col>
            </Row>
            <Row>
            {
                _goals.map((goal, index) => (
                    <GoalGridItem 
                        setShowEditGoal={setShowEditGoal}
                        media={goal.media} id={goal.id} 
                        setGoalDeadline={setGoalDeadline} 
                        sortByDeadline={sortByDeadline} 
                        sortState={currentSortState} 
                        length={_goals.length}
                        setIndex={setIndex} 
                        index={index} 
                        rearrangeMode={true}  
                        showPrio={currentSortState === "priority"} 
                        priority={index + 1} 
                        name={goal.name} 
                        deadline={goal.deadline}  
                        currentSortState={currentSortState}
                        complete={goal.complete === true}
                        completedtime={goal.completedtime}
                    />
                ))
            }
            </Row>
        </Container>
        </>
    )
}