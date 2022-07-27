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
                            border-radius: 0px 0px 10px 10px;
                            border-bottom: 1px solid #096666;
                            border-left: 1px solid #096666;
                            border-right: 1px solid #096666;
                            border-top: none !important;
                        }
                        .goals-achieved, 
                            .goals-inprogress {
                                color: #34dcbe; 
                                font-weight: 300; 
                                font-size: 5vh;
                                text-align: left;
                        }
                        .number-goals-quick-info {
                            font-size: 5vh; 
                            color: #aaaaaa;
                            margin-left: 40px;
                            font-weight: 700;
                            margin-right: 45px;
                            margin-top: auto;
                            margin-bottom: auto;
                        }
                    `
                }
            </style>
            <Container fluid className="quick-info-cont shadow-lg">
                <Row>
                    <Col  className="justify-content-between d-flex mt-1" xs="12" sm="6">
                        <span className="goals-achieved">Achieved:</span><span className="number-goals-quick-info">0</span> 
                    </Col>
                    <Col className="justify-content-between d-flex mt-1" xs="12" sm="6">
                        <span className="goals-inprogress">Todo: </span><span className="number-goals-quick-info">0</span>
                    </Col>
                </Row>   
            </Container>
        </>
    )
}