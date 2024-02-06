import express from "express";

import { editPhrase, readPhrases } from "../controllers/phrases.controller.js";
import {
 editPhrasalVerb,
 readPhrasalVerbs,
} from "../controllers/phrasalVerbs.controller.js";
import {
 addWord,
 editWord,
 readWords,
} from "../controllers/words.controller.js";

const router = express.Router();

router.get("/phrases", readPhrases);
router.patch("/phrase", editPhrase);

router.get("/phrasal-verbs", readPhrasalVerbs);
router.patch("/phrasal-verb", editPhrasalVerb);

router.get("/words", readWords);
router.patch("/word", editWord);
router.post("/word", addWord);

export default router;
