import { Button, Col } from 'react-bootstrap';

export default function AppHomeActions(){
    return (
        <>
           <style type="text/css">
            {
                `
                    .getstartedbtn {
                        font-weight: 500; 
                        font-size: 4vh;
                        background-color: rgba(100, 100, 100, 0.2);
                        border: 4px solid #dddddd;
                        color: #ddddddd;
                        padding: 15px;
                        border-radius: 10px; 
                        width: 100%;
                    }
                `
            }
           </style>
           <Col className="mt-1" xs="12" sm="4">
                <Button variant="dark" className="getstartedbtn" onClick={() => {}}>
                    New Goal
                </Button>
           </Col>
            <Col className="mt-1" xs="12" sm="4">
                <Button variant="dark" className="getstartedbtn" onClick={() => {}}>
                    Timeline
                </Button>
            </Col>
            <Col className="mt-1" xs="12" sm="4">
                <Button variant="dark" className="getstartedbtn" onClick={() => {}}>
                    My Profile
                </Button>
            </Col>
        </>
    )
}