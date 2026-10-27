// Select DOM elements
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const noteCategory = document.getElementById('note-category');
const errorMessage = document.getElementById('error-message');
const searchInput = document.getElementById('search-input');
const noteCount = document.getElementById('note-count');
const notesList = document.getElementById('notes-list');

// Initialize notes array from localStorage or empty array
let notes = JSON.parse(localStorage.getItem('quicknotes')) || [];

// Render initial notes on page load
renderNotes();

// Form submit event handler for adding notes
noteForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const text = noteInput.value.trim();
    const category = noteCategory.value;

    // Validation checks
    if (text === '') {
        errorMessage.textContent = 'Please type a note first.';
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent = 'Notes must be 200 characters or fewer.';
        return;
    }

    // Clear error message upon successful validation
    errorMessage.textContent = '';

    // Create note object
    const newNote = {
        id: Date.now().toString(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    // Add to array, save, and re-render
    notes.push(newNote);
    saveAndRender();

    // Reset form inputs
    noteInput.value = '';
    noteCategory.value = 'Personal';
});

// Search input listener
searchInput.addEventListener('input', function () {
    renderNotes();
});

// Save to localStorage and re-render the list
function saveAndRender() {
    localStorage.setItem('quicknotes', JSON.stringify(notes));
    renderNotes();
}

// Delete a note by its ID
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveAndRender();
}

// Render notes securely using DOM methods (createElement / textContent)
function renderNotes() {
    notesList.innerHTML = '';

    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Filter notes based on search query
    const filteredNotes = notes.filter(note => 
        note.text.toLowerCase().includes(searchTerm)
    );

    // Handle search empty state
    if (filteredNotes.length === 0 && notes.length > 0) {
        const emptySearchItem = document.createElement('li');
        emptySearchItem.textContent = 'No notes match your search.';
        emptySearchItem.style.padding = '1rem';
        emptySearchItem.style.color = '#666';
        emptySearchItem.style.fontStyle = 'italic';
        notesList.appendChild(emptySearchItem);
    } else {
        filteredNotes.forEach(note => {
            const li = document.createElement('li');
            li.className = `note-card category-${note.category.toLowerCase()}`;

            const contentArea = document.createElement('div');
            contentArea.className = 'note-content-area';

            const categoryLabel = document.createElement('span');
            categoryLabel.className = 'note-category-label';
            categoryLabel.textContent = note.category;

            const textP = document.createElement('p');
            textP.className = 'note-text';
            textP.textContent = note.text; // Securely prevents XSS

            const dateSpan = document.createElement('span');
            dateSpan.className = 'note-date';
            dateSpan.textContent = note.createdAt;

            contentArea.appendChild(categoryLabel);
            contentArea.appendChild(textP);
            contentArea.appendChild(dateSpan);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteNote(note.id));

            li.appendChild(contentArea);
            li.appendChild(deleteBtn);
            notesList.appendChild(li);
        });
    }

    // Update count message rules
    if (notes.length === 0) {
        noteCount.textContent = 'You have no notes yet.';
    } else if (notes.length === 1) {
        noteCount.textContent = 'You have 1 note.';
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}