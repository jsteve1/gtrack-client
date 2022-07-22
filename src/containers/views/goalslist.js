import { Container, Row, Col } from 'react-bootstrap'; 
import GoalsTimeline from '../goals/goalstimeline';
import GoalsList from '../goals/goalslist';
import GoalsListMenuBar from '../goals/goalsmenubar';
import mtn from '../../static/images/mtn.jpg';
import  { useState } from 'react';
import GoalsGrid from '../goals/goalsgrid'; 
import GoalsCompleted from '../goals/goalscompleted'; 

export default function GoalsListView() {
    const [showTimeline, setShowTimeline] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const [showGridView , setShowGridView] = useState(false);
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
                        <GoalsListMenuBar showTimeline={showTimeline} showGridView={showGridView} showCompleted={showCompleted}  setShowTimeline={setShowTimeline} setShowCompleted={setShowCompleted} setShowGridView={setShowGridView} />
                    </Row>
                    <Row className="pr-5 pl-5">
                    {   
                        (showTimeline) ?  <GoalsTimeline /> : <>
                        {
                            (showGridView) ? <GoalsGrid /> : <>
                                {
                                    (showCompleted) ? <GoalsCompleted /> : <>
                                        <GoalsList />
                                    </>
                                }
                                </>                          
                        }
                        </>
                    }
                    </Row>
                </Container>
            </>
        )
}