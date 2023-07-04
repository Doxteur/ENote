import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotes } from "../../features/Notes/NotesReducer";
import SideBar from "../SideBar/SideBar";


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

      <div className="sticky flex h-screen flex-row gap-4 overflow-y-auto rounded-lg sm:overflow-x-hidden">
        <SideBar />
        <div className="flex flex-row flex-wrap gap-4 p-6 ">
          <div className="my-4 grid w-full grid-cols-3 gap-4 ">
            <div className="card">
              <div className="card-body">
                <h2 className="card-header">Maximizing Your Productivity at Work</h2>
                <p className="text-content2">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitationserunt mollit anim id est laborum.</p>
                <div className="card-footer">
                  <button className="btn-secondary btn" onClick={
                    e => handleEdit("42")
                  }>Edit</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h2 className="card-header">Maximizing Your Productivity at Work</h2>
                <p className="text-content2">Lorem ipsum dolor sit  consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="card-footer">
                  <button className="btn-secondary btn" onClick={
                    e => handleEdit("42")
                  }>Edit</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h2 className="card-header">Maximizing Your Productivity at Work</h2>
                <p className="text-content2">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis , sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="card-footer">
                  <button className="btn-secondary btn" onClick={
                    e => handleEdit("42")
                  }>Edit</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h2 className="card-header">Maximizing Your Productivity at Work</h2>
                <p className="text-content2">Lorem ipqui officia deserunt mollit anim id est laborum.</p>
                <div className="card-footer">
                  <button className="btn-secondary btn" onClick={
                    e => handleEdit("42")
                  }>Edit</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h2 className="card-header">Maximizing Your Productivity at Work</h2>
                <p className="text-content2">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud elit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="card-footer">
                  <button className="btn-secondary btn" onClick={
                    e => handleEdit("42")
                  }>Edit</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h2 className="card-header">Maximizing Your Productivity at Work</h2>
                <p className="text-content2">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incidsse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="card-footer">
                  <button className="btn-secondary btn" onClick={
                    e => handleEdit("42")
                  }>Edit</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h2 className="card-header">Maximizing Your Productivity at Work</h2>
                <p className="text-content2">Lorem ipsum lum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="card-footer">
                  <button className="btn-secondary btn" onClick={
                    e => handleEdit("42")
                  }>Edit</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h2 className="card-header">Maximizing Your Productivity at Work</h2>
                <p className="text-content2">Lorem ipsum dolor i ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="card-footer">
                  <button className="btn-secondary btn" onClick={
                    e => handleEdit("42")
                  }>Edit</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h2 className="card-header">Maximizing Your Productivity at Work</h2>
                <p className="text-content2">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="card-footer">
                  <button className="btn-secondary btn" onClick={
                    e => handleEdit("42")
                  }>Edit</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h2 className="card-header">Maximizing Your Productivity at Work</h2>
                <p className="text-content2">Loremit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="card-footer">
                  <button className="btn-secondary btn" onClick={
                    e => handleEdit("42")
                  }>Edit</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h2 className="card-header">Maximizing Your Productivity at Work</h2>
                <p className="text-content2">Lorem i cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="card-footer">
                  <button className="btn-secondary btn" onClick={
                    e => handleEdit("42")
                  }>Edit</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h2 className="card-header">Maximizing Your Productivity at Work</h2>
                <p className="text-content2">Loremnt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="card-footer">
                  <button className="btn-secondary btn" onClick={
                    e => handleEdit("42")
                  }>Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
}

export default NoteListes;
