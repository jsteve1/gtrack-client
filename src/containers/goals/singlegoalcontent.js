import {Container, Row, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'; 
import { forwardRef, useEffect, useState, useRef } from 'react';
import { ImageTile } from '../myprofile/myprofilecontent';
import UploadModal from '../ui/uploadmodal';
import { addUpload, setMediaIndex, setMainPicIndex, removePicIndex, selectGoal } from '../../app/features/goals/goalSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SingleGoalContent({ goal,  uploadModalShow, setUploadModalShow }) {
    const currGoal = useSelector(selectGoal(goal.id));
    const dispatch = useDispatch();
    const [myPics, setMyPics] = useState([]);
    const [mainPic, setMainPic] = useState(null);
    const [, updateState] = useState();
    const [overallWidth, setOverallWidth] = useState({});
    const [widerThanScreen, setWiderThanScreen] = useState(false);
    const [widthListener, setWidthListener] = useState(false);
    const setIndex = (index, newIndex) => {
        dispatch(setMediaIndex({ id: goal.id, index: index, newIndex: newIndex }));
        updateState();
    }
    const _setMainPicIndex = (index) => {
        dispatch(setMainPicIndex({ id: goal.id, index: index }));
        updateState();
    }
    const processImgFile = (file) => {
        const img = URL.createObjectURL(file); 
        console.info("Image added to pic library on client"); 
        setMyPics( [ ...myPics, img ] );
        dispatch(addUpload({ id: goal.id, img: img }));
    }
    const removeImg = (index) => {
        dispatch(removePicIndex({ id: currGoal.id, index: index })); 
        updateState();
    }
    useEffect(() => {
        setMyPics([]);
        setMainPic([]);
    }, []);

    useEffect(() => {
        setMyPics([]);
        const fetchPics = async () => {
            if(myPics.length !== 0 && 
                goal.mainpic !== "") {
                 for(let i = 0; i < goal.media.length || i < 10 ; i++) {
                     const result = await fetch(`${process.env.REACT_APP_APP_DOMAIN}/api/upload/${goal.media[i]}`, {
                         method: "GET",
                     });
                     const binary = await result.blob();
                     const img = URL.createObjectURL(binary);
                     if(goal.media[i] === goal.mainpic) {
                         console.info("Main pic fetched and set");
                         setMainPic(img);
                     } else {
                        console.info("My Pics Library fetched and set"); 
                        setMyPics( [ img, ...myPics, ] );
                     }
                 }
                }    
        }
        fetchPics();
    }, [currGoal.mainpic]);

    useEffect(() => {
        setMyPics(currGoal.media); 
        if(currGoal.media.length < 1)
            setOverallWidth({});
    }, [currGoal.media]);

    useEffect(() => {
        const handleChange = () => {
            const width = window.innerWidth; 
            let totalWidth = 0;
            for(let key in overallWidth) {
                if(overallWidth[key] > 0) {
                    totalWidth += overallWidth[key];
                }
            }
            setWiderThanScreen(totalWidth > width);
        }
        handleChange();
        if(!widthListener)
            window.addEventListener('resize', handleChange, false); 
        return window.removeEventListener('resize', null);
    }, [currGoal.media.length, overallWidth]);

    return (
        <>
            <style type="text/css">
            {
                `
                    @keyframes adduploadanimation {
                        0%   {transform: scale(1.0); }
                        50%  {transform: scale(1.1); }
                        100% {transform: scale(1.0); }
                    }
                    .profile-pic {
                        width: 100%;
                        max-width: 325px;
                        min-height: 300px;
                        background-color: transparent;
                        border-radius: 5px;
                    }
                    .profile-top-goal {
                        width: 100%;
                        max-width: 250px;
                        min-height: 250px;
                    }
                    .col-content {
                        padding: 10px;
                    }
                    .profile-pic-add:hover,
                    .profile-pic-add:active,
                    .profile-pic-add:focus,
                    .profile-pic-add:focus-visible {
                        color: #34dcbe;
                        filter: brightness(1.05);
                        cursor: pointer;
                        animation-name: adduploadanimation;
                        animation-duration: 0.5s; 
                    }
                    .profile-pic-add {
                        color: #34a9be;
                        align-self: center;
                        margin-left: 45vw;
                    }
                    .main-img-profile {
                        max-height: 350px;
                        max-height: 350px;
                        width:auto;
                        height:auto;
                        margin-left: -20px;
                        cursor: pointer;
                    }
                    .main-img-profile:hover {
                        transform: scale(1.02); 
                        filter: brightness(1.15);
                    }
                    .main-img-profile:active,
                    .main-img-profile:focus,
                    .main-img-profile:focus-visible {
                        border: 5px solid #dddddd;
                        border-radius: 10px;
                    }
                    .images-list {
                        background-color: rgba(0, 0, 0, 0.1);
                        ${(currGoal.media.length === 0) ? "min-height: 0px !important; height: 50px !important; justify-content: center; background-color: transparent;" : "" }
                        ${(currGoal.media.length === 1 || !widerThanScreen) ? "justify-content: center;" : "padding-left: 15px; justify-content: start;" }
                        width: 100vw;
                        min-height: 350px;
                        max-height: 350px;
                        overflow-x: auto;
                        overflow-y: hidden;
                        display: flex;
                    }
                    .images-list::-webkit-scrollbar-track {
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                        border-radius: 10px;
                        background-color: #191919;
                    }
                    .images-list::-webkit-scrollbar {
                        width: 12px;
                        background-color: #191919;
                    }
                    .images-list::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                        background-color: #353535;
                    }
                    .selected-image {
                        border: 3px solid #34dcbe; 
                        filter: brightness(1.05);
                    }
                    .main-image {
                        border: 3px solid #34dcbe;
                    }
                    .img-dropdown {
                        margin-top: 0px;
                    }
                    .menu-dropdown-img {

                    }
                    .menu-dropdown-img,
                    .menu-dropdown-img * {
                        background-color: #191919;
                        color: #34dcbe;
                    }
                    .icon-dropdown-img {
                        background-color: transparent;
                        margin-right: 5px;
                    }
                    .upload-actions {
                        margin-top: 10px; 
                        margin-bottom: 10px;
                        padding-right: 35px;
                    }
                    `
            }
            </style>
            <div className="images-list">
                {
                    (currGoal.media.length !== 0) ? 
                    (
                        <>
                            {                       
                                currGoal.media.map((pic, index) => {                      
                                    return <ImageTile maxLength={currGoal.media.length} overallWidth={overallWidth} setOverallWidth={setOverallWidth} removeImg={removeImg} key={`${index}-img-key`} pic={pic} index={index} setIndex={setIndex} setMainPic={_setMainPicIndex} />
                                })
                            }
                        </>
                    )
                    : ""
                }
            </div>
            <UploadModal setUploadModalShow={setUploadModalShow} uploadModalShow={uploadModalShow} handleFileChange={(file) => processImgFile(file) }/>
        </>
        )
}