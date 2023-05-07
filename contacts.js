const { v4: uuidv4 } = require("uuid");

const fs = require('fs').promises;
const path = require('path');
const { writeFile } = require("fs");

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId) || null;
    return contact;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const i = contacts.findIndex((item) => item.id === contactId);
    if (i === -1) return null;
    const reContact = contacts.splice(i, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return reContact[0];
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: uuidv4(),
        name, 
        email, 
        phone
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {listContacts, getContactById, removeContact, addContact};