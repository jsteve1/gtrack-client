import { Container, Row, Col } from 'react-bootstrap';
import QuickInfo from '../ui/quickinfo';
import CurrentGoal from '../../components/goals/currentgoal';
import OtherUserList from '../otheruser/otheruserlistview';
import SmallGoalList from '../goals/smallgoallist';
import mtn from '../../static/images/mtn.jpg';
import AppHomeActions from '../ui/apphomeactions';
export default function AppHomeView({ setStartingSortState }) {
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
                            min-height: 120vh !important;
                        }
                        .app-home-row-3 {
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
                        <AppHomeActions setStartingSortState={setStartingSortState} />
                    </Row>
                    <Row className="app-home-row-2">       
                        <Col xs="12" className="small-goal-list-col-home d-flex justify-content-center">
                            <SmallGoalList />
                        </Col>
                    </Row>
                    {/* <Row className="app-home-row-3">       
                        <Col />
                        <Col xs="10" className="other-user-list-col-home d-flex justify-content-center">
                            <OtherUserList />
                        </Col>
                        <Col />
                    </Row> */}
                </Container>
            </>
        )
}