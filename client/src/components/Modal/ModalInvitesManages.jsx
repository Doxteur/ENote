import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';


Modal.setAppElement('#root');
function ModalInvitesManages({ note }) {

    return (
        <div>
            {/* <div>
                <Modal
                    isOpen={modalManageInvites}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="ModalInvites"
                >
                    <div className='w-screen z-50'>
                        <button onClick={closeModal} className='btn btn-error m-2'>close</button>
                        <div>
                            {note.demandes.map((demande) => (
                                <div key={demande.id} className='flex'>
                                    <h1 className="mx-2"> {demande.user.name}</h1>
                                    <h1 className='mx-2'>{demande.user.email}</h1>
                                    <h1 className='mx-2'>{demande.status}</h1>
                                    <select className='mx-2 select select-solid'>
                                        <option value="accepted">Accepter</option>
                                        <option value="pending">En Attente</option>
                                        <option value="refused">Refuser</option>
                                    </select>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </Modal>
            </div> */}
            <input className="modal-state" id="modal-1" type="checkbox" />
            <div className="modal">
                <label className="modal-overlay" htmlFor="modal-1"></label>
                <div className="modal-content flex flex-col gap-5">
                    <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h2 className="text-xl">Modal title 1</h2>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur dolorum voluptate ratione dicta. Maxime cupiditate, est commodi consectetur earum iure, optio, obcaecati in nulla saepe maiores nobis iste quasi alias!</span>
                    <div className="flex gap-3">
                        <button className="btn btn-error btn-block">Delete</button>

                        <button className="btn btn-block">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ModalInvitesManages
