import { Container, Row, Col, Button, OverlayTrigger , Tooltip } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const renderUploadTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
       <h3>Upload Media</h3>
    </Tooltip>
  );

const renderEditTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h3>Settings</h3>
    </Tooltip>
);

const renderSettingsTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h3>Account Settings</h3>
    </Tooltip>
);

export default function MyProfileInfo({ fname, lname, bio, email, profilepic, setShowEdit, uploadModalShow, setUploadModalShow }) {
    return (
            <>
                <style type="text/css">
                {
                    `
                        .myprofileinfo-cont {
                                padding-top: 25px;
                                color: #aaaaaa;
                                padding-bottom: 30px;
                                background-color: rgba(100, 100, 100, 0.2);
                                min-height: 100px;
                                padding-left: 50px;
                                border-radius: 15px;
                        }
                        .name-col {
                            font-size: 4.5vh; 
                            font-weight: 500; 
                        }
                        .email-col, .bio-col {
                            font-size: 3vh; 
                            font-weight: 300; 
                        }
                        .bio-col {
                            font-size: 2vh; 

                        }
                        .edit-profile-btn {
                            font-weight: 300; 
                            font-size: 2vh;
                            background-color: transparent;
                            color: #ddddddd;
                            padding: 15px;
                            border-radius: 10px; 
                            max-width: 200px !important;
                            margin-left: 50px;
                            height: 100px;
                            outline: none; border: none;
                        }
                        .edit-profile-pencil:hover,
                        .edit-profile-pencil:active,
                        .edit-profile-pencil:focus,
                        .edit-profile-pencil:focus-visible {
                            color: #34dcbe;
                            filter: brightness(1.05);
                            cursor: pointer;
                            animation-name: adduploadanimation;
                            animation-duration: 0.5s; 
                        }
                        .action-buttons-col {
                            padding-right: 15px;
                            margin-top: 15px; 
                            margin-bottom: 15px;
                        }
                        .fname-lname-span {
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            margin-right: 20px;
                        }
                        .edit-profile-span {
                            display: flex; 
                            width: 30%;
                            justify-content: space-around;
                            align-items: center;
                        }
                    `
                }
                </style>
                <Container fluid className="myprofileinfo-cont">
                    <Row className="mb-1 pl-5 border-bottom border-secondary">
                        <Col xs="12" className="d-flex justify-content-between name-col">
                            <span className="fname-lname-span">{`${fname} ${lname}`}</span> 
                            <span className="edit-profile-span">
                                <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderUploadTooltip}
                                    >
                                        <Icon.CloudUploadFill className="edit-profile-pencil upload-cloud mr-2" width={"30px"} height={"30px"} onClick={() => setUploadModalShow(true)} />
                                </OverlayTrigger>
                                <span>&nbsp;</span>
                                <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderEditTooltip}
                                    >
                                        <Icon.GearFill className="edit-profile-pencil" width={"30px"} height={"30px"} onClick={() => setShowEdit(true)} />
                                </OverlayTrigger>
                            </span>
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col xs="12" sm="12" md="10" className="d-flex justify-content-left bio-col">
                            {`${bio}`}
                        </Col>
                    </Row>
                </Container>
            </>
        )
}