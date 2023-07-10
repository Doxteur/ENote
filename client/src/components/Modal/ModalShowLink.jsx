import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ModalShowLink({ note }) {
	const dispatch = useDispatch();
	const notes = useSelector((state) => state.notes);
	const auth = useSelector((state) => state.auth);
    const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		console.log(note);
	}, [note]);

	return (
		<div>
			<input class="modal-state" id="modal-4" type="checkbox" />
			<div class="modal w-screen">
				<label class="modal-overlay" for="modal-4"></label>
				<div class="modal-content flex flex-col gap-5 max-w-3xl">
                    {
                        isCopied ? <p className="text-green-500 p-0 m-0">Copied</p> : null

                    }
					<input className="input input-solid text-black w-full" value={note.shareLink}  />
                    <button className="btn btn-primary"
                    onClick={() => {
                        setIsCopied(true);
                        navigator.clipboard.writeText(note.shareLink);
                    }}
                    >Copy</button>
				</div>
			</div>
		</div>
	);
}

export default ModalShowLink;
