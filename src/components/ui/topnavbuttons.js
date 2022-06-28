import {
    Container,
    Navbar, 
    Nav,
    NavDropdown,
    Button
} from 'react-bootstrap';
export default function TopnavButtons() {

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
                margin-right: 70px;
            }
            .topnavbuttonsbrand:hover {
                transform: scale(1.05); 
                filter: brightness(150%);
            }
            `
        }
        </style>
        <Container className="topnavbuttonscont border-bottom border-dark pb-3" fluid>
            <Navbar.Brand className="topnavbuttonsbrand" href="#">Goals App</Navbar.Brand>
            <Nav.Link className="link-color link-font-size nav-button-spacing" href="/about">About</Nav.Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                <Nav
                    className="my-2 my-lg-0 nav-content"
                    style={{ maxHeight: '150px' }}
                    navbarScroll
                >
                    <Button className="signup-button">Sign Up</Button>
                    <Nav.Link className="link-color link-font-size nav-button-spacing"  href="#action2">Login</Nav.Link>         
                </Nav>
                </Navbar.Collapse>
        </Container>
      </>
    )
}