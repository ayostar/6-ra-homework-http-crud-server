const { nanoid } = require("nanoid");

class Notes {
  constructor(notesList = []) {
    this.list = notesList;
  }

  remove(noteID) {
    this.list = this.list.filter((note) => note.id !== noteID);
  }

  add(content) {
    this.list.unshift({
      id: nanoid(),
      content,
    });
  }
}

module.exports = Notes;
