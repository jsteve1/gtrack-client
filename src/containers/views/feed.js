import { Container, Row, Col } from 'react-bootstrap';
import mtn from '../../static/images/mtn.jpg';

export default function FeedView() {
    return (
            <>
                <style type="text/css">
                {
                    `   
                        .feed-view-cont {
                            padding-top: 120px;
                            text-align: center;
                            background-image: url("${mtn}");
                            background-repeat: no-repeat;
                            background-size: cover;
                            min-height: 120vh !important;
                        }
                    `
                }
                </style>
                <Container fluid className="feed-view-cont">
                  
                </Container>
            </>
        )
}