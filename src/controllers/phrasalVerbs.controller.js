import { Op, literal } from "sequelize";

import PhrasalVerb from "../models/phrasalVerbs.model.js";

async function readPhrasalVerbs(_, res) {
 try {
  await PhrasalVerb.sync();
  const data = await PhrasalVerb.findAll({
   attributes: { exclude: ["createdAt", "updatedAt"] },
   limit: 10,
   order: literal("rand()"),
   where: {
    points: {
     [Op.not]: 3,
    },
   },
  });

  const zero = await PhrasalVerb.count({
   distinct: true,
   where: {
    points: 0,
   },
  });
  const one = await PhrasalVerb.count({
   distinct: true,
   where: {
    points: 1,
   },
  });
  const two = await PhrasalVerb.count({
   distinct: true,
   where: {
    points: 2,
   },
  });
  const three = await PhrasalVerb.count({
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

async function editPhrasalVerb(req, res) {
 try {
  await PhrasalVerb.sync();
  await PhrasalVerb.update(
   { points: literal("points + 1") },
   { where: { id_phrasal_verb: req.body.id_phrasal_verb } }
  ).then((response) => res.status(200).json(response));
 } catch (error) {
  res.status(400).json({ message: error.message });
 }
}

export { editPhrasalVerb, readPhrasalVerbs };
