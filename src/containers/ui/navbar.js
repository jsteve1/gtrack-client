import { Navbar } from 'react-bootstrap';
import TopnavButtons from '../../components/ui/topnavbuttons'; 
import '../../styles/containers/ui/appnav.css';
export default function AppNav() {
    return (
        <Navbar expand="sm" className="appnav" fixed="top">
            <TopnavButtons />
        </Navbar>
    )
}