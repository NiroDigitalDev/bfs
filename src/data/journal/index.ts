import type { JournalPost } from "@/lib/journal";
import { letterformsInLowLight } from "@/data/journal/letterforms-in-low-light";
import { oldstyleNumeralsVersusLining } from "@/data/journal/oldstyle-numerals-versus-lining";
import { onTheSealOfADispatch } from "@/data/journal/on-the-seal-of-a-dispatch";
import { paperThatResistsJournalism } from "@/data/journal/paper-that-resists-journalism";
import { theFolioAsAnInstrument } from "@/data/journal/the-folio-as-an-instrument";
import { theGrammarOfBlackestBlack } from "@/data/journal/the-grammar-of-blackest-black";
import { theMarginAsAGesture } from "@/data/journal/the-margin-as-a-gesture";
import { voliiiNo1 } from "@/data/journal/vol-iii-no-1";

export const journalPosts: JournalPost[] = [
  voliiiNo1,
  onTheSealOfADispatch,
  paperThatResistsJournalism,
  theGrammarOfBlackestBlack,
  theMarginAsAGesture,
  oldstyleNumeralsVersusLining,
  letterformsInLowLight,
  theFolioAsAnInstrument,
];
