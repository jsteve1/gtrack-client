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
                margin-left: 45px;
                margin-right: 45px;
            }
            .signup-button {
                color: #34dcbe;
                font-weight: 500;
                margin-left: auto;
                margin-right: auto;
                background-color: transparent;
                outline: #34dcbe solid 2px;
                border: none;
                padding: 10px;
                padding-left: 20px;
                padding-right: 20px;
                box-shadow: none;
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
        <Container className="topnavbuttonscont" fluid>
            <Navbar.Brand className="topnavbuttonsbrand" href="#">Goals App</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                <Nav
                    className="me-auto my-2 my-lg-0 nav-content"
                    style={{ maxHeight: '150px' }}
                    navbarScroll
                >
                    <Button className="signup-button nav-button-spacing">Sign Up</Button>
                    <Nav.Link className="link-color link-font-size nav-button-spacing" href="#action1">About</Nav.Link>
                    <Nav.Link className="link-color link-font-size nav-button-spacing"  href="#action2">Login</Nav.Link>         
                </Nav>
                </Navbar.Collapse>
        </Container>
      </>
    )
}