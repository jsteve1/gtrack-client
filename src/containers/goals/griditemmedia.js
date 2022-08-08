import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import * as Icon from 'react-bootstrap-icons';
import { selectGoal } from '../../app/features/goals/goalSlice';
import { useSelector } from 'react-redux';
export function SmallImageTile({ url, index }) {
    const [showLarge, setShowLarge] = useState(false);
    return (
        <>
        <style type="text/css">
        {
            `
                .small-image-tile {
                    width: 100%;
                    overflow-y: hidden;
                    overflow-x: hidden;
                    border-radius: 10px;
                }    
                .zoomin-div {                    
                    overflow-y: hidden;
                    overflow-x: hidden;
                    width: 100%;
                }
                .small-image-tile, .zoomin-div {
                    max-height: 175px;
                }
                .zoomin-div .small-image-tile {
                    max-width: 100%;
                    transition: all 0.3s;
                    display: block;
                    width: 100%;
                    height: auto;
                    aspect-ratio: 1 / 1;
                    transform: scale(1);
                    object-fit: cover;
                }
                .zoomin-div:hover .small-image-tile {
                    transform: scale(1.5);
                }
            `
        }
        </style>
        <div className="zoomin-div shadow-lg" onClick={() => setShowLarge(!showLarge)} >
            <img className="small-image-tile shadow-lg" src={`${url}`} />        .
        </div>
        </>
    );
}

export default function GridItemMedia({ media, setShowEditGoal, setShowEditGoalId, id }) {
    const _goal = useSelector(selectGoal(id));
    const [mediaList, setMediaList] = useState(_goal.media);
    useEffect(() => {
        if(JSON.stringify(_goal.media) !== JSON.stringify(mediaList)) {
            setMediaList(_goal.media); 
        }
    }, [_goal.media]);
    return (
        <>
            <style type="text/css">
            {
                `
                    .grid-item-media-cont {
                        margin-top: 15px; 
                        height: 185px; 
                        min-width: 185px;
                        margin-bottom: 15px;
                        max-height: 175px;
                        overflow-y: hidden;
                        padding-top: 1px;
                        border-radius: 10px;
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
            <Container fluid className="grid-item-media-cont">
            {
                (mediaList && mediaList.length !== 0) ?
                <div className="grid-media-image-list-div shadow-lg">
                        <SmallImageTile url={mediaList[0]} index={0} /> 
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