import { Container, Row, Col, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

export default function MyProfileDesc({ goalsAchieved, goalsPostponed, goalsTodo, joinDate, numUploads, privateProfile }) {
    return (
            <>
                <style type="text/css">
                {
                    `
                        .myprofiledesc-cont {
                            background-color: transparent;
                            /* background-color: rgba(100, 100, 100, 0.2); */
                            min-height: 400px;
                            margin-top: 25px;
                            color: #aaaaaa;
                            margin-bottom: 150px;
                        }
                        .desc-data-row {
                            font-size: 3vh;
                            height: 60px;
                            padding-top: 5px;
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
                    <Row className="desc-data-row">
                        <Col />
                        <Col xs="12" md="8" className="d-flex justify-content-between border-bottom border-secondary align-items-center">
                            <span>Vision Score&nbsp;<Icon.TriangleHalf width={30} height={30} /></span> <span className="desc-data-stats">0</span>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="desc-data-row">
                        <Col />
                        <Col xs="12" md="8" className="d-flex justify-content-between border-bottom border-secondary align-items-center">
                            Achieved <span className="desc-data-stats">22</span>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="desc-data-row">
                        <Col />
                        <Col xs="12" md="8" className="d-flex mt-2 justify-content-between border-bottom border-secondary align-items-center">
                            Postponed <span className="desc-data-stats">1</span>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="desc-data-row">
                        <Col />
                        <Col xs="12" md="8"  className="d-flex mt-2 justify-content-between border-bottom border-secondary align-items-center">
                            Todo <span className="desc-data-stats">3</span>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="desc-data-row">
                        <Col />
                        <Col xs="12" md="8"  className="d-flex mt-2 justify-content-between border-bottom border-secondary">
                            Join&nbsp;Date <span className="desc-data-stats">6/15/2022</span>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="desc-data-row">
                        <Col />
                        <Col xs="12" md="8"  className="d-flex mt-2 justify-content-between border-bottom border-secondary">
                            Uploads<span className="desc-data-stats">0</span>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="desc-data-row mb-5">
                        <Col />
                        <Col xs="12" md="8"  className="d-flex mt-2 justify-content-between border-bottom border-secondary">
                            Privacy <span className="desc-data-stats">Public</span>
                        </Col>
                        <Col />
                    </Row>
                </Container>
            </>
        )
}