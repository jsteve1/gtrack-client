import { Container, Row, Col, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

export default function MyProfileActions({ setShowEdit }) {
    return (
            <>
                <style type="text/css">
                {
                    `
                        .profileactionbutton {
                            font-weight: 500; 
                            font-size: 4vh;
                            background-color: rgba(100, 100, 100, 0.2);
                            border: 4px solid #aaaaaa;
                            color: #ddddddd;
                            padding: 15px;
                            border-radius: 50px; 
                            width: 100%;
                            padding-left: 15px;
                        }
                    `
                }
                </style>
                <Col className="mt-4" xs="12" md="4">
                    <Button variant="dark" className="profileactionbutton" onClick={() => {}}>
                        <Icon.CloudArrowUp width={40} height={40} color={"#34dcbe"} />  My Uploads
                    </Button>
                </Col>
                <Col className="mt-4" xs="12" md="4">
                    <Button variant="dark" className="profileactionbutton" onClick={() => setShowEdit(true)}>
                        <Icon.PencilFill width={40} height={40} color={"#34dcbe"} />  Edit Profile
                    </Button>
                </Col>
                <Col className="mt-4" xs="12" md="4">
                    <Button variant="dark" className="profileactionbutton" onClick={() => {}}>
                        <Icon.GearFill width={40} height={40} color={"#34dcbe"} /> Account
                    </Button>
                </Col>
            </>
        )
}