

const HeaderUserLogged = ({username, handleLogout}) =>{

    return (
        <div>
            <h2>Blogs</h2>
            {username} logged in
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default HeaderUserLogged