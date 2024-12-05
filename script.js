const noteListEl = document.querySelector(".notes-list");
const saveButtonEl = document.querySelector(".save-note");
const titleInputEl = document.getElementById("input-title");
const textInputEl = document.getElementById("input-text");
const deleteButtonEl = document.querySelector(".delete-note");

deleteButtonEl.addEventListener("click", clickDeleteButton);

displayNotesList();
applyListener();
// let element = document.querySelectorAll(".note-box");
// let notes = document.querySelector("#input-text");

// for (let i = 0; i < element.length; i++) {
//   element[i].addEventListener("click", function () {
//     notes.innerHTML = testNotes[i];
//   });
// } new Date().getTime()

function applyListener() {
  const noteBoxEl = document.querySelectorAll(".note-box");
  noteBoxEl.forEach((noteBox) => {
    noteBox.addEventListener("click", () =>
      showNote(noteBox.getAttribute("data-id"))
    );
  });
}

function displayNotesList() {
  const notes = getNotes();

  const sortedNotes = notes.sort((noteA, noteB) => noteB.date - noteA.date);

  let html = "";

  sortedNotes.forEach((note) => {
    html += `
       <div class="note-box" data-id="${note.id}">
            <div class="note-title">${note.title}</div>
            <div class="note-text">
              ${note.text}
            </div>
            <div class="note-time">${new Date(note.date).toLocaleString()}</div>
          </div> `;
  });

  noteListEl.innerHTML = html;
}

// testNotes.sort(function (a, b) {
//   return a.date.localeCompare(b.date);
// });

// function saveNote() {
//   noteList.innerHTML += "<div>" + inputTitle.value + "<div>";
//   noteList.innerHTML += "<div>" + inputText.value + "<div>";
//   noteText.value = "";
//   noteTitle.value = "";
// }
function saveNoteClick() {
  const title = titleInputEl.value;
  const text = textInputEl.value;
  if (!title) {
    alert("Bitte Titel eingeben");
    return;
  }
  // || !text
  saveNote(title, text, Number(getCurrentId()));
  // noteListEl.innerHTML += `
  //   <div class="note-box" data-id="${note.id}">
  //     <div class="note-title">${title.value}</div>
  //     <div class="note-text">${text.value}</div>
  //     <div class="note-time">${new Date(note.date).toLocaleString()}</div>
  //   </div>
  // `;
  displayNotesList();
  applyListener();
}

function showNote(id) {
  const showNoteEl = document.querySelector(`.note-box[data-id="${id}"]`);

  if (showNoteEl.classList.contains("selected-note")) return;

  const noteBoxEl = document.querySelectorAll(`.note-box`);
  noteBoxEl.forEach((showNote) => {
    showNote.classList.remove("selected-note");
  });
  showNoteEl.classList.add("selected-note");

  const notes = getNotes();

  const showedNote = notes.find((note) => note.id === Number(id));
  if (!showedNote) return;

  titleInputEl.value = showedNote.title;
  textInputEl.value = showedNote.text;
}

function createNote() {
  titleInputEl.value = "";
  textInputEl.value = "";
  const noteBoxEl = document.querySelectorAll(`.note-box`);
  noteBoxEl.forEach((showNote) => {
    showNote.classList.remove("selected-note");
  });
}

function clickDeleteButton() {
  const currentlySelectedId = getCurrentId();
  if (!currentlySelectedId) return;
  deleteNote(currentlySelectedId);
  titleInputEl.value = "";
  textInputEl.value = "";
  displayNotesList();
  applyListener();
}

function getCurrentId() {
  let currentId = undefined;

  const currentlySelectedNoteEl = document.querySelector(".selected-note");

  if (currentlySelectedNoteEl) {
    currentId = currentlySelectedNoteEl.getAttribute("data-id");
  }
  return currentId;
}
