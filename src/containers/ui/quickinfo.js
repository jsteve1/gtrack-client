import { Container, Row,  Col } from 'react-bootstrap';

export default function QuickInfo() {
    return (
        <>
            <style type="text/css">
                {
                    `
                        .quick-info-cont {
                            color: #aaaaaa;
                            padding-top: 15px;
                            padding-bottom: 15px;
                            background-color: rgba(100, 100, 100, 0.2);
                        }
                        .goals-achieved, 
                            .goals-inprogress {
                                color: #34dcbe; 
                                font-weight: 500; 
                                font-size: 5vh;
                        }
                        .number-goals-quick-info {
                            font-size: 5vh; 
                            color: #aaaaaa;
                            margin-left: 20px;
                            font-weight: 700;
                        }
                    `
                }
            </style>
            <Container fluid className="quick-info-cont border-bottom border-secondary">
                <Row>
                    <Col  className="justify-content-start d-flex mt-1" xs="12" sm="6">
                        <span className="goals-achieved">Goals Achieved: </span><span className="number-goals-quick-info">0</span> 
                    </Col>
                    <Col className="justify-content-start d-flex mt-1" xs="12" sm="6">
                        <span className="goals-inprogress">Todo: </span><span className="number-goals-quick-info">0</span>
                    </Col>
                </Row>   
            </Container>
        </>
    )
}