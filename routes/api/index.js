const router = require('express').Router();
const { notes } = require('../../db/db.json');
const { createNewNote, validateNote, deleteNote } = require('../../lib/notes');

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/notes', (req, res) => {
	let results = notes;
	res.json(results);
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
router.post('/notes', (req, res) => {
	// set id based on what the next index of the array will be
	let newID = notes.length + 1;
	req.body.id = newID.toString();

	// if any data in req.body is incorrect, send 400 error back
	if (!validateNote(req.body)) {
		res.status(400).send('The note is not properly formatted.');
	} else {
		// add note to json file and notes array in this function
		const note = createNewNote(req.body, notes);
		res.json(note);
	}
});

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
router.delete('/notes/:id', (req, res) => {
	const result = deleteNote(req.params.id, notes);

	if (!result) {
		res.status(404).send('The note with the given ID was not found.');
	} else {
		res.json(result);
	}
});

module.exports = router;
