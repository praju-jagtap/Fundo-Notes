/* eslint-disable prettier/prettier */
import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new note
router.post('', newNoteValidator, userAuth, noteController.createNote);

//route to get all notes
router.get('', userAuth ,noteController.getAllNotes);

//route to get perticular or single note
router.get('/:_id', userAuth, noteController.getNoteByID);

//route to update perticular or single note
router.put('/:_id', userAuth, noteController.updateNoteByID);

//route to delete perticular or single note
router.delete('/:_id', userAuth, noteController.deleteNoteByID);

//route to make note archive
router.put('/:_id/isArchive', userAuth, noteController.archiveNote);

//route to make notes trash
router.put('/:_id/isTrash', userAuth, noteController.trashNote);

export default router;