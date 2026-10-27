const loadUsersBtn = document.getElementById('load-users');
const filterInput = document.getElementById('filter-input');
const statusP = document.getElementById('status');
const usersList = document.getElementById('users-list');

let allUsers = [];

loadUsersBtn.addEventListener('click', loadUsers);

filterInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = allUsers.filter(user => 
        user.name.toLowerCase().includes(query)
    );
    renderUsers(filtered);
});

async function loadUsers() {
    loadUsersBtn.disabled = true;
    statusP.textContent = 'Loading users...';
    usersList.innerHTML = '';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        allUsers = await response.json();
        renderUsers(allUsers);
        statusP.textContent = `Successfully loaded ${allUsers.length} users.`;

    } catch (error) {
        statusP.textContent = `Failed to load users: ${error.message}`;
    } finally {
        loadUsersBtn.disabled = false;
    }
}

function renderUsers(users) {
    usersList.innerHTML = '';

    if (users.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No users match your filter.';
        li.style.color = '#666';
        li.style.fontStyle = 'italic';
        usersList.appendChild(li);
        return;
    }

    users.forEach(user => {
        const li = document.createElement('li');
        li.className = 'user-card';

        const nameH3 = document.createElement('h3');
        nameH3.textContent = user.name;

        const emailP = document.createElement('p');
        emailP.textContent = `Email: ${user.email}`;

        const cityP = document.createElement('p');
        cityP.textContent = `City: ${user.address.city}`;

        const companyP = document.createElement('p');
        companyP.textContent = `Company: ${user.company.name}`;

        li.appendChild(nameH3);
        li.appendChild(emailP);
        li.appendChild(cityP);
        li.appendChild(companyP);

        usersList.appendChild(li);
    });
}