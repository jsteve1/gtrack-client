import { useState } from 'react';
import { useDispatch } from "react-redux";
import { Row, Col, Button, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getDeadlineFormatted } from './goallistitem';
import * as Icon from 'react-bootstrap-icons';

export default function ProgressMarker({ marker }){
    const [editable, setEditable] = useState(false); 
    const dispatch = useDispatch();
    return (
        <>
            <style typew="text/css">
                {
                    `
                        .progress-marker {
                            max-width: 250px; 
                            height: 200px;
                            background-color: rgba(100,100,100,0.2);
                            cursor: pointer;
                            margin: 10px;
                        }
                        .progress-marker:hover {
                            background-color: rgba(100, 100, 100, 0.3);
                        }
                        .mark-complete-button:hover,
                        .mark-complete-button:active,
                        .mark-complete-button:focus,
                        .mark-complete-button:focus-visible {
                            color: #34dcbe;
                            filter: brightness(1.05);
                            cursor: pointer;
                            animation-name: growshrink;
                            animation-duration: 0.5s; 
                        }
                        
                        @keyframes growshrink {
                            0%   {transform: scale(1.0); }
                            50%  {transform: scale(1.02); }
                            100% {transform: scale(1.0); }
                        }
                        .marker-name {
                            height: 40px;
                            font-size: 16pt;
                        }
                        .marker-name {
                            height: 40px;
                            font-size: 16pt;
                        }
                    `
                }
            </style>
            <Container className="progress-marker pt-3">
                <Row className="marker-name">
                    {marker.name}
                </Row>
                <Row className="marker-name">
                    Deadline: {getDeadlineFormatted(marker.deadline)}
                </Row>
                <Row>
                    <Col xs="6" className="d-flex justify-content-end mt-5">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip><h4>Mark Complete</h4></Tooltip>}
                        >
                        <Icon.CheckCircleFill width={40} height={40} color={"#999999"} className="mark-complete-button" onClick={() => {  }} />
                        </OverlayTrigger>
                    </Col>
                    <Col xs="6" className="d-flex justify-content-end mt-5" >
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip><h4>Delete</h4></Tooltip>}
                        >
                        <Icon.Trash width={40} height={40} color={"#999999"} className="mark-complete-button" onClick={() => {  }} />
                        </OverlayTrigger>
                    </Col>
                </Row>
            </Container>
        </>
    );
}