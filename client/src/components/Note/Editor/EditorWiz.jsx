import {
	convertToRaw,
	EditorState,
	ContentState,
	convertFromHTML,
	SelectionState,
} from "draft-js";
import React, { useState, useEffect, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/Auth/AuthReducer";
import SideBar from "../../SideBar/SideBar";
import { updateNote } from "../../../features/Notes/NotesReducer";
import { AiFillCloseCircle } from "react-icons/ai";
import parse from 'html-react-parser';
import { socket } from "../../../utils/socket";

import { BsFillGearFill } from "react-icons/bs";
import ModalInvitesManages from "../../Modal/ModalInvitesManages";
export default function EditorWiz({ note, setNote }) {
	const dispatch = useDispatch();
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty(),
	);
	const auth = useSelector((state) => state.auth);
	const typingTimeoutRef = useRef(null);
	const [previousText, setPreviousText] = useState("");
	const [previousSelection, setPreviousSelection] = useState(null);
	const [modalManageInvites, setModalManageInvites] = useState(false);

	useEffect(() => {
		const blocksFromHTML = convertFromHTML(note?.content);
		const state = ContentState.createFromBlockArray(
			blocksFromHTML.contentBlocks,
			blocksFromHTML.entityMap,
		);
		setEditorState(EditorState.createWithContent(state));
		setPreviousText(note?.content);
	}, [note]);

	useEffect(() => {
		socket.on("editing", (data) => {
			const blocksFromHTML = convertFromHTML(data);
			const state = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap,
			);
			setEditorState(EditorState.createWithContent(state));
			setPreviousText(data);
		});

	}, []);



	const onEditorStateChange = (editorState) => {
		const { blocks } = convertToRaw(editorState.getCurrentContent());
		let text = editorState.getCurrentContent().getPlainText("\u0001");
		text = draftToHtml(convertToRaw(editorState.getCurrentContent()));

		// remove replace " to '
		text = text.replace(/"/g, "'");


		if (text !== previousText) {
			socket.emit("editing", text);
			clearTimeout(typingTimeoutRef.current);
			typingTimeoutRef.current = setTimeout(() => {
				dispatch(
					updateNote({
						token: auth.token,
						note: {
							content: text,
						},
						id: note.id,
					}),
				);
				setPreviousText(text);
			}, 2000);
		}

		// Preserve the selection state of the editor
		const selectionState = editorState.getSelection();
		setPreviousSelection(selectionState);

		// Set the new editor state with the preserved selection
		setEditorState(editorState);
	};

	return (
		<div className="flex">
			<SideBar />
			{note &&
				<ModalInvitesManages modalManageInvites={modalManageInvites} setModalManageInvites={setModalManageInvites} note={note} setNote={setNote} />
			}

			<div className="w-full ">
				<div className="w-full flex justify-between">
					<div className="tabs">
						<div className="border-r border-t border-gray-300 p-1 mt-2 pb-2 bg-white relative">
							<div className="flex align-middle items-center ">
								<input type="radio" id="tab-4" name="tab-2" className="tab-toggle" readOnly checked />
								<label htmlFor="tab-4" className="tab tab-bordered">{note.title}</label>
								<Link to="/notes"><AiFillCloseCircle className="hover:text-gray-300 cursor-pointer absolute -top-1.5 -right-1.5 " /></Link>
							</div>
						</div>
						<div className="absolute right-5 p-1 pb-0.5 rounded-md">
							<div className="dropdown">
								<label tabIndex="0">
									<BsFillGearFill className="hover:text-gray-600 cursor-pointer w-6 h-6 hover:animate-spin" />
								</label>
								<div className="dropdown-menu">
									<label className="dropdown-item text-sm" htmlFor="modal-1">Gestion Invites</label>
								</div>
							</div>

						</div>
					</div>

				</div>
				<Editor
					editorState={editorState}
					toolbarClassName="toolbarClassName"
					wrapperClassName="wrapperClassName"
					editorClassName="editorClassName"
					onEditorStateChange={onEditorStateChange}
					editorStyle={{ lineHeight: "1.2", padding: "0 10px" }}
					// default
					toolbar={{
						options: [
							"inline",
							"blockType",
							"fontSize",
							"fontFamily",
						],
					}}
					// set default value
					value={note.content}
				/>
			</div>
		</div>
	);
}
