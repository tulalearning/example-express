const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
  });

  res.send(user);
});

router.get('/', async (req, res) => {
  const users = await User.findAll();

  res.send({ data: users });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    res.send(404);
  }

  res.send(user);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email } = req.body;

  const [affectedRow, result] = await User.update(
    { firstName, lastName, email },
    { where: { id }, returning: true },
  );

  if (affectedRow === 0) {
    res.send(404);
  }

  const [user] = result;

  res.send(user);
});

//Soft Delete
router.delete('/:id/soft', async (req, res) => {
  const id = req.params.id;

  const [affectedRow, result] = await User.update(
    { isActive: false },
    { where: { id }, returning: true },
  );

  if (affectedRow === 0) {
    res.send(404);
  }

  const [user] = result;

  res.send(user);
});

//Hard delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const affectedRow = await User.destroy({ where: { id } });

  if (affectedRow === 0) {
    res.send(404);
  }

  res.sendStatus(204);
});

module.exports = router;
