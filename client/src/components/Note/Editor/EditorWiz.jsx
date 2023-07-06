import {
	convertToRaw,
	EditorState,
	ContentState,
	convertFromHTML,
} from "draft-js";
import React, { useState, useEffect, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/Auth/AuthReducer";
import SideBar from "../../SideBar/SideBar";
import { updateNote } from "../../../features/Notes/NotesReducer";

export default function EditorWiz({ note }) {
	const dispatch = useDispatch();
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty(),
	);
	const auth = useSelector((state) => state.auth);
	const typingTimeoutRef = useRef(null);

	useEffect(() => {
		const blocksFromHTML = convertFromHTML(note?.content);
		const state = ContentState.createFromBlockArray(
			blocksFromHTML.contentBlocks,
			blocksFromHTML.entityMap,
		);
		setEditorState(EditorState.createWithContent(state));
	}, []);

	const onEditorStateChange = (editorState) => {
		clearTimeout(typingTimeoutRef.current);

		const { blocks } = convertToRaw(editorState.getCurrentContent());
		let text = editorState.getCurrentContent().getPlainText("\u0001");
		text = draftToHtml(convertToRaw(editorState.getCurrentContent()));

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
		}, 2000);

		setEditorState(editorState);
	};

	return (
		<div className="flex">
			<SideBar />
			<div className="w-full p-2">
				<Editor
					editorState={editorState}
					toolbarClassName="toolbarClassName"
					wrapperClassName="wrapperClassName"
					editorClassName="editorClassName"
					onEditorStateChange={onEditorStateChange}
					editorStyle={{
						border: "1px solid black",
						lineHeight: "1.2",
					}}
					// default
					toolbar={{
						options: [
							"inline",
							"blockType",
							"fontSize",
							"fontFamily",
						],
					}}
				/>
				<div className="w-1/2 m-auto mt-20">
					<Link
						className="btn btn-success btn-sm float-left mx-40"
						to="/notes"
					>
						Vos documents
					</Link>
				</div>
			</div>
		</div>
	);
}
