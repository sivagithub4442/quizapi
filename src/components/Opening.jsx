import React from 'react'
import '../components/Opening.css'
import bg from '../bg.mp4'
import { Link } from 'react-router-dom'

function Opening() {
  return (
    <div style={{width:'100%',height:'100vh'}}>
        <div className='d-flex justify-content-center align-items-center  flex-column mt-5'>
            <video src={bg} autoPlay muted loop className='video-bg'></video>
           <div className='overlay d-flex justify-content-center align-items-center flex-column mt-5'>
                <h1 className='text-light fs-1'>QUIZ GAME</h1>
                <p className='text-light'>TRY YOUR BEST</p>
                <div>
                    <Link to={'/quiz'}>
                    <button style={{borderRadius:'20px'}} className='btb btn-warning shadow p-2 mt-3'>START QUIZ</button>
                    </Link>
                    
                    
                </div>
           </div>
        </div>

    </div>
  )
}

export default Opening


