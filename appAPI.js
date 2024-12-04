const localST = "notesLS";

// const testNotes = [
//   {
//     id: 1,
//     title: "Der Titel",
//     text: "hier steht deine Notiz",
//     date: 1733165828022,
//   },
//   {
//     id: 2,
//     title: "Der Titel2",
//     text: "hier steht deine Notiz",
//     date: 1733175828022,
//   },
//   {
//     id: 3,
//     title: "Der Titel3",
//     text: "hier steht deine Notiz",
//     date: 1733185828022,
//   },
//   {
//     id: 4,
//     title: "Der Titel4",
//     text: "hier steht deine Notiz",
//     date: 1733145828022,
//   },
// ];
// localStorage.setItem(localST, JSON.stringify(testNotes));

function getNotes() {
  return JSON.parse(localStorage.getItem(localST)) || [];
}
function saveNote(title, text, id = undefined) {
  const notes = getNotes();
  if (!id) {
    notes.push({
      title,
      text,
      id: getNextId(),
      date: new Date().getTime(),
    });
  } else {
    const indexOfNoteWithId = notes.findIndex((note) => note.id === id);
    if (indexOfNoteWithId > -1) {
      notes[indexOfNoteWithId] = {
        title,
        text,
        id,
        date: new Date().getTime(),
      };
    }
  }
  localStorage.setItem(localST, JSON.stringify(notes));
  titleInputEl.value = "";
  textInputEl.value = "";
  // noteListEl.innerHTML += `
  //   <div class="note-box" data-id="${note.id}">
  //     <div class="note-title">${title.value}</div>
  //     <div class="note-text">${text.value}</div>
  //     <div class="note-time">${new Date(note.date).toLocaleString()}</div>
  //   </div>
  // `;
}

function getNextId() {
  const notes = getNotes();
  const sortedNotes = notes.sort((noteA, noteB) => noteA.id - noteB.id);
  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId < note.id) break;
    nextId = note.id + 1;
  }

  return nextId;
}
