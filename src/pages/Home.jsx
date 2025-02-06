import { useState, useEffect} from 'react'
import api from '../api'
import Note from '../components/Note.jsx'
import '../styles/Home.css'



function Home(){
    const [notes, setNotes] =  useState([])
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')  

    useEffect(()=>{
        getNotes();
    }, [])
    
    const resetForm = () => {
        setContent('')
        setTitle('')
    }
    
    const getNotes = () => {
        api.get('/api/notes/')
        .then((res) => res.data)
        .then((data) => {setNotes(data); console.log(data)})
        .catch((err) => alert(err))
    }
    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if(res.status === 204)
                alert('Item apagado.')
            else 
                alert('Erro ao apagar o item.')
            getNotes()
        }).catch((error) => alert(error))
    }
    const createNote = (e) => {
        e.preventDefault()
        api.post('/api/notes/', {content, title}).then((res) => {
            if(res.status === 201)
                alert('Item criado!')
            else
                alert('Falha ao criar intem.')
            getNotes()
            resetForm()
            }).catch((error) => alert(error))
      
    }
    

    return (<div>
        <div>
            <h2>Notas</h2>
            {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
        </div>
        <h2>Criar nota</h2>
        <form onSubmit={createNote}>
            <label htmlFor='title' >Título:</label>
            <br/>
            <input type="text" id='title' name='title' required onChange={(e)=> setTitle(e.target.value)} value={title}/>
            <label htmlFor="content">Conteúdo:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value = {content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
        </form>
    </div>)
}
export default Home