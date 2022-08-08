import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCurrentGoal } from '../../app/features/users/userSlice';
import { selectGoals } from '../../app/features/goals/goalSlice';
import { useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

export default function CurrentGoal() {
    const currentGoal = useSelector(selectCurrentGoal);
    const goals = useSelector(selectGoals);
    const [_currentGoal, _setCurrentGoal] = useState(""); 
    const [id, setId] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const goal = goals.filter(goal => 
            goal.priority === 1 && goal.complete !== true && goal.name !== _currentGoal
        )[0];
        if(goal) { 
            _setCurrentGoal(goal.name);
            setId(goal.id); 
        } 
        else {
            _setCurrentGoal("No Goal Selected");
        } 
    }, [currentGoal]);
    return (
        <>
        <style type="text/css">
        {
            `        
                .current-goal-cont {
                    color: #aaaaaa;
                    padding-top: 15px;
                    padding-bottom: 15px;
                    background-color: rgba(100, 100, 100, 0.2);
                    border-radius: 10px 10px 0px 0px ;
                    border-top: 1px solid #096666;
                    border-left: 1px solid #096666;
                    border-right: 1px solid #096666;
                    border-bottom: none !important;
                }     
                .current-goal-label {
                    color: #34dcbe; 
                    font-size: 14pt;
                    font-weight: 300;

                }
                .current-goal-name {
                    font-size: 6vh;
                    margin-left: 25px;
                    cursor: pointer;
                    transition: all ease 0.2s;
                }
                .current-goal-name:hover {
                    color: #00dddd;
                    transform: scale(1.05);
                }
            `
        }
        </style>
        <Container fluid className="current-goal-cont">
                <Row>
                    <Col xs="12" className="d-flex justify-content-center align-items-center"><span className="current-goal-label"><Icon.StarFill color={"rgba(213, 176, 0, 0.5)"} width={25} height={25}/>&nbsp;Current&nbsp;Goal</span></Col>
                    <Col xs="12" className="d-flex justify-content-center align-items-center">
                         <span 
                            className="current-goal-name"
                            onClick={() => {
                                if(id !== "")
                                    navigate(`/app/goal/${id}`)
                                }
                            }
                         >{`${_currentGoal}`}</span>
                    </Col>
                </Row>
        </Container>
        </>
    )
}