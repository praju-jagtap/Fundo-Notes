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