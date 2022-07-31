import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectGoal, selectGoalProgressMarkers } from '../../app/features/goals/goalSlice';
import { getDeadlineFormatted } from '../../components/goals/goallistitem';
import ProgressMarker from '../../components/goals/progressmarker';
export default function SingleGoalDesc({ goal }) {
    const progressMarkers = useSelector(selectGoalProgressMarkers(goal.id));
    const dispatch = useDispatch();
    const [_markers, setMarkers] = useState([]);
    const newProgressMarker = () => {
        if(Array.isArray(_markers) && _markers.length > 0 && _markers[0].newmarker === true) {
            return;
        }
        setMarkers([{ name: "", deadline: getDeadlineFormatted(Date.now()), goalid: goal.id, completed: false, newmarker: true }, ..._markers])
    }
    const submitNewMarker = () => {

    }
    useEffect(() => {
        if(Array.isArray(progressMarkers) && progressMarkers.length > 0 &&
            JSON.parse(JSON.stringify(_markers)) !== JSON.stringify(progressMarkers))
                setMarkers(progressMarkers);
    }, [progressMarkers]);
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
                        .add-prg-mrk {
                            margin-left: 15px;
                            transition: all ease 0.2s;
                            cursor: pointer;
                        }
                        .add-prg-mrk:hover, 
                        .add-prg-mrk:active, 
                        .add-prg-mrk:focus, 
                        .add-prg-mrk:focus-visible {
                            color: #34aaaa;
                            transform: scale(1.05);
                        }
                    `
                }
                </style>
                <Container fluid className="myprofiledesc-cont pt-3 pb-3">
                    <Row className="desc-data-row">
                        <Col />
                        <Col xs="10" className="d-flex justify-content-start border-bottom border-secondary align-items-center">
                            Progress Markers<Icon.Plus width={50} height={50} className="add-prg-mrk" onClick={() => newProgressMarker()}/>
                        </Col>
                        <Col />
                    </Row>
                    <Row>
                    <Col />
                        <Col xs="10" className="d-flex flex-wrap">
                        {
                        (_markers.length > 0) ? _markers.map(pm => {
                                                    return (
                                                        <ProgressMarker marker={pm} markers={_markers} setMarkers={setMarkers} />
                                                    )
                                                }) : ""
                        }
                    </Col>
                    <Col />
                    </Row>
                </Container>
            </>
        )
}