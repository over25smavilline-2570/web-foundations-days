// Starting notes array
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. Search notes by word (case-insensitive)
function searchNotes(word) {
  const query = word.toLowerCase();
  return notes.filter((note) => note.text.toLowerCase().includes(query));
}

// 2. Find the longest note object
function longestNote() {
  if (notes.length === 0) return null;
  return notes.reduce((longest, current) => 
    current.text.length > longest.text.length ? current : longest
  );
}

// 3. Count notes per category
function countByCategory() {
  const counts = { personal: 0, work: 0, study: 0 };
  notes.forEach((note) => {
    if (counts[note.category] !== undefined) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  });
  return counts;
}

// 4. Generate a summary sentence with proper pluralization
function getSummary() {
  const counts = countByCategory();
  const noteWord = notes.length === 1 ? "note" : "notes";
  return `${notes.length} ${noteWord}: ${counts.personal} personal, ${counts.work} work, ${counts.study} study.`;
}

// 5. Check for duplicates (ignoring case and extra spaces)
function isDuplicate(text) {
  const cleaned = text.trim().toLowerCase();
  return notes.some((note) => note.text.trim().toLowerCase() === cleaned);
}

// 6. Add a note with full validation
function addNote(text, category) {
  const cleaned = text.trim();
  const validCategories = ["personal", "work", "study"];

  if (cleaned.length === 0 || cleaned.length > 200) {
    console.log(`❌ Note rejected: must be 1-200 characters.`);
    return false;
  }
  if (!validCategories.includes(category)) {
    console.log(`❌ Note rejected: invalid category "${category}".`);
    return false;
  }
  if (isDuplicate(text)) {
    console.log(`❌ Note rejected: duplicate note already exists.`);
    return false;
  }

  const newNote = {
    id: Date.now(),
    text: cleaned,
    category: category,
  };

  notes.push(newNote);
  console.log(`✅ Added: "${newNote.text}" (${newNote.category})`);
  return true;
}

// --- Tests ---

// searchNotes tests
console.log(searchNotes("study")); // Expected: [{ id: 2, ... }, { id: 4, ... }]
console.log(searchNotes("xyz"));   // Expected: []

// longestNote tests
console.log(longestNote());        // Expected: { id: 3, text: "Email the project report to Grace", category: "work" }
// (Edge case: testing with empty array)
notes = [];
console.log(longestNote());        // Expected: null

// Restore notes for remaining tests
notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// countByCategory tests
console.log(countByCategory());    // Expected: { personal: 2, work: 1, study: 2 }
notes = [{ id: 1, text: "Single note", category: "work" }];
console.log(countByCategory());    // Expected: { personal: 0, work: 1, study: 0 }

// Restore notes again
notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// getSummary tests
console.log(getSummary());         // Expected: "5 notes: 2 personal, 1 work, 2 study."
notes = [{ id: 1, text: "Only one", category: "personal" }];
console.log(getSummary());         // Expected: "1 note: 1 personal, 0 work, 0 study."

// Restore notes
notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// isDuplicate tests
console.log(isDuplicate("buy milk and bread")); // Expected: true
console.log(isDuplicate("Brand new note"));    // Expected: false

// addNote tests
addNote("Prepare slides", "work");             // Expected: ✅ Added: "Prepare slides" (work)
addNote("Buy milk and bread", "personal");     // Expected: ❌ Note rejected: duplicate note already exists.