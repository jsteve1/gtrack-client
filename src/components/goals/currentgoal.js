import { Container, Row, Col } from 'react-bootstrap';

export default function CurrentGoal() {

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
                }     
                .current-goal-label {
                    color: #34dcbe; 
                    font-size: 5vh;
                    font-weight: 500;

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
        <Container fluid className="current-goal-cont border-bottom border-secondary">
                <Row>
                    <Col xs="12" className="d-flex justify-content-start">
                        <span className="current-goal-label">Current Goal:</span> <span className="current-goal-name">{`${"this is a great test for"}`}</span>
                    </Col>
                </Row>
        </Container>
        </>
    )
}