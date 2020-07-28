const { Router } = require("express");
const Contact = require("./contact.model");

const {
  validateCreateContactMiddleware,
  validateUpdateContactMiddleware,
} = require("./contact.validator");
const { updateContact } = require("./contact.model");

const contactRouter = Router();

contactRouter.get("/", async (req, res) => {
  const contacts = await Contact.getAllContacts();
  res.json(contacts);
  res.end();
});

contactRouter.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findContactById(contactId);

  if (contact) {
    res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not Found" });
});

contactRouter.post("/", validateCreateContactMiddleware, async (req, res) => {
  try {
    await Contact.addContact(req.body);
    res.status(201).json(createdContact);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    res.end();
  }
});

contactRouter.patch(
  "/:contactId",
  validateUpdateContactMiddleware,
  async (req, res) => {
    try {
      const { contactId } = req.params;
      const updatedContact = await updateContact(contactId, req.body);
      if (updatedContact) {
        res.json(updatedContact);
      }
      res.status(404).json({ message: "Not found" });
    } catch (error) {
      res.status(500).send(error);
    } finally {
      res.end();
    }
  }
);

contactRouter.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.removeContactById(contactId);

  if (removedContact) {
    res.json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
  res.end();
});

module.exports = {
  contactRouter,
};
