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


export default function EditorWiz({ note }) {
	const dispatch = useDispatch();
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty(),
	);
	const auth = useSelector((state) => state.auth);
	const typingTimeoutRef = useRef(null);
	const [previousText, setPreviousText] = useState("");
	const [previousSelection, setPreviousSelection] = useState(null);

	useEffect(() => {
		const blocksFromHTML = convertFromHTML(note?.content);
		console.log("blocksFromHTML", blocksFromHTML);
		const state = ContentState.createFromBlockArray(
			blocksFromHTML.contentBlocks,
			blocksFromHTML.entityMap,
		);
		setEditorState(EditorState.createWithContent(state));
		setPreviousText(note?.content);
	}, [note]);

	const onEditorStateChange = (editorState) => {
		const { blocks } = convertToRaw(editorState.getCurrentContent());
		console.log("blocks", blocks);
		let text = editorState.getCurrentContent().getPlainText("\u0001");
		text = draftToHtml(convertToRaw(editorState.getCurrentContent()));

		// remove replace " to '
		text = text.replace(/"/g, "'");

		// format style="font-size: 14px;" to style={{fontSize: "14px"}}
		// dont forget to 
		// text = text.replace(/style='([^']*)'/g, (match, p1) => {
		// 	const style = p1
		// 		.split(";")
		// 		.filter((s) => s.trim())
		// 		.map((s) => {
		// 			const [key, value] = s.split(":");
		// 			return `"${key.trim()}": "${value.trim()}"`;
		// 		})
		// 		.join(",");
		// 	return `style={{${style}}}`;
		// });
		console.log("text", text);
		// text = parse(text);
		// parse html text to reaact
		
		console.log("text", text);

		if (text !== previousText) {
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
			<div className="w-full p-2">
				<div className="tabs">
					<div className="menu-item flex-col items-start">
						<input
							type="radio"
							id="tab-4"
							name="tab-2"
							className="tab-toggle"
							checked
						/>
						<label
							htmlFor="tab-4"
							className="tab tab-bordered px-6"
						>
							{note.title}
						</label>
					</div>
				</div>
				<Editor
					editorState={editorState}
					toolbarClassName="toolbarClassName"
					wrapperClassName="wrapperClassName"
					editorClassName="editorClassName"
					onEditorStateChange={onEditorStateChange}
					editorStyle={{ lineHeight: "1.2" }}
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
