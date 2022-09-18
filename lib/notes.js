const fs = require('fs');
const path = require('path');

// function to filter out deleted note
function deleteNote(id, notesArray) {
	const result = notesArray.filter((note) => note.id !== id);

	fs.writeFileSync(
		path.join(__dirname, '../db/notes.json'),
		JSON.stringify({ notes: result }, null, 2)
	);
	return result;
}

// function to validate note
function validateNote(note) {
	if (!note.title || typeof note.title !== 'string') {
		return false;
	}
	if (!note.text || typeof note.text !== 'string') {
		return false;
	}
	return true;
}

// function to create new note
function createNewNote(body, notesArray) {
	const note = body;
	let newNoteArray = [...notesArray, note];
	fs.writeFileSync(
		path.join(__dirname, '../db/notes.json'),
		JSON.stringify({ notes: newNoteArray }, null, 2)
	);
	return note;
}

module.exports = {
	deleteNote,
	validateNote,
	createNewNote,
};
