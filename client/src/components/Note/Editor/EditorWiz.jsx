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
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/Auth/AuthReducer";
import SideBar from "../../SideBar/SideBar";
import { updateNote } from "../../../features/Notes/NotesReducer";
import { AiFillCloseCircle } from "react-icons/ai";


export default function EditorWiz({ note }) {
	const dispatch = useDispatch();

	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty(),
	);
	const auth = useSelector((state) => state.auth);
	const typingTimeoutRef = useRef(null);

	useEffect(() => {
		console.log("je suis la !!!!!!!");
		const blocksFromHTML = convertFromHTML(note?.content);
		const state = ContentState.createFromBlockArray(
			blocksFromHTML.contentBlocks,
			blocksFromHTML.entityMap,
		);
		setEditorState(EditorState.createWithContent(state));
	}, [note]);


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
			<div className="w-full m-2">
				<div className="tabs">
					<div className="border-l border-r border-t border-gray-300 p-1 mt-2 pb-2 bg-white rounded-tr-xl relative">
						<div className="flex align-middle items-center ">
						<input type="radio" id="tab-4" name="tab-2" className="tab-toggle" checked />
						<label htmlFor="tab-4" className="tab tab-bordered">{note.title}</label>
						<Link  to="/notes"><AiFillCloseCircle className="hover:text-gray-300 cursor-pointer absolute -top-1.5 -right-1.5 "/></Link>	
						</div>	
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
						options: ["inline", "blockType", "fontSize", "fontFamily"],
					}}
					// set defualt vlaue
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
