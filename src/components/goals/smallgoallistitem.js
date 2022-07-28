import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
export default function SmallGoalListItem({ name, deadline, priority, lastOne, id }) {
    const navigate = useNavigate();
    return (
        <>
        <style type="text/css">
        {
            `
                .small-goal-list-item {
                    min-height: 100px;
                    cursor: pointer;
                    transition: all ease 0.15s;
                }
                .small-goal-list-item:hover {
                    transform: scale(1.01);
                    box-shadow: #aaaaaa 0px 0px 5px 1px;
                    background-color: rgba(100, 100, 100, 0.6);
                }
                .small-goal-list-item-name {
                    font-size: 22pt;
                    font-weight: 500;
                    color: #34dcbe;
                }
                .small-goal-list-item-deadline {
                    font-size: 18pt;
                }
                .sub-text-small-goal  {
                    font-weight: 100;
                    font-size: 15pt;
                    padding-left: 25px;
                }
                .priority-list-item-span {
                    color: #dddddd;
                    display: inline-block; 
                    margin-right: 15px;
                }
            `
        }
        </style>
        <Container fluid className={`small-goal-list-item ${lastOne ? "" : "border-bottom border-secondary"}`}  onClick={(e) => { e.preventDefault(); navigate(`/app/goal/${id}`); }}>
            <Row>
                <Col className="small-goal-list-item-name d-flex justify-content-start pt-2" xs='10'>
                    <span className="priority-list-item-span">{`${priority}  `}</span>{name}
                </Col>
                <Col className="small-goal-list-item-deadline d-flex justify-content-end pt-2 align-items-center" xs="2">
                    <Icon.ThreeDotsVertical className="icon-person-top-nav" width={30} height={30} onClick={(e) => { e.preventDefault(); navigate('/app/goals/'); }} />
                </Col>
            </Row>
            <Row>
                <Col className="sub-text-small-goal d-flex justify-content-start pt-2" xs='10'>                   
                    {`Deadline:   ${deadline}`}
                </Col>
            </Row>
        </Container>
        </>
    )
}

const CustomGoalItemDropdown = forwardRef(( { onClick }, ref) => (
    <>
    <style type="text/css">
        {
            `
                .icon-person-top-nav {
                    cursor: pointer;
                    color: #34aaaa;
                }
                .icon-person-top-nav:hover {
                    transform: scale(1.05); 
                    color: #34dcbe;
                }
            `
        }
    </style>
    <span
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        className="icon-person-top-nav"
    >
    </span>
  </>
));