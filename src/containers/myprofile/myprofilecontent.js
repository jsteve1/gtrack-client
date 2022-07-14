import { Container, Row, Col, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { profile, addUpload } from '../../app/features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import UploadModal from '../ui/uploadmodal';

export default function MyProfileContent({  }) {
    const dispatch = useDispatch();
    const myprofile = useSelector(profile); 
    const [myPics, setMyPics] = useState([]);
    const [mainPic, setMainPic] = useState(null);
    const [uploadModalShow, setUploadModalShow] = useState(false);
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
                            color: #34dcbe;
                            position: absolute;
                            left: 85%;
                            top: 340px;
                            text-shadow: 2px 2px #000000;
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
                            min-height: 250px;
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
                        `
                }
                </style>
                <div className="images-list">
                    {
                        (myprofile.mainpic !== "") ? 
                        (
                            <>
                                {                       
                                    myprofile.media.map((pic) => {
                                        if(pic !== "") {
                                            return (<>
                                                <img className="main-img-profile" src={`${pic}`} alt="profile img" />
                                            </>)
                                        }
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