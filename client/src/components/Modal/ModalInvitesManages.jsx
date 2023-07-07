import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


Modal.setAppElement('#root');
function ModalInvitesManages({ modalManageInvites, setModalManageInvites }){
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    
    
    function openModal() {
        setModalManageInvites(true);
    }
    
    
    function closeModal() {
        setModalManageInvites(false);
    }
    
return (
    <div>
        <div>
            <Modal
                isOpen={modalManageInvites}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        </div>
    </div>
);
}


export default ModalInvitesManages
