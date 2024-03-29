import {
    Container,
    Navbar, 
    Nav,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addGoal, addProgressMarker, mockGoalState } from '../../app/features/goals/goalSlice';
import { login, mockUsersState, addOtherUser } from '../../app/features/users/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function TopnavButtons() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loadMockState = () => {
        dispatch(login(mockUsersState.myProfile));
        for(let user of mockUsersState.otherUsers) {
            dispatch(addOtherUser(user));
        }
        console.log("Mock profile + users loaded into redux");
        for(let goal of mockGoalState.goals) {
            dispatch(addGoal(goal));
        }
        console.log("Mock goals loaded into redux");
        for(let goalid in mockGoalState.progressMarkers) {
            for(let prgmrk of mockGoalState.progressMarkers[goalid]) {
                dispatch(addProgressMarker({ goalid: prgmrk.goalid, progressMarker: prgmrk } ));
            }
        }
        console.log("Mock progress markers loaded into redux");
        navigate('/app/profile');
    }

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
            .nav-button-spacing {
                align-self: center;
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
                margin-top: 5px; 
                margin-bottom: 5px;
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
                color: #34dcbe !important; 
                transition: ease all 0.5s;
                font-size: 30pt;
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
                margin-right: 10px;
            }
            `
        }
        </style>
        <Container className="topnavbuttonscont border-bottom border-dark pb-3 d-flex align-items-baseline" fluid>
            <Link className="topnavbuttonsbrand link-no-underline " to="/home">Envision</Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                <Nav
                    className="my-2 my-lg-0 nav-content"
                    style={{ maxHeight: '150px' }}
                    navbarScroll
                >
                    <Button  className="signup-button"  onClick={() => loadMockState()}>Load Demo</Button>
                    <Button className="signup-button" onClick={ () => document.getElementById("hidden-sign-up-link").click() }>Sign Up</Button>
                    <Link className="link-color link-no-underline link-font-size nav-button-spacing"  to="/app/signin">Login</Link>
                    <Link className="hidden-link " id="hidden-sign-up-link" to="/app/signup" />         
                </Nav>
                </Navbar.Collapse>
        </Container>
      </>
    )
}