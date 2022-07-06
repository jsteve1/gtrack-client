import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
export default function OtherUserListItem({ id, name, currentGoal, goalsAchieved }) {
    return (
        <>
        <style type="text/css">
        {
            `
                .other-user-list-item {
                    min-height: 100px;
                    cursor: pointer;
                    transition: all ease 0.15s;
                }
                .other-user-list-item:hover {
                    transform: scale(1.01);
                    box-shadow: #aaaaaa 0px 0px 5px 1px;
                    background-color: rgba(100, 100, 100, 0.6);
                }
                .other-user-list-item-name {
                    font-size: 22pt;
                    font-weight: 500;
                    color: #34dcbe;
                }
                .other-user-list-item-deadline {
                    font-size: 18pt;
                }
                .sub-text-other-user  {
                    font-weight: 100;
                    font-size: 15pt;
                    padding-left: 25px;
                }
                .profile-pic-other-user-list-item {
                    height: 40px; 
                    width: 40px; 
                    background-color: transparent;
                    border-radius: 20px;
                    margin-right: 15px;
                }
            `
        }
        </style>
        <Container fluid className="other-user-list-item border-bottom border-secondary">
            <Row>
                <Col className="other-user-list-item-name d-flex justify-content-start pt-2" xs='10'>
                    <div className="profile-pic-other-user-list-item">
                        <Icon.PersonCircle height={40} width={40} />
                    </div>
                    {name}
                </Col>
            </Row>
            <Row>
                <Col className="sub-text-other-user d-flex justify-content-start pt-2" xs='10'>                   
                    {`Current Goal: ${currentGoal} | Goals Achieved: ${goalsAchieved}`}
                </Col>
            </Row>
        </Container>
        </>
    )
}
