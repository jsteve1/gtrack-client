import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import * as Icon from 'react-bootstrap-icons';
export function SmallImageTile({ url, index }) {
    return (
        <>
        <style type="text/css">
        {
            `
                .small-image-tile {
                    max-height: 175px;
                }
            `
        }
        </style>
        <img className="small-image-tile shadow-lg" src={`${url}`} />        
        </>
    );
}

export default function GridItemMedia({ media, setShowEditGoal, setShowEditGoalId, id }) {
    const [mediaList, setMediaList] = useState(media);
    useEffect(() => {
        if(JSON.stringify(media) !== JSON.stringify(mediaList)) {
            setMediaList(media); 
        }
    }, [media]);
    useEffect(() => {
        setMediaList(["blob:http://localhost:3000/f574c7b8-8096-43fc-8474-21e2af336ee2"]); 
    }, [])
    return (
        <>
            <style type="text/css">
            {
                `
                    .grid-item-media-cont {
                        margin-top: 15px; 
                        height: 185px; 
                        min-width: 185px;
                        margin-bottom: 25px;
                        max-height: 175px;
                        overflow-y: hidden;
                        ${(mediaList.length === 0) ? "background-color: rgba(75, 75, 75, 0.2); " : "transparent"} 
                        padding-top: 1px;
                    }
                    .upload-button-grid-media {
                        margin-top: 25px;
                    }
                    .grid-media-upload-div {
                        margin-top: 25px;
                    }
                    .grid-media-upload-div:hover {
                        color: #34aaaa;
                    }
                    .grid-media-image-list-div {
                        display: flex; 
                        justify-content: center; 
                        overflow-x: auto; 
                    }
                `
            }
            </style>
            <Container fluid className="grid-item-media-cont" onClick={() => { if(mediaList.length === 0 ){  setShowEditGoalId(id); setShowEditGoal(true);  } }}>
            {
                (mediaList.length !== 0) ?
                <div className="grid-media-image-list-div">
                    {
                        mediaList.map((link, index) => {     
                            return (
                                <>
                                    <SmallImageTile url={link} index={index} />  
                                </>
                            );  
                        }) 

                    }
                </div>
                : 
                <div className="grid-media-upload-div">
                    Add media<br></br>
                    <Icon.CloudUpload width={50} height={50} className="upload-button-grid-media" />
                </div>
            }
            </Container>
        </>
    )
}