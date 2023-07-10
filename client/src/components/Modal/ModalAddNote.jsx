import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNote } from '../../features/Notes/NotesReducer'



function ModalAddNote(){
    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes)
    const auth = useSelector(state => state.auth)

    const [status, setStatus] = useState(false)
    const [title, setTitle] = useState('')

    const handleAddNote = () => {
        dispatch(createNote({
            token: auth.token,
            note:{title: title},
        }))

    }


    return (
        <div>
            <input className="modal-state" id="modal-6" type="checkbox" />
            <div className="modal w-screen">
                    <label className="modal-overlay" htmlFor="modal-6"></label>
                <div className="modal-content flex flex-col gap-5 max-w-3xl">
                    <input type="text" placeholder="Entrez le titre de la note" className='input input-solid w-96' onChange={(e) => setTitle(e.target.value)} />
                    <button className='btn btn-primary'
                        onClick={() => {
                            handleAddNote()
                        }}
                    >Créer</button>
                    {status === true && <p className='text-green-500'>Note créée</p>}
                    {notes.error && <p className='text-red-500'>{notes.error}</p>}
                </div>
            </div>
        </div>

            
    )
}
export default ModalAddNote