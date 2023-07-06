import {
	convertToRaw,
	EditorState,
	ContentState,
	convertFromHTML,
} from "draft-js";
import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/Auth/AuthReducer";
import SideBar from "../../SideBar/SideBar";

export default function EditorWiz() {
	const dispatch = useDispatch();

	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty(),
	);
	const [text, setText] = useState();
	const onEditorStateChange = function (editorState) {
		setEditorState(editorState);
		const { blocks } = convertToRaw(editorState.getCurrentContent());
		let text = editorState.getCurrentContent().getPlainText("\u0001");
		text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
	};

	useEffect(() => {
		const blocksFromHTML = convertFromHTML("Hello world");
		const state = ContentState.createFromBlockArray(
			blocksFromHTML.contentBlocks,
			blocksFromHTML.entityMap,
		);
		setEditorState(EditorState.createWithContent(state));
	}, []);


	const logOff = () => {
		localStorage.removeItem("token");
		dispatch(logout());
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
				editorStyle={{ border: "1px solid black", lineHeight: "1.2" }}
				// default
				toolbar={{
					options: ["inline", "blockType", "fontSize", "fontFamily"],
				}}
			/>
			<div className="w-1/2 m-auto mt-20">
				{/* Se deconnecter */}
				<Link
					onClick={(e) => {
						logOff();
					}}
					to="/"
				>
					Se déconnecter
				</Link>
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
