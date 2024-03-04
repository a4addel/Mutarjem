import type { Item } from "../types";

type Edition = Item["full_brackets_ayas"][number]["edition_info"];
export default function extractAllAysFromEdition(edition: Edition) {
  return edition.map((e: Edition[number]) => {
    const {
      text,
      edition,
      surah: { number, numberOfAyahs },
    } = e;
    return {
      text: text,
      edition: edition,
      aya: numberOfAyahs,
      chapter: number,
    };
  });
}
