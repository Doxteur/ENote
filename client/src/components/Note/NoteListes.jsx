import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotes } from "../../features/Notes/NotesReducer";

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
    <div className="bg-gray-200 h-screen">
      <div className="grid grid-cols-4 p-20">
        <div className="p-6">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full" src="/mountain.jpg" alt="Mountain" />
            <div className="px-6 py-4 ">
              <div className="font-bold text-xl mb-2">Mountain</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, Nonea! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 float-right hover:bg-green-500 hover:text-white "
              onClick={
                e => handleEdit("42")
              }>
                Editer
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full" src="/mountain.jpg" alt="Mountain" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Mountain</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, Nonea! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 float-right hover:bg-green-500 hover:text-white ">
                Editer
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full" src="/mountain.jpg" alt="Mountain" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Mountain</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, Nonea! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 float-right hover:bg-green-500 hover:text-white ">
                Editer
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full" src="/mountain.jpg" alt="Mountain" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Mountain</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, Nonea! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 float-right hover:bg-green-500 hover:text-white ">
                Editer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteListes;
