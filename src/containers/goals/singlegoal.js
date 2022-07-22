import { Offcanvas, Container, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
export default function SingleGoalView() {
    const { goalId } = useParams(); 
    
    return (
        <>
            <style type="text/css">
            {
                `
                    .single-goal-cont {
                        background-color: #191919;
                        color: #aaaaaa; 
                    }
                `
            }
            </style>
            <Container fluid className="single-goal-cont">
                <Row>
                    <Col>
                    
                    </Col>
                </Row>
            </Container>
        </>
    )
}