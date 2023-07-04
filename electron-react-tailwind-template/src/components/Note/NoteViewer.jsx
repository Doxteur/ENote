import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { socket } from "../../utils/socket";
import SideBar from "../SideBar/SideBar";

function NoteViewer() {
  const [isConnectedIo, setIsConnectedIo] = useState(false);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    socket.on("disconnect", () => {
      setIsConnectedIo(false);
      console.log("disconnected");
    });
    socket.on("connected", (data) => {
      setIsConnectedIo(true);
    });
    socket.on("editing", (data) => {
      console.log(data);
      setText(data);
    });
    socket.on("disconnected", (data) => {
      console.log(data);
    });
    socket.on("connect", () => {
      console.log("connected");
    });
    return () => {
      socket.close();
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4001/api/rooms/42", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        console.log(data);
        setText(data.text);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(isConnectedIo);
    if (isConnectedIo) {
      // listen
      socket.on("hello", (data) => {
        console.log(data);
      });
    }
  }, [isConnectedIo]);

  const handleChange = (value) => {
    socket.emit("editing", value);
    setText(value);
  };

  window.onbeforeunload = () => {
    socket.close();
    socket.removeAllListeners();
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-200">

      <div className="sticky flex h-screen flex-row gap-4 overflow-y-auto rounded-lg sm:overflow-x-hidden">
        <SideBar />
        <div className="flex items-center justify-center px-5 py-5 pt-24">
          <div className="w-full max-w-6xl mx-auto rounded-xl bg-white shadow-lg p-5 text-black">
            <div className="border border-gray-200 overflow-hidden rounded-md">
              <div className="w-full flex border-b border-gray-200 text-xl text-gray-600">
                <button className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50">
                  <i className="mdi mdi-format-bold"></i>
                </button>
                <button className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50">
                  <i className="mdi mdi-format-italic"></i>
                </button>
                <button className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 mr-1 hover:text-indigo-500 active:bg-gray-50">
                  <i className="mdi mdi-format-underline"></i>
                </button>
                <button className="outline-none focus:outline-none border-l border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50">
                  <i className="mdi mdi-format-paragraph"></i>
                </button>
                <button className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50">
                  <i className="mdi mdi-format-header-1"></i>
                </button>
                <button className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50">
                  <i className="mdi mdi-format-header-2"></i>
                </button>
                <button className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 mr-1 hover:text-indigo-500 active:bg-gray-50">
                  <i className="mdi mdi-format-header-3"></i>
                </button>
                <button className="outline-none focus:outline-none border-l border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50">
                  <i className="mdi mdi-format-list-bulleted"></i>
                </button>
                <button className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 mr-1 hover:text-indigo-500 active:bg-gray-50">
                  <i className="mdi mdi-format-list-numbered"></i>
                </button>
                <button className="outline-none focus:outline-none border-l border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50">
                  <i className="mdi mdi-format-align-left"></i>
                </button>
                <button className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50">
                  <i className="mdi mdi-format-align-center"></i>
                </button>
                <button className="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50">
                  <i className="mdi mdi-format-align-right"></i>
                </button>
              </div>
              <div className="w-full p-2 h-96">
                <textarea
                  className="w-full h-full focus:outline-none border-none"
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                  value={text}
                ></textarea>
              </div>
            </div>
            <Link
              className="btn btn-error btn-sm float-right mx-40"
              onClick={() => {
                socket.close();
                socket.removeAllListeners();
                localStorage.removeItem("token");
              }}
              to="/"
            >
              Se déconnecter
            </Link>
            <Link
              className="btn btn-success btn-sm float-left mx-40"
              onClick={() => {
                socket.close();
                socket.removeAllListeners();
                localStorage.removeItem("token");
              }}
              to="/notes"
            >
              Vos documents
            </Link>
          </div>
        </div>
      </div>


      <Link
        className="btn btn-error btn-sm float-right mx-40"
        onClick={() => {
          socket.close();
          socket.removeAllListeners();
          localStorage.removeItem("token");
        }}
        to="/"
      >
        Se déconnecter
      </Link>
      <Link
        className="btn btn-success btn-sm float-left mx-40"
        onClick={() => {
          socket.close();
          socket.removeAllListeners();
          localStorage.removeItem("token");
        }}
        to="/notes"
      >
        Vos documents
      </Link>
    </div>
  );
}

export default NoteViewer;
