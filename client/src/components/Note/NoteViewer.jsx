import React, { useEffect, useState } from "react";
import { socket } from "../../utils/socket";

function NoteViewer() {
  const [isConnectedIo, setIsConnectedIo] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnectedIo(true);
      console.log("connected");
    });
    socket.on("disconnect", () => {
      setIsConnectedIo(false);
      console.log("disconnected");
    });
    socket.on("connected", (data) => {
      console.log(data);
    });
    socket.on("editing", (data) => {
      console.log(data);
      setText(data);
    });
    socket.on("disconnected", (data) => {
      console.log(data);
    });

    fetch("http://localhost:4001/api/rooms/42")
      .then((res) => res.json())
      .then((data) => console.log(data));

    return () => {
      socket.close();
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
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
    <div>
      <h1>Text</h1>
      <input
        type="text"
        className="border border-black"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={text}
      />
    </div>
  );
}

export default NoteViewer;
