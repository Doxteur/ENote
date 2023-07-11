import { useState, useEffect } from "react";

function ModalShowLink({ note }) {
    const [isCopied, setIsCopied] = useState(false);

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
