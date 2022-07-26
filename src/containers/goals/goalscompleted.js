import  { useSelector } from 'react-redux';
import { selectCompleteGoals, selectGoals } from '../../app/features/goals/goalSlice';
import { Container, Row, Col, Tooltip, OverlayTrigger, Button } from 'react-bootstrap'; 
import { useEffect, useState } from 'react';
import GoalListItem from '../../components/goals/goallistitem';
import * as Icon from 'react-bootstrap-icons';

export default function GoalsCompleted({ openDeleteModal }) {   
    const [_goals, _setGoals] = useState([]);
    const goals = useSelector(selectCompleteGoals);
    const [currentSortState, setCurrentSortState] = useState();
    useEffect(() => {
        console.log("goals list loaded", goals);
        _setGoals(goals);
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
                }
                .rearrange-button {
                    margin-right: 40px;
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
            `
        }
        </style>
        <Container className="goals-list-cont" fluid>
        <Row className="goal-list-item-row-sort">
            <Col className="d-flex justify-content-start align-items-center col-sort-by-text">
                Sort: 
                <Button variant="dark" className={`sort-button ${(currentSortState === "priority") ? "selected-sort-button" : ""}`} onClick={() => setCurrentSortState("priority")}>Priority</Button>
                <Button className={`sort-button ${(currentSortState === "deadline") ? "selected-sort-button" : ""}`} variant="dark" onClick={() => setCurrentSortState("deadline")}>Deadline</Button>
                {
                    (currentSortState === "priority") ? <Button variant="dark" className="rearrange-button" onClick={() => {}}><Icon.FilterLeft /> Rearrange</Button> : ""

                }
            </Col>
        </Row>
        
        {
            _goals.map((goal, index) => (
                <Row className="goal-list-item-row" key={goal.id}>
                    <GoalListItem openDeleteModal={openDeleteModal} priority={index + 1} name={goal.name} deadline={goal.deadline} />
                </Row>
            ))
        }
        </Container>
        </>
    )
}