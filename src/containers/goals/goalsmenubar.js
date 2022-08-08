import  { useSelector } from 'react-redux';
import { selectGoals } from '../../app/features/goals/goalSlice';
import { Container, Row, Col, OverlayTrigger, Tooltip, Button } from 'react-bootstrap'; 
import * as Icon from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { setListMode } from '../../app/features/users/userSlice';
import { setShowNewGoal } from '../../app/features/ui/uiSlice';

const renderTimelineTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
       <h5>Show Timeline View</h5>
    </Tooltip>
);
const renderListTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h5>Show List View</h5>
    </Tooltip>
);

const renderShowCompletedTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h5>Show Completed Tasks</h5>
    </Tooltip>
);

const renderShowGridViewTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <h5>Show Grid View</h5>
    </Tooltip>
);

export default function GoalsListMenuBar({ showTimeline, showGridView, setShowTimeline, setShowGridView }) {   
    const goals = useSelector(selectGoals); 
    const dispatch = useDispatch();
    const showGoalsList = (showTimeline === false && showGridView === false);
    const handleShowListClick = () => {
        dispatch(setListMode("list"));
    }
    const handleShowGridClick = () => {
        dispatch(setListMode("grid"));
    }
    const handleNewGoalSelected = () => {
        dispatch(setShowNewGoal(true));
    }
    return (
        <>
        <style type="text/css">
        {
            `
                .goals-list-menubar {
                    margin-top: 85px;
                    color: white;
                    background-color: rgba(120,120,120,0.03);
                    padding: 15px; 

                }
                .menu-bar-title {
                    color: #34aaaa; 
                    font-size: 25pt;
                    font-weight: 300;
                    text-align: left;
                }
                .menu-bar-icon {
                    margin-left: 100px;
                    color: #aaaaaa;
                }
                .menu-bar-icon:hover,
                .menu-bar-icon:active,                
                .menu-bar-icon:focus,
                .menu-bar-icon:focus-visible {
                    color: #34dcbe !important;
                    filter: brightness(1.05);
                    cursor: pointer;
                    animation-name: icon-animation;
                    animation-duration: 0.5s; 
                }
                @keyframes icon-animation {
                    0%   {transform: scale(1.0); }
                    50%  {transform: scale(1.1); }
                    100% {transform: scale(1.0); }
                }
                @media only screen and (max-width: 1080px) {
                    .menu-bar-icon {
                        margin-left: 20px;
                    }
                }
                .add-goal-icon {

                }
            `
        }
        </style>
        <Container fluid className="goals-list-menubar border-bottom border-secondary">
            <Row>
                <Col className="menu-bar-title justify-content-start align-items-center d-flex" xs="5">
                    Goals 
                    <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip><h5>New Goal</h5></Tooltip>}
                     
                            >
                        <Icon.PlusCircle onClick={() => handleNewGoalSelected() } width={40} height={40} color={"#34aaaa"} className="menu-bar-icon add-goal-icon" />
                    </OverlayTrigger>
                </Col>
                <Col xs="7" className="d-flex justify-content-end align-items-center">
                    <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderListTooltip}
                            >
                        <Icon.ListOl width={40} height={40} color={(showGoalsList) ? "#34dcbe" : "#aaaaaa"} className="menu-bar-icon" onClick={handleShowListClick} />
                    </OverlayTrigger>
                    <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderShowGridViewTooltip}
                            >
                        <Icon.Grid width={30} height={30} color={(showGridView) ? "#34dcbe" : "#aaaaaa"} className="menu-bar-icon" onClick={handleShowGridClick} />
                    </OverlayTrigger>
                </Col>
            </Row>
        </Container>
        </>
    )
}