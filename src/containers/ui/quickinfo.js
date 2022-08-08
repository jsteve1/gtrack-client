import { Container, Row,  Col } from 'react-bootstrap';
import { useSelector } from 'react-redux'; 
import { selectNumCompleted, selectNumTodo } from '../../app/features/goals/goalSlice';
import { profile } from '../../app/features/users/userSlice';

export default function QuickInfo() {
    const _profile = useSelector(profile);
    const numCompleted = useSelector(selectNumCompleted(_profile?.id));
    const numTodo = useSelector(selectNumTodo(_profile?.id));
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
                    <Col />
                    <Col className="justify-content-between d-flex mt-1" xs="10" md="6">
                        <span className="goals-inprogress">Todo: </span><span className="number-goals-quick-info">{numTodo}</span>
                    </Col>
                    <Col />
                </Row>   
                <Row>
                    <Col />
                    <Col className="justify-content-between d-flex mt-1" xs="10" md="6">
                        <span className="goals-achieved">Completed:</span><span className="number-goals-quick-info">{numCompleted}</span> 
                    </Col>
                    <Col />
                </Row>
            </Container>
        </>
    )
}