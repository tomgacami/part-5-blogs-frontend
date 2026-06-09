import {useState} from "react";


const Blog = ({ blog, likeBlog, deleteBlog, username}) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 2,
        marginBottom: 5
    }

    const [visibility, setVisibility] = useState(false)
    const [textButton, setTextButton] = useState('view')

    const hideDisplayButton = {display: visibility ? '' : 'none'}

    const toggleVisibility = ()=>{
        setVisibility(!visibility)
        if(textButton === 'view'){
            setTextButton('hide')
        }else{
            setTextButton('view')
        }
    }

    const allowDeleteBlog = blog.user.username === username

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author} <button onClick={toggleVisibility}>{textButton}</button>
            </div>
            <div style={hideDisplayButton}>
                <p>{blog.url}</p>
                Likes {blog.likes} <button onClick={likeBlog}>like</button>
                <p>{blog.user.name}</p>
                { allowDeleteBlog &&
                    <button onClick={()=>deleteBlog(blog)}>Remove</button>
                }
            </div>
        </div>
    )
}

export default Blog