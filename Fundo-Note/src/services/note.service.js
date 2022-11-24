/* eslint-disable prettier/prettier */
import Notes from '../models/note.model';

//create a new note
export const createNote = async (body) => {
  const data = await Notes.create(body);
  return data;
};

//get all notes
export const getAllNotes = async (userID) => {
    const data = await Notes.find(userID);
    return data;
};

//get note by _id
export const getNoteByID = async (_id,userID) => {
    const data = await Notes.findById(_id,userID);
    return data;
};

//update note by _id
export const updateNoteByID = async (_id,body) => {
    const data = await Notes.findOneAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
};

//delete note by _id
export const deleteNoteByID = async (_id,userID) => {
    const data = await Notes.findOneAndDelete(_id,userID);
    return data;
};