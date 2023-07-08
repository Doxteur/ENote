import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDemande } from '../../features/Notes/NotesReducer'

function ModalJoinNote() {
    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes)
    const auth = useSelector(state => state.auth)

    const [link, setLink] = useState('')
    const [status, setStatus] = useState(false)

    const handleJoinNote = () => {
        dispatch(createDemande({
            token: auth.token,
            link: link
        })).unwrap().then(() => {
            setStatus(true)
        }).catch(() => {
            setStatus(false)
        }
        )

    }

    return (
        <div>
            <input class="modal-state" id="modal-2" type="checkbox" />
            <div class="modal w-screen">
                <label class="modal-overlay" for="modal-2"></label>
                <div class="modal-content flex flex-col gap-5 max-w-3xl">
                    <input type="text" placeholder="Entrez le code de la note" className='input input-solid w-96' onChange={(e) => setLink(e.target.value)} />
                    <button className='btn btn-primary'
                        onClick={() => {
                            handleJoinNote()
                        }}
                    >Rejoindre</button>
                    {status === true && <p className='text-green-500'>Demande envoyée</p>}
                    {notes.error && <p className='text-red-500'>{notes.error}</p>}
                </div>
            </div>
        </div>
    )
}

export default ModalJoinNote
