import React, { useState } from "react";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';

function EditNotes({ id, noted, update }) {
  const [editedNote, setEditedNote] = useState({
    title: noted.title,
    content: noted.content,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (event) => {
    setEditedNote({
      ...editedNote,
      title: event.target.value,
    });
  };

  const handleContentChange = (event) => {
    setEditedNote({
      ...editedNote,
      content: event.target.value,
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updateNote = async () => {
    try {
      const body = {
        title: editedNote.title,
        content: editedNote.content,
      };
      const response = await fetch(`https://noteskeeper-s2ul.onrender.com/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        update(); // Refresh the notes after update
        setIsEditing(false); // Exit edit mode
      } else {
        console.error("Failed to update note. Server returned:", response.status);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="note-container">
      {!isEditing ? (
        <>
          <button onClick={toggleEdit}>
            <EditNoteTwoToneIcon />
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            className="form-control"
            value={editedNote.title}
            onChange={handleTitleChange}
          />
          <textarea
            className="form-control"
            value={editedNote.content}
            onChange={handleContentChange}
          ></textarea>
          <button onClick={updateNote} style={{marginRight:"5px", marginTop:"2px", border:"1px solid black"}}><AddBoxIcon/></button>
          <button onClick={toggleEdit} style={{marginLeft:"10px", border:"1px solid black"}}><CancelIcon/></button>
        </>
      )}
    </div>
  );
}

export default EditNotes;
