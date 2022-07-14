import { Button, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
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
                    <Icon.Plus width={40} height={40} color={"#34dcbe"} /> New Goal
                </Button>
           </Col>
            <Col className="mt-1" xs="12" sm="4">
                <Button variant="dark" className="getstartedbtn" onClick={() => {}}>
                    <Icon.CalendarWeek width={40} height={40} color={"#34dcbe"} />  Timeline
                </Button>
            </Col>
            <Col className="mt-1" xs="12" sm="4">
                <Button variant="dark" className="getstartedbtn" onClick={() => {}}>
                    <Icon.PersonBadgeFill width={40} height={40} color={"#34dcbe"} /> My Profile
                </Button>
            </Col>
        </>
    )
}