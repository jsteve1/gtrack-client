import { Container, Row, Col } from 'react-bootstrap'; 
import GoalsTimeline from '../goals/goalstimeline';
import GoalsList from '../goals/goalslist';
import GoalsListMenuBar from '../goals/goalsmenubar';
import mtn from '../../static/images/mtn.jpg';
import  { useState } from 'react';
import GoalsGrid from '../goals/goalsgrid'; 
import GoalsCompleted from '../goals/goalscompleted'; 
import EditGoal from '../goals/editgoal';
import NewGoal from '../goals/newgoal';
import DeleteGoalModal from '../ui/DeleteModal';
import * as Icon from 'react-bootstrap-icons';
import MarkCompleteModal from '../ui/markcompletemodal';
import { selectListMode } from '../../app/features/users/userSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function GoalsListView({ startingSortState }) {
    const listMode = useSelector(selectListMode); 
    const [showTimeline, setShowTimeline] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const [showGridView , setShowGridView] = useState(false);
    const [showNewGoal, setShowNewGoal] = useState(false);
    const [showEditGoal, setShowEditGoal] = useState(false);
    const [editGoalId, setShowEditGoalId] = useState("");
    const [showDeleteGoal, setShowDeleteGoal] = useState(false);
    const [deleteId, setDeleteId] = useState(""); 
    const [markCompleteId, setMarkCompleteId] = useState("");
    const [markCompleteModalShow, setMarkCompleteModalShow] = useState(false);
    const openDeleteModal = (id) => {
        setShowDeleteGoal(true);
        setDeleteId(id); 
    }
    useEffect(() => {
        if(listMode === "grid") {
            setShowGridView(true);
            setShowEditGoal(false);
            setShowCompleted(false);
        }
        if(listMode === "list") {
            setShowGridView(false);
            setShowEditGoal(false);
            setShowCompleted(false);
        }
    }, [listMode]);
    return (
            <>
                <style type="text/css">
                    {
                        `
                            .goals-list-cont {
                                    text-align: center;
                                    background-image: url("${mtn}");
                                    background-repeat: no-repeat;
                                    background-size: cover;
                                    min-height: 100vh;
                                    overflow-y: auto;
                            }
                        `
                    }
                </style>
                <Container fluid className="goals-list-cont">
                    <Row className="pr-5 pl-5">
                        <GoalsListMenuBar 
                        showNewGoal={showNewGoal} 
                        setShowNewGoal={setShowNewGoal} 
                        showTimeline={showTimeline} 
                        showGridView={showGridView} 
                        showCompleted={showCompleted}  
                        etShowTimeline={setShowTimeline} 
                        setShowCompleted={setShowCompleted} 
                        setShowGridView={setShowGridView}
                        
                        />
                    </Row>
                    <Row className="pr-5 pl-5">
                    {   
                        (showTimeline) ?  <GoalsTimeline 
                                            openDeleteModal={openDeleteModal} 
                                            showEditGoal={showEditGoal} 
                                            setShowEditGoal={setShowEditGoal} /> : <>
                        {
                            (showGridView) ? <GoalsGrid 
                                                setMarkCompleteModalShow={setMarkCompleteModalShow} 
                                                setMarkCompleteId={setMarkCompleteId} 
                                                startingSortState={startingSortState} 
                                                openDeleteModal={openDeleteModal}  
                                                showEditGoal={showEditGoal}
                                                setShowEditGoal={setShowEditGoal} 
                                                setShowEditGoalId={setShowEditGoalId} /> : <>
                                {
                                    <GoalsList 
                                        setMarkCompleteModalShow={setMarkCompleteModalShow} 
                                        setMarkCompleteId={setMarkCompleteId} 
                                        startingSortState={startingSortState} 
                                        openDeleteModal={openDeleteModal} 
                                        showEditGoal={showEditGoal} 
                                        setShowEditGoal={setShowEditGoal} 
                                        setShowEditGoalId={setShowEditGoalId} />
                                }
                                </>                          
                        }
                        </>
                    }
                    </Row>
                </Container>
                <DeleteGoalModal 
                    id={deleteId}
                    deleteModalShow={showDeleteGoal} 
                    setDeleteModalShow={setShowDeleteGoal} />
                <MarkCompleteModal 
                    id={markCompleteId} 
                    markCompleteModalShow={markCompleteModalShow} 
                    setMarkCompleteModalShow={setMarkCompleteModalShow} 
                    setShowEditGoal={setShowEditGoal}
                    setShowEditGoalId={setShowEditGoalId} />
                <EditGoal 
                    show={showEditGoal} 
                    setShow={setShowEditGoal} 
                    editGoalId={editGoalId} />
                <NewGoal 
                    show={showNewGoal} 
                    setShow={setShowNewGoal} />
            </>
        )
}