import { Container, Row, Col, Button, OverlayTrigger , Tooltip } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const renderUploadTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
       <h3>Upload Media</h3>
    </Tooltip>
  );

const renderEditTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h3>Edit Profile</h3>
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
                                color: #aaaaaa;
                                padding-bottom: 15px;
                                background-color: rgba(100, 100, 100, 0.2);
                                min-height: 100px;
                                padding-left: 50px;
                        }
                        .name-col {
                            font-size: 7vh; 
                            font-weight: 500; 
                        }
                        .email-col, .bio-col {
                            font-size: 3vh; 
                            font-weight: 300; 
                        }
                        .bio-col {
                            font-size: 2vh; 

                        }
                        .name-col,
                        .email-col,
                        .bio-col {
                            margin-left: 15vw;
                        }

                        @media only screen and (max-width: 550px) {
                            .name-col,
                            .email-col,
                            .bio-col {
                                margin-left: 5vw;
                            }
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
                        .profile-pic-add {
                            color: #34a9be;
                            align-self: center;
                        }
                        .action-buttons-col {
                            padding-right: 15px;
                            margin-top: 15px; 
                            margin-bottom: 15px;
                        }
                    `
                }
                </style>
                <Container fluid className="border-top border-secondary myprofileinfo-cont">
                    <Row className="mb-1 pl-5 border-bottom border-secondary">
                        <Col xs="9" sm="8" className="d-flex justify-content-start name-col">
                            {`${fname} ${lname}`}
                        </Col>
                        <Col className="d-flex align-items-center justify-content-around action-buttons-col">
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderUploadTooltip}
                            >
                                <Icon.PlusCircleFill className="profile-pic-add" width={50} height={50} onClick={() => setUploadModalShow(true)} />
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderEditTooltip}
                            >
                                <Icon.PencilFill className="profile-pic-add" width={50} height={50} onClick={() => setShowEdit(true)} />
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderSettingsTooltip}
                            >
                                <Icon.GearFill className="profile-pic-add" width={50} height={50} onClick={() => setShowEdit(true)} />
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col xs="9" sm="8" className="d-flex justify-content-start email-col">
                            {`${email}`}
                        </Col>
                        <Col />
                    </Row>
                    <Row className="mb-1">
                        <Col xs="9" sm="8" className="d-flex justify-content-start bio-col">
                            {`${bio}`}
                        </Col>
                        <Col />
                    </Row>
                </Container>
            </>
        )
}