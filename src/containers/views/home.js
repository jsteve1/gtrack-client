import { Container } from 'react-bootstrap';
import arnold from '../../static/images/arnold.jpg';
import * as Icon from 'react-bootstrap-icons';
import { useRef, useState } from 'react';
import { useSpring, animated as a } from 'react-spring'

export default function Home() {
    const [quoteMoving, setQuoteMoving] = useState(false);
    const [quoteIndex, setQuoteIndex] = useState(0);
    const springprops = useSpring({ 
        marginTop: quoteMoving ? "200vh" : "15vh",
        onRest: () => { 
            if(quoteMoving) setQuoteIndex((quoteIndex === quotes.current.quotes.length - 1) ? 0 : quoteIndex + 1);
            setQuoteMoving(false); 
        },
        config: { tension: 150 }
    })
    const quotes = useRef({
        quotes: [
            "Dreams are for the dreamers. Goals are for achievers",
            "The first and most important thing is that you've got to have a goal and a vision"
        ]
    })
    return (
            <>
                <style type="text/css">
                {
                    `
                        .home-cont {
                            margin-top: 80px !important;
                            text-align: center;
                            background-image: url("${arnold}");
                            background-repeat: no-repeat;
                            height: 1080px;
                            max-height: 90vh;
                            background-position: 70% 0%; 
                            background-size: cover;
                            position:fixed;
                        }
                        .test {
                            color: blue;
                        }
                        .goals-quotes {
                            color: #34dcbe; 
                            font-weight: 500; 
                            font-size: 40pt;
                            text-shadow: 1px 1px 5px black;
                            text-align: center;
                        }
                        .goals-quotes-next {
                            color: #34dcbe;
                            font-weight: 500; 
                            font-size: 20pt;
                            text-shadow: 2px 2px 5px black;
                            font-style: italic;
                            cursor: pointer;
                            margin-top: 25px;
                            position: fixed;
                            top: 75%;
                            left: 75%;
                            background-color: rgba(10, 10, 10, 0.7);
                            border-radius: 10px;
                            padding: 10px;
                            opacity: 0.8;
                        }
                        .goals-quotes-next:hover {
                            font-weight: 500; 
                        }
                        .goals-quote {
                            overflow-wrap: break-word; 
                        }
                    `
                }
                </style>
                <Container fluid className="home-cont">
                    <a.div className="goals-quotes" style={springprops}>
                        <span className="goals-quote">"{`${quotes.current.quotes[quoteIndex]}`}"</span>                   
                    </a.div>
                    <div className="goals-quotes-next">
                        <span className="goals-quoteright" onClick={() => { setQuoteMoving(true) }}>Next Quote <Icon.ArrowCounterclockwise /></span>           
                    </div>
                </Container>
            </>
        )
}