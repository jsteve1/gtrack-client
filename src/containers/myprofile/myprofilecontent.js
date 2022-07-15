import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { profile, addUpload, setMediaIndex, setMainPicIndex } from '../../app/features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import React, { forwardRef, useEffect, useState } from 'react';
import UploadModal from '../ui/uploadmodal';

const ImageTile = ({ pic, index, setIndex, setMainPic }) => {
    const [show, setShow] = useState(false);
    if(pic !== "") {
        return (<>
        <Dropdown align="end" drop="left" variant="dark" className="img-dropdown">
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
            </Dropdown.Menu>
        </Dropdown>
        </>)
    } else return "";
}

export default function MyProfileContent({  }) {
    const dispatch = useDispatch();
    const myprofile = useSelector(profile); 
    const [myPics, setMyPics] = useState([]);
    const [mainPic, setMainPic] = useState(null);
    const [uploadModalShow, setUploadModalShow] = useState(false);
    const [, updateState] = useState();
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
    }, [myprofile.media])
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
                        .profile-pic-add {
                            color: #34a9be;
                            position: absolute;
                            left: 79%;
                            top: 41vh;
                            border-radius: 50px; 
                            box-shadow: 1px 1px 2px 2px #222222;
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
                            width: 100vw;
                            min-height: 350px;
                            max-height: 350px;
                            overflow-x: auto;
                            overflow-y: hidden;
                            display: flex;
                            justify-content: start;
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
                            margin-top: -70px;
                            margin-left: 15px; 
                            margin-right: 15px;
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
                        `
                }
                </style>
                <div className="images-list">
                    {
                        (myprofile.mainpic !== "") ? 
                        (
                            <>
                                {                       
                                    myprofile.media.map((pic, index) => {                      
                                        return <ImageTile key={`${index}-img-key`} pic={pic} index={index} setIndex={setIndex} setMainPic={_setMainPicIndex} />
                                    })
                                }
                            </>
                        )
                        :  ""
                    }
                    <Icon.PlusCircleFill className="profile-pic-add" width={75} height={75} onClick={() => setUploadModalShow(true)} />
                </div>
                <UploadModal setUploadModalShow={setUploadModalShow} uploadModalShow={uploadModalShow} handleFileChange={(file) => processImgFile(file) }/>
            </>
        )
}
// <div className="profile-pic-add">
// </div>