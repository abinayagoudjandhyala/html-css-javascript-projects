const toggleCreateBtn = document.getElementById("toggleCreateBtn");
const noteInputCard = document.getElementById("noteInputCard");
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

// ------------------------------
// Load notes from localStorage on page load
// ------------------------------
window.onload = () => {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

  if (savedNotes.length === 0) {
    showEmptyMessage();
  } else {
    savedNotes.forEach(text => createNoteElement(text));
  }
};

// ------------------------------
// Show / hide the note input card
// ------------------------------
toggleCreateBtn.addEventListener("click", () => {
  noteInputCard.classList.toggle("hidden");

  if (!noteInputCard.classList.contains("hidden")) {
    noteInput.focus();
  }
});

// ------------------------------
// Add note on Save button click
// ------------------------------
addNoteBtn.addEventListener("click", addNote);

// Also allow Ctrl+Enter to save
noteInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
    addNote();
  }
});

// ------------------------------
// Add a new note
// ------------------------------
function addNote() {
  const text = noteInput.value.trim();
  if (text === "") return;

  // Save note to storage
  saveNoteToLocal(text);

  // Create visual note
  createNoteElement(text);

  // Clear input
  noteInput.value = "";
}

// ------------------------------
// Create and display a note element
// ------------------------------
function createNoteElement(text) {
  removeEmptyMessage();

  const note = document.createElement("div");
  note.className = "note";

  const noteText = document.createElement("div");
  noteText.className = "note-text";
  noteText.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    // remove from UI
    notesContainer.removeChild(note);

    // remove from storage
    removeNoteFromLocal(text);

    checkIfEmpty();
  });

  note.appendChild(noteText);
  note.appendChild(deleteBtn);
  notesContainer.appendChild(note);
}

// ------------------------------
// Save note to localStorage
// ------------------------------
function saveNoteToLocal(text) {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.push(text);
  localStorage.setItem("notes", JSON.stringify(savedNotes));
}

// ------------------------------
// Remove a note from localStorage
// ------------------------------
function removeNoteFromLocal(text) {
  let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes = savedNotes.filter(note => note !== text);
  localStorage.setItem("notes", JSON.stringify(savedNotes));
}

// ------------------------------
// Show empty message
// ------------------------------
function showEmptyMessage() {
  // If message already exists, don't add again
  if (notesContainer.querySelector(".empty-text")) return;

  const msg = document.createElement("p");
  msg.className = "empty-text";
  msg.textContent = 'No notes yet. Click “Create Note” to add one!';
  notesContainer.appendChild(msg);
}

function removeEmptyMessage() {
  const emptyMsg = notesContainer.querySelector(".empty-text");
  if (emptyMsg) emptyMsg.remove();
}

// ------------------------------
// If no notes remain, show empty message
// ------------------------------
function checkIfEmpty() {
  const hasNotes = notesContainer.querySelector(".note");
  if (!hasNotes) {
    showEmptyMessage();
  }
}
