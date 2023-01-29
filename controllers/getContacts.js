const { Contact } = require('../models/contact');
const { HttpError } = require('../helpers');

const getContacts = async (req, res, next) => {
  const contacts = await Contact.find({});

  if (!contacts.length) {
    return next(new HttpError(400, 'Contacts not found'));
  }

  res.json(contacts);
};

module.exports = getContacts;