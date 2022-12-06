/* eslint-disable prettier/prettier */
import Notes from '../models/note.model';
import { client } from '../config/redis';

//create a new note
export const createNote = async (body) => {
    await client.del('getAllNotes')
    const data = await Notes.create(body);
    return data;
};

//get all notes
export const getAllNotes = async (userID) => {
    const data = await Notes.find(userID);
    await client.set('getAllNotes', JSON.stringify(data));
    return data;
};

//get note by _id
export const getNoteByID = async (_id, userID) => {
    const data = await Notes.findById(_id, userID);
    return data;
};

//update note by id
export const updateNoteByID = async (_id, userID, body) => {
    await client.del('getAllNotes');
    const data = await Notes.findOneAndUpdate(
        {
            _id,
            userID
        },
        body,
        {
            new: true
        }
    );
    if (data !== null) {
        return data;
    } else {
        throw new Error('Incorrect note ID');
    }
};

//delete note by _id
export const deleteNoteByID = async (_id, userID) => {
    await client.del('getAllNotes');
    const data = await Notes.findOneAndDelete(_id, userID);
    return data;
};

//archive Note by _id
export const archiveNote = async (_id, userID) => {
    await client.del('getAllNotes');
    const data = await Notes.findByIdAndUpdate(
        {
            _id,
            userID
        },
        {
            IsArchive: true
        },
        {
            new: true
        }
    );
    return data;
};

//trash Note by _id
export const trashNote = async (_id, userID) => {
    await client.del('getAllNotes');
    const data = await Notes.findByIdAndUpdate(
        {
            _id,
            userID
        },
        {
            IsTrash: true
        },
        {
            new: true
        }
    );
    return data;
};