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
export default function MyProfileView() {
    const _profile = useSelector(profile);
    const [showEdit, setShowEdit] = useState(false);
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
                            margin-top: 90px;
                            margin-bottom: 0px;
                            background-color: rgba(20, 20, 20, 0.5);
                            min-height: 200px;
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
                        <MyProfileContent />
                    </Row>
                    <Row className="profile-main-row">
                        <MyProfileInfo fname={_profile.fname} lname={_profile.lname} email={_profile.email} bio={_profile.bio} />
                    </Row>
                    <Row className="profile-actions-row">
                        <MyProfileActions setShowEdit={setShowEdit} />
                    </Row>
                    <Row className="profile-desc-row">
                        <MyProfileDesc />
                    </Row>
                </Container>
                <EditProfile show={showEdit} setShow={setShowEdit} placement={"end"} />
            </>
        )
}