import { Button, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
export default function AppHomeActions({ setStartingSortState }){
    const navigate = useNavigate();
    return (
        <>
           <style type="text/css">
            {
                `
                    .apphomeactionbtn {
                        font-weight: 300; 
                        font-size: 4vh;
                        background-color: rgba(100, 100, 100, 0.2);
                        border: 1px solid #096666;
                        color: #ddddddd;
                        padding: 15px;
                        border-radius: 10px; 
                        width: 100%;
                    }
                `
            }
           </style>
           <Col />
           <Col className="mt-1" xs="12" md="3">
                <Button variant="dark" className="shadow-lg apphomeactionbtn" onClick={() => { setStartingSortState("deadline"); navigate('/app/goals/'); }}>
                    <Icon.Hourglass width={50} height={50} color={"#34dcbe"} /><br></br>Upcoming
                </Button>
           </Col>
           <Col className="mt-1" xs="12" md="3">
                <Button variant="dark" className=" shadow-lg apphomeactionbtn" onClick={() => { setStartingSortState("completed"); navigate('/app/goals/')}}>
                    <Icon.Award width={50} height={50} color={"#34dcbe"} /><br></br>Achieved
                </Button>
           </Col>
            <Col className="mt-1" xs="12" md="3">
                <Button variant="dark" className="shadow-lg apphomeactionbtn" onClick={() => { navigate('/app/profile/'); }}>
                    <Icon.PersonBadgeFill width={40} height={40} color={"#34dcbe"} /><br></br>My&nbsp;Profile
                </Button>
            </Col>
            <Col />
        </>
    )
}