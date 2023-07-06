import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotes } from "../../features/Notes/NotesReducer";
import SideBar from "../SideBar/SideBar";
import ReactHtmlParser from 'react-html-parser'; 

function NoteListes() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const notes = useSelector((state) => state.notes);
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getNotes(auth.token));
	}, [auth.token, dispatch]);

	const handleEdit = (e) => {
		navigate(`/note/${e}`);
	};

	return (
		<div className="sticky flex h-screen flex-row gap-4 overflow-y-auto rounded-lg sm:overflow-x-hidden">
			<div className="bg-gray-200 h-screen w-full">

				<div className="flex flex-row">
					<SideBar />
					<div className="flex flex-col w-full justify-center items-center">
						<h1 className="text-4xl font-bold mb-8">Aucun fichier trouvé</h1>
						<div className="flex flex-col gap-4">
						<a className="link link-secondary link-underline-hover" href="/">Créer un nouveau fichier</a>
						<a className="link link-secondary link-underline-hover" href="/">Aller au fichier</a>
						<a className="link link-secondary link-underline-hover" href="/">Voir les fichiers récents</a>
						<a className="link link-secondary link-underline-hover" href="/">fermer</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NoteListes;
