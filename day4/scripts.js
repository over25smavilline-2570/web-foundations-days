const notetext = document.querySelector("#note-text");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");
const claerBtn = document.querySelector("#clear-btn");
const themetoggle = document.querySelector("#theme-toggle");

const Draft_Key = "quicknotes_draft";
const Theme_Key = "quicknotes_theme";

//update character and word counts,plus warning classes
function updateCounts() {
    const text = notetext.value;
    const charLength = text.length;

    //word count logic: split by whitespace, filter out empty strings
    const words = text.trim()===""?0:text.trim().split(/\s+/).length;

//handle character count and warning classes
    charCount.classList.remove("warning", "over");
    if (charLength > 200) {
        charCount.classList.add("over");
    } else if (charLength > 180) {
        charCount.classList.add("warning");
    }
}
        //save draft and update counts on inputs
        notetext.addEventListener("input", () => {
            updateCounts();
    localStorage.setItem(Draft_Key, notetext.value);
        });

//clear note function 
function clearNote() {
    notetext.value="";
    localStorage.removeItem(Draft_Key);
    updateCounts();
    notetext.focus();
}


    clearBtn.addEventListener("click", clearNote);

    //Escape key shortcut to clear
    notetext.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            clearNote();
        }
    });

        //Theme toggle Handler
        themetoggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            const isDark = document.body.classList.contains("dark");
            themetoggle.textContent=isDark ? " Light Mode" : " Dark Mode";
            localStorage.setItem(Theme_Key, isDark ? "dark" : "light");
        });
    //load initial state on page startup
    function innit() {
        //Restore draft
        const savedDraft = localStorage.getItem(Draft_Key);
        if (saveddraft !==null)
            notetext.value=savedDraft
    }
        //Restore theme
        const savedtheme = localStorage.getItem(Theme_Key);
        if (savedtheme ==="dark")
            document.body.classList.add("dark);
        themetoggle.textContent=" Light Mode";
             } else {
            themetoggle.textcontent="Dark mode"
        }
            updateCounts
    }

            innit();