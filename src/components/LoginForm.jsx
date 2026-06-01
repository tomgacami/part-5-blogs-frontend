import {useState} from "react";
import Notification from "./Notification.jsx";


const LoginForm = ({handleLogin, message}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitLogin = async (event)=>{
        event.preventDefault()

        await handleLogin({username, password})

        setUsername('')
        setPassword('')

    }

    return(
        <div>
            <h2>Login in to application</h2>
            <Notification message={message}/>
            <form onSubmit={submitLogin}>
                <div>
                    Username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({target})=> {
                            setUsername(target.value)
                        }}
                    />
                </div>
                <div>
                    Password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({target})=>{
                            setPassword(target.value)
                        }}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm