import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/Auth/AuthReducer";
import { Link } from "react-router-dom";
import { AiFillFileAdd, AiOutlineStar } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsFilterLeft, BsFillDoorOpenFill } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import ModalJoinNote from "../Modal/ModalJoinNote";
import ModalAddNote from "../Modal/ModalAddNote";
import { socket } from "../../utils/socket";
import { BsTrashFill } from "react-icons/bs";
import ModalDeleteNote from "../Modal/ModalDeleteNote";

function SideBar() {
	const auth = useSelector((state) => state.auth);
	const notes = useSelector((state) => state.notes);
	const socketReducer = useSelector((state) => state.socket);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const disconnect = () => {
		localStorage.removeItem("token");
		dispatch(logout());
	};

	if (!auth.user) {
		disconnect();
	}

	const handleEdit = (e) => {
		if (socketReducer.room) {
			console.log("unsub", socketReducer.room);
			socket.emit("unsubscribe", socketReducer.room);
		}
		navigate(`/note/${e}`);
	};

	return (
		<>
			<ModalJoinNote />
			<ModalAddNote />
			<ModalDeleteNote />
			<aside className="sidebar-sticky sidebar">
				<section className="sidebar-title items-center p-4">
					<svg
						fill="none"
						height="42"
						viewBox="0 0 32 32"
						width="42"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect height="100%" rx="16" width="100%"></rect>
						<path
							clipRule="evenodd"
							d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
							fill="currentColor"
							fillRule="evenodd"
						></path>
					</svg>
					<div className="flex flex-col">
						<span>E-Notes</span>
						<span className="text-xs font-normal text-content2">
							Evil is Note
						</span>
					</div>
				</section>

				<section className="p-4  flex items-center justify-center">
					<div className="flex space-x-4">
						<label htmlFor="modal-6">
							<AiFillFileAdd className="rounded text-2xl hover:bg-gray-400 cursor-pointer hover:text-blue-700" />
						</label>

						<label htmlFor="modal-2">
							<AiOutlineLink className="rounded text-2xl hover:bg-gray-400 cursor-pointer hover:text-green-400" />
						</label>
						<label htmlFor="modal-7" onClick={(e) => navigate("/notes")}>
							<BsTrashFill className="rounded text-2xl hover:bg-gray-400 cursor-pointer hover:text-red-400" />
						</label>
					</div>
				</section>
				<hr className="w-11/12 m-auto bg-gray-200" />
				<section className="sidebar-content min-h-[20rem]">
					<nav className="menu rounded-md">
						<section className="menu-section px-4">
							<div className="font-bold">Mes Notes</div>
							{/* only map on note where note.authorId == auth.user.id */}
							{notes.notes &&
								notes?.notes?.map((note) => {
									if (note?.authorId === auth.user.id) {
										return (
											<div
												key={note.id}
												className="menu-item flex-col items-start"
												onClick={(e) =>
													handleEdit(note.id)
												}
											>
												- {note.title}
											</div>
										);
									}
								})}
						</section>
					</nav>
					<nav className="menu rounded-md pt-4">
						<section className="menu-section px-4">
							<div className="font-bold">Notes Partagées</div>
							{/* Only map on note where note.authorId !== auth.user.id */}
							{notes.notes &&
								notes.notes.map((note) => {
									if (note?.authorId !== auth.user.id) {
										return (
											<div
												key={note.id}
												className="menu-item flex-col items-start"
												onClick={(e) =>
													handleEdit(note.id)
												}
											>
												- {note.title}
											</div>
										);
									}
								})}
							{notes?.notes && notes?.notes?.length === 0 && (
								<div className="text-center">Aucune note</div>
							)}
						</section>
					</nav>
				</section>
				<section className="sidebar-footer bg-gray-2 pt-2">
					<div className="flex justify-center items-center p-3 mb-10">
						<Link
							className="text-2xl  hover:text-gray-600"
							onClick={(e) => disconnect()}
							to={"/"}
						>
							<BsFillDoorOpenFill />
						</Link>
					</div>
				</section>
			</aside>
		</>
	);
}

export default SideBar;
