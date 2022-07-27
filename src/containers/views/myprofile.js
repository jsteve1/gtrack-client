import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { useState } from 'react';
import MyProfileActions from '../myprofile/myprofileactions';
import MyProfileDesc from '../myprofile/myprofiledesc';
import MyProfileInfo from '../myprofile/myprofileinfo';
import EditProfile from '../myprofile/editprofile';
import mtn from '../../static/images/mtn.jpg';
import { useSelector } from 'react-redux';
import { profile } from '../../app/features/users/userSlice';
import MyProfileContent from '../myprofile/myprofilecontent';
export default function MyProfileView({ setStartingSortState }) {
    const _profile = useSelector(profile);
    const [showEdit, setShowEdit] = useState(false);
    const [uploadModalShow, setUploadModalShow] = useState(false);
    return (
            <>
                <style type="text/css">
                {
                    `
                        .myprofile-cont {
                            text-align: center;
                            background-image: url("${mtn}");
                            background-repeat: no-repeat;
                            background-size: cover;
                            min-height: 120vh;
                            overflow-y: auto;
                        }
                        .profile-main-row {

                        }
                        .profile-desc-row {

                        }
                        .profile-actions-row {

                        }
                        .profile-content {
                            margin-top: 75px;
                            margin-bottom: 0px;
                            max-height: 50vh;
                            min-width: 100vw; 
                            max-width: 1000px; 
                            overflow-y: hidden;
                        }
                    `
                }
                </style>
                <Container fluid className="myprofile-cont">
                    <Row className="profile-content">
                        <MyProfileContent uploadModalShow={uploadModalShow} setUploadModalShow={setUploadModalShow} />
                    </Row>
                    <Row className="profile-main-row">
                        <Col />
                        <Col xs="12" sm="10" md="8">
                            <MyProfileInfo setShowEdit={setShowEdit} uploadModalShow={uploadModalShow} setUploadModalShow={setUploadModalShow} fname={_profile.fname} lname={_profile.lname} email={_profile.email} bio={_profile.bio} />
                        </Col>
                        <Col />
                    </Row>
                    <Row className="profile-desc-row">
                        <Col />
                            <Col  xs="10" sm="10" md="8">
                                <MyProfileDesc />
                            </Col>
                        <Col />
                    </Row>
                </Container>
                <EditProfile show={showEdit} setShow={setShowEdit} placement={"bottom"} />
            </>
        )
}