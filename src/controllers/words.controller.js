import { Op, literal } from "sequelize";
import { v4 } from "uuid";

import Word from "../models/words.model.js";

async function readWords(_, res) {
 try {
  await Word.sync();
  const data = await Word.findAll({
   attributes: { exclude: ["createdAt", "updatedAt"] },
   limit: 10,
   order: literal("rand()"),
   where: {
    points: {
     [Op.not]: 3,
    },
   },
  });

  const zero = await Word.count({
   distinct: true,
   where: {
    points: 0,
   },
  });
  const one = await Word.count({
   distinct: true,
   where: {
    points: 1,
   },
  });
  const two = await Word.count({
   distinct: true,
   where: {
    points: 2,
   },
  });
  const three = await Word.count({
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

async function editWord(req, res) {
 try {
  await Word.sync();
  await Word.update(
   { points: literal("points + 1") },
   { where: { id_word: req.body.id_word } }
  ).then((response) => res.status(200).json(response));
 } catch (error) {
  res.status(400).json({ message: error.message });
 }
}

async function addWord(req, res) {
 try {
  await Word.sync();
  if (req.body.force) {
   await Word.update({ es: req.body.es }, { where: { en: req.body.en } }).then(
    (response) => res.status(200).json(response)
   );
  } else {
   const data = await Word.findOne({
    where: { en: req.body.en },
    attributes: { exclude: ["id_word", "points", "createdAt", "updatedAt"] },
   });
   if (data) {
    res.status(200).json({ ...data.dataValues, force: true });
   } else {
    await Word.create({ en: req.body.en, es: req.body.es, uuid: v4() }).then(
     (response) => res.status(200).json(response)
    );
   }
  }
 } catch (error) {
  res.status(400).json({ message: error.message });
 }
}

export { addWord, editWord, readWords };
