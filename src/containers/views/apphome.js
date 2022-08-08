import { Container, Row, Col } from 'react-bootstrap';
import QuickInfo from '../ui/quickinfo';
import CurrentGoal from '../../components/goals/currentgoal';
import SmallGoalList from '../goals/smallgoallist';
import mtn from '../../static/images/mtn.jpg';
import AppHomeActions from '../ui/apphomeactions';
export default function AppHomeView() {
    return (
            <>
                <style type="text/css">
                {
                    `   
                        .app-home-cont {
                            padding-top: 120px;
                            text-align: center;
                            background-image: url("${mtn}");
                            background-repeat: no-repeat;
                            background-size: cover;
                            min-height: 130vh !important;
                        }
                        .app-home-row-2 {
                            margin-top: 25px;
                            margin-bottom: 120px;                            
                        }
                    `
                }
                </style>
                <Container fluid className="app-home-cont">
                    <Row>
                        <Col xs="12" className="current-goal-col-home">
                            <CurrentGoal />
                        </Col>
                    </Row>
                    <Row className="app-home-row-1">
                        <Col xs="12" className="quick-info-col-home">
                            <QuickInfo />
                        </Col>
                    </Row>
                    <Row className="mt-3 mb-3">
                            <AppHomeActions />
                    </Row>
                    <Row className="app-home-row-2">       
                        <Col xs="12" className="small-goal-list-col-home d-flex justify-content-center">
                            <SmallGoalList />
                        </Col>
                    </Row>
                </Container>
            </>
        )
}