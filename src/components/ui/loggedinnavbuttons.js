import {
    Container,
    Dropdown
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate, useLocation } from 'react-router-dom';
const CustomProfileDropdown = forwardRef(( { onClick }, ref) => (
    <>
    <style type="text/css">
        {
            `
                .icon-person-top-nav {
                    cursor: pointer;
                    color: #34aaaa;
                }
                .icon-person-top-nav:hover {
                    transform: scale(1.05); 
                    color: #34dcbe;
                }
            `
        }
    </style>
    <span
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="icon-person-top-nav"
  >
    <Icon.PersonCircle className="icon-person-top-nav" width={40} height={40} />
  </span>
  </>
));

export default function LoggedInNavButtons() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
        <style type="text/css">
        {
            `
            .topnavbuttonscont {
                color: white !important ;
                font-weight: 500;
                background-color: #191919 !important;
            }
            .link-color {
                color: #34dcbe !important;
            }      
            .link-font-size {
                font-size: 16pt;
            } 
            .signup-button {
                color: #34dcbe;
                font-weight: 500;
                background-color: transparent;
                outline: #34dcbe solid 2px;
                border: none;
                padding: 10px;
                padding-left: 20px;
                padding-right: 20px;
                box-shadow: none;
                align-self: center;
                margin-right: 25px;
            }
            @media only screen and (max-width: 550px) {
                .signup-button {
                    margin-right: 0px;
                }
            }
            .signup-button:hover, 
            .signup-button:active, 
            .signup-button:focus,
            .signup-button:focus-visible  {
                background-color: #015747;
                outline: none; 
                border: none; 
                box-shadow: none;
            }
            .nav-content { 
                background-color: #191919;
                padding-top: 10px;
            }
            .navbar-toggler {
                filter: invert(1);
            }
            .topnavbuttonsbrand {
                color: #34aaaa !important; 
                transition: ease all 0.5s;
                font-size: 3vh;
                margin-right: 30px;
            }
            .topnavbuttonsbrand:hover {
                transform: scale(1.05); 
                filter: brightness(150%);
            }
            .hidden-link {
                display: none;
            }
            .link-no-underline {
                text-decoration: none;
            }
            .about-link {
                margin-top: 10px;
                margin-right: auto;
            }
            .back-button {
                cursor: pointer;
                color: #999999;
            }
            .back-button:hover, 
                .back-button:active, 
                    .back-button:focus, 
                        .back-button:focus-visible {
                color: #34aaaa !important;
            }
            `
        }
        </style>
        <Container className="topnavbuttonscont border-bottom border-dark pb-3 d-flex align-items-center" fluid>
            <span className="d-flex align-items-center justify-content-around">
                <span className="topnavbuttonsbrand link-no-underline">
                    Envision
                </span>
                {
                    (location.pathname.slice(0, 10) === '/app/goal/') ?
                    (
                        <Icon.ArrowLeftShort className="back-button" width={75} height={75} onClick={() => { navigate("/app/goals/") }}/>
                    )
                    :
                    ""
                }
            </span>
            <Dropdown drop={'start'}>
                <Dropdown.Toggle as={CustomProfileDropdown} id="dropdown-custom-components" />
                <Dropdown.Menu variant="dark">
                    <Dropdown.Item onClick={(e) => { e.preventDefault(); navigate('/app/profile') } }><Icon.Person width={20} height={20} color={"#34dcbe"} /> My Profile</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => { e.preventDefault(); navigate('/app/goals') } }><Icon.ListCheck width={20} height={20} color={"#34dcbe"}/> My Goals</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => { e.preventDefault(); navigate('/app/profile') } }><Icon.BoxArrowRight width={20} height={20} color={"#34dcbe"}/> Sign Out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Container>
      </>
    )
}