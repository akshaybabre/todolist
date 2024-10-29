// public/script.js

const API_URL = 'http://localhost:5000/api/contacts';
let editMode = false;
let editContactId = null;

async function fetchContacts() {
    const res = await fetch(API_URL);
    const contacts = await res.json();
    renderContacts(contacts);
}

async function addContact(contact) {
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
    });
    fetchContacts();
}

async function updateContact(id, contact) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
    });
    fetchContacts();
}

async function deleteContact(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchContacts();
}

function renderContacts(contacts) {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = contacts.map(contact => `
        <div class="contact-card">
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Phone:</strong> ${contact.phone}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Address:</strong> ${contact.address}</p>
            <button onclick="editContact('${contact._id}')">Edit</button>
            <button onclick="deleteContact('${contact._id}')">Delete</button>
        </div>
    `).join('');
}

// Populate form for editing a contact
function editContact(id) {
    const contact = Array.from(document.getElementsByClassName("contact-card")).find(
        el => el.querySelector("button").getAttribute("onclick") === `editContact('${id}')`
    );

    if (contact) {
        document.getElementById('name').value = contact.querySelector("p:nth-child(1)").innerText.split(": ")[1];
        document.getElementById('phone').value = contact.querySelector("p:nth-child(2)").innerText.split(": ")[1];
        document.getElementById('email').value = contact.querySelector("p:nth-child(3)").innerText.split(": ")[1];
        document.getElementById('address').value = contact.querySelector("p:nth-child(4)").innerText.split(": ")[1];

        editMode = true;
        editContactId = id;
        document.getElementById('contactForm').querySelector("button").innerText = "Update Contact";
    }
}

// Handle Form Submission for Adding or Editing Contact
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const contact = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
    };

    if (editMode) {
        updateContact(editContactId, contact);
        editMode = false;
        editContactId = null;
        document.getElementById('contactForm').querySelector("button").innerText = "Save Contact";
    } else {
        addContact(contact);
    }

    e.target.reset();
});

fetchContacts();
