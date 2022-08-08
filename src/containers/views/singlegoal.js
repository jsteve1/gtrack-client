import { useEffect, useState } from 'react';
import { Offcanvas, Container, Row, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoal } from '../../app/features/goals/goalSlice';
import { useParams } from 'react-router-dom';
import mtn from '../../static/images/mtn.jpg';
import MarkCompleteModal from '../ui/markcompletemodal';
import SingleGoalContent from '../goals/singlegoalcontent';
import SingleGoalInfo from '../goals/singlegoalinfo';
import SingleGoalDesc from '../goals/singlegoaldesc';
import DeleteGoalModal from '../ui/deletemodal'; 
import EditGoal from '../goals/editgoal';
import SingleGoalActions from '../goals/singlegoalactions';

export default function SingleGoalView() {
    const { goalId } = useParams(); 
    const goal = useSelector(selectGoal(goalId));
    const [currentGoal, setCurrentGoal] = useState(goal || { id: "", media: [] });
    const [showEditGoal, setShowEditGoal] = useState(false);
    const [showDeleteGoal, setShowDeleteGoal] = useState(false);
    const [markCompleteModalShow, setMarkCompleteModalShow] = useState(false);
    const [uploadModalShow, setUploadModalShow] = useState(false); 
    useEffect(() => {
        if(goalId !== currentGoal.id) {
            setCurrentGoal(goal); 
        }
    }, [goal]);
    return (
        <>
            <style type="text/css">
            {
                `
                    .single-goal-cont {
                        text-align: center;
                        background-image: url("${mtn}");
                        background-repeat: no-repeat;
                        background-size: cover;
                        min-height: ${(goal.media.length > 0) ? "175vh" : "125vh" };
                        overflow-y: auto;
                    }
                    .single-goal-content-row {
                        margin-top: 75px;
                        margin-bottom: 0px;
                        max-height: 50vh;
                        min-width: 100vw; 
                        max-width: 1000px; 
                        overflow-y: hidden;
                    }
                    .single-goal-actions-row {
                    }
                `
            }
            </style>
            <Container fluid className="single-goal-cont">
                <Row className="single-goal-content-row">
                    <SingleGoalContent 
                        goal={currentGoal} 
                        setUploadModalShow={setUploadModalShow} 
                        uploadModalShow={uploadModalShow} />
                </Row>
                <Row className="single-goal-info-row">
                    <SingleGoalInfo 
                        goalid={goalId}  
                        setUploadModalShow={setUploadModalShow} 
                        uploadModalShow={uploadModalShow} 
                        setShowEdit={setShowEditGoal} 
                        openDeleteModal={setShowDeleteGoal} 
                        setMarkCompleteModalShow={setMarkCompleteModalShow}
                        />
                </Row>
                <Row className="single-goal-actions-row">
                    <SingleGoalActions goal={currentGoal} setShowEdit={setShowEditGoal} openDeleteModal={setShowDeleteGoal} />
                </Row>
                <Row className="single-goal-desc-row">
                    <SingleGoalDesc goal={currentGoal} />
                </Row>
            </Container>
            <EditGoal
                show={showEditGoal}
                setShow={setShowEditGoal}
                editGoalId={currentGoal.id}
                showDeleteGoal={showDeleteGoal}
                setShowDeleteGoal={setShowDeleteGoal}
                setMarkCompleteModalShow={setMarkCompleteModalShow} 
            />
            <MarkCompleteModal
                 markCompleteModalShow={markCompleteModalShow}
                 setMarkCompleteModalShow={setMarkCompleteModalShow}
                 setShowEditGoal={setShowEditGoal}
                 id={currentGoal.id}
            />
            <DeleteGoalModal 
                id={currentGoal.id}
                deleteModalShow={showDeleteGoal} 
                setDeleteModalShow={setShowDeleteGoal} />
        </>
    )
}