import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

export default function MainActionMenu({ setShowAction, showAction }) {
    const navigate = useNavigate();
    const location = useLocation();
    return <>
    {
        (showAction) ? 
        <div className="goals-list-action-menu-button d-flex justify-content-center flex-wrap flex-column">
          <Icon.X 
            width={35} 
            height={35} 
            className="align-self-end close-action-menu-button" 
            onClick={() => setShowAction(false)} 
          />
          <Button 
            className="menu-button-main-action shadow-lg" 
            variant="dark"
            onClick={() => { if(location.pathname.slice(0, 10).trim() !== "/app/goals") {  navigate('/app/goals'); setShowAction(false); }}}
            >
            <Icon.Trophy 
              width={20} 
              height={20} 
              />
            &nbsp;
            New Goal
            </Button>  
                             
          <Button 
            className="menu-button-main-action shadow-lg" 
            variant="dark"
            onClick={() => { if(location.pathname.slice(0, 9)  !== '/app/feed') { navigate('/app/feed'); setShowAction(false); }}}
          >
          <Icon.Award 
            width={20} 
            height={20} 
          />
            &nbsp;
            Share 
          </Button>
          <Button 
            className="menu-button-main-action shadow-lg" 
            variant="dark"
            onClick={() => { if(location.pathname.slice(0, 9)  !== '/app/feed') { navigate('/app/feed'); setShowAction(false); }}}
          >
          <Icon.CloudArrowUpFill 
            width={20} 
            height={20} 
          />
            &nbsp;
            Upload 
          </Button>
          <div className="menu-button-main-spacing">

          </div>
        </div>
        : ""
    }
    </>
}