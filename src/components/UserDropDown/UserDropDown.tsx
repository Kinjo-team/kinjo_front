import { useAuth } from "../../contexts/AuthContext";
import "./UserDropDown.scss";

type UserDropDownProps = {
    username: string;
}

const UserDropDown = ({username} : UserDropDownProps) => {
    const {logout} = useAuth();
  return (
    <div className="dropdown--container">
        <button className="dropbtn">{username} 
            <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
            {/* <a href="#">Profile</a> */}
            <button onClick={logout} className="">Log Out</button>
        </div>
    </div> 
  )
}

export default UserDropDown