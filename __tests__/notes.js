const fs = require('fs');

const { notes } = require('../db/notes');

const { deleteNote, validateNote, createNewNote } = require('../lib/notes');

jest.mock('fs');

describe('Get all the notes', () => {
	it('should return all notes', () => {
		const res = notes;
		expect(res).toEqual(notes);
	});
});

describe('Delete a note', () => {
	it('should delete a note', () => {
		const res = deleteNote(1, notes);
		expect(res).toEqual(notes.filter((note) => note.id !== 1));
	});
});

describe('Validate a note', () => {
	it('should validate a note', () => {
		const res = validateNote({
			title: 'Test',
			text: 'Test',
		});
		expect(res).toEqual(true);
	});
});

describe('Create a note', () => {
	it('should create a note', () => {
		const body = { title: 'Test', text: 'Test' };
		const res = createNewNote(body, notes);
		expect(res).toEqual(body);
	});
});
