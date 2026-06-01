import {useState} from "react";


const NoteForm = ({handleNewBlog})=>{

    const [title, setTitle]= useState('')
    const [author, setAuthor]= useState('')
    const [url, setUrl]= useState('')

    const addBlog = async (event) =>{
        event.preventDefault()

        const blogToCreate = {
            title: title,
            author: author,
            url: url,
        }

        await handleNewBlog(blogToCreate)

        setTitle('')
        setAuthor('')
        setUrl('')
    }


    return (

        <div>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({target})=> setTitle(target.value)}
                    />
                </div>
                <div>
                    Author <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({target})=> setAuthor(target.value)}
                    />
                </div>
                <div>
                    Url <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({target})=> setUrl(target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default NoteForm