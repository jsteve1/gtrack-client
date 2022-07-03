import { Navbar } from 'react-bootstrap';
import TopnavButtons from '../../components/ui/topnavbuttons'; 
import LoggedInNavButtons from '../../components/ui/loggedinnavbuttons'; 
import '../../styles/containers/ui/appnav.css';
import { useSelector } from 'react-redux'; 
import { loggedIn } from '../../app/features/users/userSlice';
export default function AppNav() {
    const _loggedIn = useSelector(loggedIn);
    return (
        <Navbar expand="sm" className="appnav" fixed="top">
            {
                (_loggedIn) ? <LoggedInNavButtons /> : <TopnavButtons />
            }   
        </Navbar>
    )
}