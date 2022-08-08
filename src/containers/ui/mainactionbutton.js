import MainActionMenu from './mainactionmenu';
import * as Icon from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectShowActionButton, 
    selectShowActionMenu, 
    setShowActionMenu 
  } from '../../app/features/ui/uiSlice';

export default function MainActionButton() {
    const dispatch = useDispatch();
    const showActionButton = useSelector(selectShowActionButton);
    const showActionMenu = useSelector(selectShowActionMenu);
    return (
        <>
           <style type="text/css">
            {
            `  
                    @keyframes growshrink {
                    0%   {transform: scale(1.0); }
                    50%  {transform: scale(1.02); }
                    100% {transform: scale(1.0); }
                    }
                    .goals-list-action-button,
                    .goals-list-action-menu-button  {
                    color: #34aaaa;
                    position: fixed;
                    bottom: 10vh; 
                    left: 85vw;
                    cursor: pointer; 
                    }
                    .goals-list-action-menu-button {
                    width: 160px;

                    }
                    .menu-button-main-action {
                    margin: 5px;
                    width: 170px;
                    height: 60px;
                    background-color: rgba(55, 55, 55, 0.78); 
                    color: #34dcbe;
                    border: none;
                    font-size: 17pt;
                    text-align: left;
                    white-space: nowrap;
                    transition: all ease 0.2s;
                    }  
                    .goals-list-action-button:hover, 
                    .goals-list-action-button:active, 
                        .goals-list-action-button:focus-visible,
                        .goals-list-action-button:focus {
                    animation-name: growshrink;
                    animation-duration: 0.3s; 
                    color: #34dcbe;
                    }
                    .goals-list-action-menu-button  {
                        bottom: 22vh;
                        left: 80vw;
                    }
                    @media only screen and (max-width: 1000px) {
                        .goals-list-action-button {
                        left: 85vw;
                        }
                        .goals-list-action-menu-button {
                        left: 80vw;
                        }
                        .menu-button-main-action {
                        max-width: 150px;
                        } 
                    }
                    @media only screen and (max-width: 800px) {
                        .goals-list-action-button {
                        left: 80vw;
                        }
                        .goals-list-action-menu-button {
                        left: 77vw;
                        max-width: 150px;
                        }
                        .menu-button-main-action {
                        max-width: 150px;
                        } 
                    }
                    @media only screen and (max-width: 576px) {
                        .goals-list-action-button {
                        left: 72vw;
                        }
                        .goals-list-action-menu-button {
                        left: 61vw;
                        }
                    }
                    @media only screen and (max-width: 512px) {
                        .goals-list-action-menu-button {
                        left: 62vw;
                        }
                    }
                    @media only screen and (max-width: 400px) {
                        .goals-list-action-menu-button {
                        left: 59vw;
                        }
                        .menu-button-main-action {
                        max-width: 150px;
                        }
                    }
                    @media only screen and (max-height: 800px) {
                        .goals-list-action-button {
                        bottom: 10vh; 
                        }
                        .goals-list-action-menu-button {
                        bottom: 24vh;
                        } 
                    }
                    @media only screen and (max-height: 700px) {
                        .goals-list-action-button {
                        bottom: 10vh;
                        }
                        .goals-list-action-menu-button {
                        bottom: 25vh; 
                        }
                    }
                    @media only screen and (max-height: 600px) {
                        .goals-list-action-menu-button {
                        bottom: 27vh; 
                        }
                    }
                    @media only screen and (max-height: 500px) {
                        .goals-list-action-menu-button {
                        bottom: 27vh; 
                        }
                    }
                    .menu-button-main-spacing {
                        height: 10px;
                    }
                    .menu-button-main-action:active, 
                    .menu-button-main-action:hover, 
                    .menu-button-main-action:focus, 
                    .menu-button-main-action:focus-visible {
                        background-color: rgba(52, 220, 190, 1)
                        color: #34dcbe;
                    } 
                    .close-action-menu-button {
                        color: #aaaaaa; 
                    }
                    .close-action-menu-button:active, 
                    .close-action-menu-button:hover, 
                    .close-action-menu-button:focus, 
                    .close-action-menu-button:focus-visible {
                        background-color: rgba(52, 220, 190, 1)
                        color: #34dcbe;
                    }
            `
            }
            </style>
            {
                (showActionButton) ? 
                    <>
                        <MainActionMenu />
                        <Icon.PlusCircleFill  className="goals-list-action-button" width={100} height={100} onClick={() => dispatch(setShowActionMenu(!showActionMenu)) } />
                    </>
                    : 
                    ""
            }
        </>
    )
}