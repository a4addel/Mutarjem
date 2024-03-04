import type { Item } from "../types";

export default function getAyasFrom(a: Item) {
  const ayas = {} as {
    [k: string]: {
      edition: string;
      text: string;
      chapter: number;
      aya: number;
    }[];
  };

  if (a.full_brackets_ayas.length > 0) {
    for (let index = 0; index < a.full_brackets_ayas.length; index++) {
      ayas[a.full_brackets_ayas[index]?.aya_id ?? ""] =
        a.full_brackets_ayas[index]?.edition_info.map((f) => ({
          edition: f.edition.name,
          text: f.text,
          aya: f.surah.numberOfAyahs,
          chapter: f.surah.number,
        })) ?? [];
    }
  }

  if (a.patial_brackets_ayas.length > 0) {
    for (let index = 0; index < a.patial_brackets_ayas.length; index++) {
      ayas[a.patial_brackets_ayas[index]?.aya_id ?? ""] =
        a.patial_brackets_ayas[index]?.edition_info.map((f) => ({
          edition: f.edition.name,
          text: f.text,
          aya: f.surah.numberOfAyahs,
          chapter: f.surah.number,
        })) ?? [];
    }
  }
  return ayas;
}
