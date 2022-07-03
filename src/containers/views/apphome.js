import { Container, Row, Col } from 'react-bootstrap';
import AppNav from '../ui/navbar';
import blacksand from '../../static/images/blacksand.jpg';
export default function AppHomeView() {
    return (
            <>
                <style type="text/css">
                {
                    `   
                        .app-home-cont {
                            padding-top: 80px;
                            text-align: center;
                            background-image: url("${blacksand}");
                            background-repeat: no-repeat;
                            background-size: cover;
                        }
                    `
                }
                </style>
                <Container fluid className="app-home-cont">
                    <h1>App home</h1>
                </Container>
            </>
        )
}