import Notification from "./Notification.jsx";

const HeaderUserLogged = ({username, handleLogout, message}) =>{

    return (
        <div>
            <h2>Blogs</h2>
            <Notification message={message}/>
            {username} logged in <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default HeaderUserLogged