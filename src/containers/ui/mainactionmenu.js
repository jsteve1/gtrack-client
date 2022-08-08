import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowActionMenu, setShowActionMenu, setShowNewGoal } from '../../app/features/ui/uiSlice';
export default function MainActionMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const showActionMenu = useSelector(selectShowActionMenu);
    return <>
    {
        (showActionMenu) ? 
        <div className="goals-list-action-menu-button d-flex justify-content-center flex-wrap flex-column">
          <Icon.X 
            width={35} 
            height={35} 
            className="align-self-end close-action-menu-button" 
            onClick={() => dispatch(setShowActionMenu(false)) } 
          />
          <Button 
            className="menu-button-main-action shadow-lg" 
            variant="dark"
            onClick={() => { 
              if(location.pathname.slice(0, 10).trim() !== "/app/goals") {  
                  navigate('/app/goals'); 
                  dispatch(setShowActionMenu(false)); 
                  dispatch(setShowActionMenu(true));
                  dispatch(setShowNewGoal(true));
              }
              else {
                  dispatch(setShowNewGoal(true));
              } 
              dispatch(setShowActionMenu(false));
              }}
            >
            <Icon.Trophy 
              width={20} 
              height={20} 
              />
            &nbsp;
              New Goal
            </Button>  
          <div className="menu-button-main-spacing" />
        </div>
        : ""
    }
    </>
}