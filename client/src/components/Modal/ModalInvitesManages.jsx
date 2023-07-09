import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote, updateStatus } from '../../features/Notes/NotesReducer';
import { logout } from '../../features/Auth/AuthReducer';


Modal.setAppElement('#root');
function ModalInvitesManages({ note, setNote }) {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleChangeStatus = (e, demandeId, noteId) => {

        dispatch(updateStatus({
            token: auth.token,
            demandeId: demandeId,
            status: e.target.value,
        }))
        setNote({
            ...note,
            demandes: note.demandes.map((demande) => demande.id == demandeId ? { ...demande, status: e.target.value } : demande)
        })

    }



    return (
        <div>
            <input className="modal-state" id="modal-1" type="checkbox" />
            <div className="modal">
                <label className="modal-overlay" htmlFor="modal-1"></label>
                <div className="modal-content flex flex-col gap-5">
                    <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h1 className="text-2xl font-bold">Gestionnaires des Invitations</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {note?.demandes.map((demande) => (
                                <tr key={demande.id} >
                                    <td className="mx-2"> {demande.user.name}</td>
                                    <td className='mx-2'>{demande.user.email}</td>
                                    <td>
                                        <select defaultValue={demande.status} className={`mx-2 select btn-sm `}
                                            // add stytle
                                            onChange={
                                                (e) => {
                                                    handleChangeStatus(e, demande.id, note.id)
                                                    // dispatch(updateDemande(note.id, demande.id, e.target.value))
                                                }
                                            }
                                            // change border color
                                            style={
                                                demande.status == "accepted" ? { border: "1px solid green" } :
                                                    demande.status == "pending" ? { border: "1px solid orange" } :
                                                        demande.status == "refused" ? { border: "1px solid red" } : {}
                                            }
                                        >
                                            <option value="accepted" >Accepter</option>
                                            <option value="pending">En Attente</option>
                                            <option value="refused" >Refuser</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                            }
                            {note.demandes.length == 0 && <tr><td colSpan="3" className="text-center">Aucune demande</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default ModalInvitesManages
