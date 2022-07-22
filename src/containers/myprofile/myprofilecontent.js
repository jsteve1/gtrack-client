import { Container, Row, Col, Button, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { profile, addUpload, setMediaIndex, setMainPicIndex, removePicIndex } from '../../app/features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import React, { forwardRef, useEffect, useState, useRef } from 'react';
import UploadModal from '../ui/uploadmodal';

const ImageTile = ({ pic, index, setIndex, setMainPic, removeImg, overallWidth, setOverallWidth }) => {
    const [show, setShow] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        if(dropdownRef.current !== null && dropdownRef.current.offsetWidth !== overallWidth[index] && dropdownRef.current.offsetWidth > 0) {
            const newWidth = JSON.parse(JSON.stringify(overallWidth));
            newWidth[index] = dropdownRef.current.offsetWidth;
            setOverallWidth(newWidth); 
        }
    }, [dropdownRef.current?.offsetWidth]);
    if(pic !== "") {
        return (<>
        <Dropdown ref={dropdownRef} align="end" drop="left" variant="dark" className="img-dropdown">
            <Dropdown.Toggle className="img-dropdown" as={ forwardRef(({ children, onClick }, ref) => {
                                        const [selected, setSelected] = useState(false);
                                        const dispatch = useDispatch();                                      
                                        return (<img ref={ref} className={(selected) ? "main-img-profile selected-image" : "main-img-profile"} 
                                                    src={`${pic}`} 
                                                    alt="profile img"                                                  
                                                    onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelected(!selected);
                                                            onClick(e);
                                                        }} />)
                                        })}>
            </Dropdown.Toggle>
            <Dropdown.Menu flip={false} className="menu-dropdown-img">
                <Dropdown.Item eventKey="1" onClick={() => setMainPic(index)} ><Icon.StarFill color={"#34dcbe"} className="icon-dropdown-img" />Make Main Pic</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => setIndex(index, index - 1)}><Icon.ArrowLeft color={"#34dcbe"} className="icon-dropdown-img" /> Move Left</Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={() => setIndex(index, index + 1)}><Icon.ArrowRight color={"#34dcbe"} className="icon-dropdown-img" /> Move Right</Dropdown.Item>
                <Dropdown.Item eventKey="4" onClick={() => removeImg(index)}><Icon.Trash2Fill  color={"#34dcbe"} className="icon-dropdown-img" />Delete Image</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </>)
    } else return "";
}

export default function MyProfileContent({ uploadModalShow, setUploadModalShow }) {
    const dispatch = useDispatch();
    const myprofile = useSelector(profile); 
    const [myPics, setMyPics] = useState([]);
    const [mainPic, setMainPic] = useState(null);
    const [, updateState] = useState();
    const [overallWidth, setOverallWidth] = useState({});
    const [widerThanScreen, setWiderThanScreen] = useState(false);
    const [widthListener, setWidthListener] = useState(false);
    const setIndex = (index, newIndex) => {
        dispatch(setMediaIndex({ index: index, newIndex: newIndex }));
        updateState();
    }
    const _setMainPicIndex = (index) => {
        dispatch(setMainPicIndex({ index: index }));
        updateState();
    }
    const processImgFile = (file) => {
        const img = URL.createObjectURL(file); 
        console.info("Image added to pic library on client"); 
        setMyPics( [ ...myPics, img ] );
        dispatch(addUpload(img));
    }
    const removeImg = (index) => {
        dispatch(removePicIndex({ index: index })); 
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
                myprofile.mainpic !== "") {
                 for(let i = 0; i < myprofile.media.length || i < 10 ; i++) {
                     const result = await fetch(`${process.env.REACT_APP_APP_DOMAIN}/api/upload/${myprofile.media[i]}`, {
                         method: "GET",
                     });
                     const binary = await result.blob();
                     const img = URL.createObjectURL(binary);
                     if(myprofile.media[i] === myprofile.mainpic) {
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
    }, [myprofile.mainpic]);
    useEffect(() => {
        setMyPics(myprofile.media); 
        if(myprofile.media.length < 1)
            setOverallWidth({});
    }, [myprofile.media]);
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
    }, [myprofile.media.length, overallWidth])
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
                            ${(myprofile.media.length === 0) ? "min-height: 0px !important; height: 50px !important; justify-content: center;" : "" }
                            ${(myprofile.media.length === 1 || !widerThanScreen) ? "justify-content: center;" : "padding-left: 50px; justify-content: start;" }
                            width: 100vw;
                            min-height: 350px;
                            max-height: 350px;
                            overflow-x: auto;
                            overflow-y: hidden;
                            display: flex;
                            background-color: rgba(100, 100, 100, 0.2);
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
                        (myprofile.mainpic !== "" && myprofile.media.length !== 0) ? 
                        (
                            <>
                                {                       
                                    myprofile.media.map((pic, index) => {                      
                                        return <ImageTile overallWidth={overallWidth} setOverallWidth={setOverallWidth} removeImg={removeImg} key={`${index}-img-key`} pic={pic} index={index} setIndex={setIndex} setMainPic={_setMainPicIndex} />
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
// <div className="profile-pic-add">
// </div>