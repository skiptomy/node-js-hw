const fs = require("fs").promises;

class Contact {
  constructor({ name, email, phone }, id) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

const getAllContacts = async () => {
  const contacts = await fs.readFile("contacts.json", "utf-8");
  return JSON.parse(contacts);
};

const addContact = async (contact) => {
  const contactsData = await getAllContacts();
  const newId = [...contactsData].pop().id + 1;
  const createdContact = new Contact(contact, newId);
  contactsData.push(createdContact);
  await fs.writeFile("contacts.json", JSON.stringify(contactsData));
  return createdContact;
};

const findContactById = async (id) => {
  const contactsData = await getAllContacts();
  return contactsData.find((item) => item.id === id);
};

const findContactByIdAndUpdate = async (id, data) => {
  const contactsData = await getAllContacts();
  const result = contactsData.map((item) => {
    if (item.id === id) {
      return { ...item, ...data };
    }
    return item;
  });
  await fs.writeFile("contacts.json", JSON.stringify(result));
  return result.find((contact) => contact.id === id);
};

const findContactByIdAndRemove = async (id) => {
  const contactsData = await getAllContacts();
  const result = contactsData.filter((item) => item.id !== id);
  await fs.writeFile("contacts.json", JSON.stringify(result));
  return result;
};

module.exports = {
  getAllContacts,
  addContact,
  findContactById,
  findContactByIdAndUpdate,
  findContactByIdAndRemove,
};
