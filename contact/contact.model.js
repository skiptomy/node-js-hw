const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { versionKey: false }
);

class Contact {
  constructor() {
    this.contact = mongoose.model("Contact", contactSchema);
  }

  getAllContacts = async () => {
    return await this.contact.find();
  };

  findContactById = async (id) => {
    return await this.contact.findById(id);
  };

  addContact = async (contact) => {
    return await this.contact.create(contact);
  };

  updateContact = async (id, data) => {
    return await this.contact.findByIdAndUpdate(id, data, { new: true });
  };

  removeContactById = async id => {
    return await this.contact.findByIdAndDelete(id);
  };
}



module.exports = new Contact();
