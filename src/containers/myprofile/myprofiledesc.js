import { Container, Row, Col, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { selectCompleteGoals, selectTodoGoals, selectPostponedGoals } from '../../app/features/goals/goalSlice';
import { profile } from '../../app/features/users/userSlice';
import { getDeadlineFormatted } from '../../components/goals/goallistitem';

export default function MyProfileDesc() {
    const goalsCompleted = useSelector(selectCompleteGoals).length; 
    const goalsTodo = useSelector(selectTodoGoals).length;
    const goalsPostponed = useSelector(selectPostponedGoals).length;
    const { joinDate, media, privateProfile } = useSelector(profile); 
    return (
            <>
                <style type="text/css">
                {
                    `
                        .myprofiledesc-cont {
                            background-color: transparent;
                            min-height: 400px;
                            margin-top: 25px;
                            color: #aaaaaa;
                            margin-bottom: 150px;
                        }
                        .desc-data-row {
                            font-size: 3vh;
                            height: 70px;
                            padding-top: 5px;
                            padding-bottom: 10px;
                        }
                        .desc-data-stats {
                            color: #34dcbe;
                            font-size: 3vh;
                            font-weight: 500;
                        }
                    `
                }
                </style>
                <Container fluid className="myprofiledesc-cont pt-3 pb-3">
                    {/* <Row className="desc-data-row">
                        <Col />
                        <Col xs="12" md="8" className="d-flex justify-content-between border-bottom border-secondary align-items-center">
                            <span><Icon.Trophy width={30} height={30} />&nbsp;Goal Score</span> <span className="desc-data-stats">0</span>
                        </Col>
                        <Col />
                    </Row> */}
                    <Row className="desc-data-row">
                        <Col />
                        <Col xs="12" md="10" className="d-flex justify-content-between border-bottom border-secondary align-items-center">
                            Goals&nbsp;Completed: <span className="desc-data-stats">{goalsCompleted}</span>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="desc-data-row">
                        <Col />
                        <Col xs="12" md="10" className="d-flex mt-2 justify-content-between border-bottom border-secondary align-items-center">
                            Postponed <span className="desc-data-stats">{goalsPostponed}</span>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="desc-data-row">
                        <Col />
                        <Col xs="12" md="10"  className="d-flex mt-2 justify-content-between border-bottom border-secondary align-items-center">
                            Todo <span className="desc-data-stats">{goalsTodo}</span>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="desc-data-row">
                        <Col />
                        <Col xs="12" md="10"  className="d-flex mt-2 justify-content-between border-bottom border-secondary">
                            Join&nbsp;Date <span className="desc-data-stats">{getDeadlineFormatted(joinDate, false)}</span>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="desc-data-row">
                        <Col />
                        <Col xs="12" md="10"  className="d-flex mt-2 justify-content-between border-bottom border-secondary">
                            Uploads<span className="desc-data-stats">{`${media.length}`}</span>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="desc-data-row mb-5">
                        <Col />
                        <Col xs="12" md="10"  className="d-flex mt-2 justify-content-between border-bottom border-secondary">
                            Privacy <span className="desc-data-stats">{(privateProfile) ? <><Icon.Lock width={25} height={25} />&nbsp;Private</> : <><Icon.Globe2 width={25} height={25} />&nbsp;Public</>}</span>
                        </Col>
                        <Col />
                    </Row>
                </Container>
            </>
        )
}