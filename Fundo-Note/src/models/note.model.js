/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';
const NoteSchema = new Schema(
    {
        Title: {type: String},
        Descreption: {type: String},
        Color: {type: String},
        userID: {type: String},
        IsArchive: {type: Boolean},
        IsTrash: {type: Boolean}
        },
      {
          timestamps: true
      }
      );
export default model('Notes', NoteSchema);