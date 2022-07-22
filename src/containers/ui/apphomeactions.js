import { Button, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
export default function AppHomeActions(){
    return (
        <>
           <style type="text/css">
            {
                `
                    .apphomeactionbtn {
                        font-weight: 300; 
                        font-size: 4vh;
                        background-color: rgba(100, 100, 100, 0.2);
                        border: none;
                        color: #ddddddd;
                        padding: 15px;
                        border-radius: 10px; 
                        width: 100%;
                    }
                `
            }
           </style>
           <Col />
           <Col className="mt-1" xs="12" sm="3">
                <Button variant="dark" className="apphomeactionbtn" onClick={() => {}}>
                    <Icon.Plus width={50} height={50} color={"#34dcbe"} /><br></br>New&nbsp;Goal
                </Button>
           </Col>
            <Col className="mt-1" xs="12" sm="3">
                <Button variant="dark" className="apphomeactionbtn" onClick={() => {}}>
                    <Icon.CalendarWeek width={40} height={40} color={"#34dcbe"} /><br></br>Timeline
                </Button>
            </Col>
            <Col className="mt-1" xs="12" sm="3">
                <Button variant="dark" className="apphomeactionbtn" onClick={() => {}}>
                    <Icon.PersonBadgeFill width={40} height={40} color={"#34dcbe"} /><br></br>Profile
                </Button>
            </Col>
            <Col />
        </>
    )
}