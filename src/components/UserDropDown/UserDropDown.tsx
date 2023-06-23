import { useAuth } from "../../contexts/AuthContext";
import "./UserDropDown.scss";

type UserDropDownProps = {
    username: string;
}

const UserDropDown = ({username} : UserDropDownProps) => {
    const {logout} = useAuth();
  return (
    <div className="dropdown--container">
        <button className="nav-btn">{username} 
            <span className="material-symbols-outlined">
                keyboard_arrow_down
            </span>
        </button>
        <div className="dropdown-content">
            <a className="menu-items" href="/profile">Profile</a>
            <button onClick={logout} className="menu-items">Log Out</button>
        </div>
    </div> 
  )
}

export default UserDropDown