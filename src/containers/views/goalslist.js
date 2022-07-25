import { Container, Row, Col } from 'react-bootstrap'; 
import GoalsTimeline from '../goals/goalstimeline';
import GoalsList from '../goals/goalslist';
import GoalsListMenuBar from '../goals/goalsmenubar';
import mtn from '../../static/images/mtn.jpg';
import  { useState } from 'react';
import GoalsGrid from '../goals/goalsgrid'; 
import GoalsCompleted from '../goals/goalscompleted'; 
import EditGoal from '../goals/editgoal';
import NewGoal from '../goals/newgoal';

export default function GoalsListView() {
    const [showTimeline, setShowTimeline] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const [showGridView , setShowGridView] = useState(false);
    const [showNewGoal, setShowNewGoal] = useState(false);
    const [showEditGoal, setShowEditGoal] = useState(false);
    return (
            <>
                <style type="text/css">
                    {
                        `
                            .goals-list-cont {
                                    text-align: center;
                                    background-image: url("${mtn}");
                                    background-repeat: no-repeat;
                                    background-size: cover;
                                    min-height: 120vh;
                                    overflow-y: auto;
                            }
                        `
                    }
                </style>
                <Container fluid className="goals-list-cont">
                    <Row className="pr-5 pl-5">
                        <GoalsListMenuBar showNewGoal={showNewGoal} setShowNewGoal={setShowNewGoal} showTimeline={showTimeline} showGridView={showGridView} showCompleted={showCompleted}  setShowTimeline={setShowTimeline} setShowCompleted={setShowCompleted} setShowGridView={setShowGridView} />
                    </Row>
                    <Row className="pr-5 pl-5">
                    {   
                        (showTimeline) ?  <GoalsTimeline showEditGoal={showEditGoal} setShowEditGoal={setShowEditGoal} /> : <>
                        {
                            (showGridView) ? <GoalsGrid showEditGoal={showEditGoal} setShowEditGoal={setShowEditGoal} /> : <>
                                {
                                    (showCompleted) ? <GoalsCompleted showEditGoal={showEditGoal} setShowEditGoal={setShowEditGoal} /> : <>
                                        <GoalsList showEditGoal={showEditGoal} setShowEditGoal={setShowEditGoal} />
                                    </>
                                }
                                </>                          
                        }
                        </>
                    }
                    </Row>
                </Container>
                <EditGoal show={showEditGoal} setShow={setShowEditGoal} />
                <NewGoal show={showNewGoal} setShow={setShowNewGoal} />
            </>
        )
}