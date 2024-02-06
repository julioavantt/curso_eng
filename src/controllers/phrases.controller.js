import { Op, literal } from "sequelize";

import Phrase from "../models/phrases.model.js";

async function readPhrases(_, res) {
 try {
  await Phrase.sync();
  const data = await Phrase.findAll({
   attributes: { exclude: ["createdAt", "updatedAt"] },
   limit: 10,
   order: literal("rand()"),
   where: {
    points: {
     [Op.not]: 3,
    },
   },
  });

  const zero = await Phrase.count({
   distinct: true,
   where: {
    points: 0,
   },
  });
  const one = await Phrase.count({
   distinct: true,
   where: {
    points: 1,
   },
  });
  const two = await Phrase.count({
   distinct: true,
   where: {
    points: 2,
   },
  });
  const three = await Phrase.count({
   distinct: true,
   where: {
    points: 3,
   },
  });
  res.status(200).json({ data, zero, one, two, three });
 } catch (error) {
  res.status(400).json({ message: error.message });
 }
}

async function editPhrase(req, res) {
 try {
  await Phrase.sync();
  await Phrase.update(
   { points: literal("points + 1") },
   { where: { id_phrase: req.body.id_phrase } }
  ).then((response) => res.status(200).json(response));
 } catch (error) {
  res.status(400).json({ message: error.message });
 }
}

export { editPhrase, readPhrases };
