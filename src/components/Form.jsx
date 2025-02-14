import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import '../styles/Forms.css'
import LoadingIndicator from './LoadingIndicator'

function Form({route, method}){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')
    const navigate = useNavigate()
    
    const name = method === 'login' ? 'Login' : 'Register'
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try{
            const res = await api.post(route, {username, password})
            if(method === 'login'){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/')
            }else{
                navigate('/login')
            }

        }catch(error){
            alert(error)
        }finally {
            setLoading(false)
        }
    
    }  
    return <form onSubmit={handleSubmit} className = 'form-container'>
        <h1>{name}</h1>
        <input className='form-input' type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Nome de usuário'></input>
        <input className='form-input' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Senha'></input>
        {loading && <LoadingIndicator />}
        <button className='formbutton' type='subimit'>
            {name}
        </button>


    </form>

}
export default Form