import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectGoals, selectProgressMarkers } from '../../app/features/goals/goalSlice';
import SmallGoalListItem from '../../components/goals/smallgoallistitem';
export default function SmallGoalList() {
    const goals = useSelector(selectGoals);
    const progressMarkers = useSelector(selectProgressMarkers);
    const getDeadlineFormatted = (deadline) => {
        const unixEpochTimeMS = deadline * 1000;
        const d = new Date(unixEpochTimeMS);
        return d.toLocaleDateString();
    }
    return (
        <>
            <style type="text/css">
            {
                `
                    .small-goal-list-app-home {
                        background-color: rgba(100, 100, 100, 0.2);
                        color: #aaaaaa;
                        min-height: 100px;
                        margin-top: 15px;
                    }     
                    .small-goals-list-label {
                        color: #aaaaaa; 
                        font-size: 5vh;
                        font-weight: 500;
                        cursor: pointer;
                    } 
                    .small-goals-list-label:hover,
                    .small-goals-list-label:active,
                    .small-goals-list-label:focus,
                    .small-goals-list-label:focus-visible {
                        color: #34dcbe;
                        background-color: rgba(120, 120, 120, 0.3);
                    }
                    .small-list-cont {
                        max-height: 400px; 
                        overflow-y: auto;
                    } 
                `
            }
            </style>
            <Container fluid className="small-goal-list-app-home">
                <Row className="border-bottom border-secondary pb-1">
                    <Col className="small-goals-list-label d-flex justify-content-start pb-2">
                        My Goals
                    </Col>
                </Row>
                <Container fluid className="small-list-cont">
                {
                    goals.map((goal, index) => (
                        <Row>
                            <SmallGoalListItem priority={index + 1} name={`${goal.name}`} deadline={getDeadlineFormatted(goal.deadline)} />
                        </Row>
                    ))
                }                
                </Container>     
        </Container> 
        </>
    )
}