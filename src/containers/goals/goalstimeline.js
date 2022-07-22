import  { useSelector } from 'react-redux';
import { selectGoals } from '../../app/features/goals/goalSlice';
import { Container, Row, Col } from 'react-bootstrap'; 

export default function GoalsTimeline() {   
    const goals = useSelector(selectGoals);
    return (
        <>
        {
            goals.map((goal, index) => {
                <div>{JSON.stringify(goal)}</div>
            })
        }
        </>
    )
}