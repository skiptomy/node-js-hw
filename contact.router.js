const { Router } = require("express");

const {
  getAllContacts,
  addContact,
  findContactById,
  findContactByIdAndUpdate,
  findContactByIdAndRemove,
} = require("./contact.model");

const {
  validateCreateContactMiddleware,
  validateUpdateContactMiddleware,
} = require("./contact.validator");

const contactRouter = Router();

contactRouter.get("/", async (req, res) => {
  const contacts = await getAllContacts();
  res.json(contacts);
});

contactRouter.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await findContactById(+contactId);

  if (contact) {
    res.status(200).json(contact);
  }
  res.status(404).json({ "message": "Not Found" });
});

contactRouter.post("/", validateCreateContactMiddleware, async (req, res) => {
  const createdContact = await addContact(req.body);
  res.status(201).json(createdContact);
  res.end();
});

contactRouter.patch(
  "/:contactId",
  validateUpdateContactMiddleware,
  async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await findContactByIdAndUpdate(+contactId, req.body);
    if (updatedContact) {
      res.json(updatedContact);
    }
    res.status(404).json({ message: "Not found" });
    res.end();
  }
);

contactRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedContact = await findContactByIdAndRemove(+id);
  if (updatedContact) {
    res.json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
  res.end();
});

module.exports = {
  contactRouter,
};
