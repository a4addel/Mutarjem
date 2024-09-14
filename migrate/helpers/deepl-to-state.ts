import { v4 } from "uuid";
import { Item, PrimaryListItem } from "../types";
import createAyaObject from "./create-ayah-object";
import createText from "./create-text";
import Prepare_Edition_ayas from "./Prepare_Edition_ayas";
import parseTranslation from "./parseTranslation";

export default function extractStateFromDallEArray(
  a: Item[],
): PrimaryListItem[] {
  return a.map((e) => buildPrimartItem(e));
}

function buildPrimartItem(a: Item): PrimaryListItem {
  const { translate, section_time } = a;
  const parsedTranslation = parseTranslation(translate);

  const ayas = Prepare_Edition_ayas(a);

  const data = parsedTranslation.contentArray.map((e) => {
    if (e.type === "aya") {
      return createAyaObject({
        options:
          ayas[e.ayaId]?.map((ayaObject) => {
            return {
              text: `${ayaObject.text} [${ayaObject.chapter}:${ayaObject.aya}]`,
              aya: ayaObject.aya,
              chapter: ayaObject.chapter,
              edition: ayaObject.edition,
            };
          }) ?? [],
      });
    } else {
      return createText({
        initialData: e.content ?? "",
      });
    }
  });

  return {
    time: section_time,
    data: data.filter((e) => {
      if (e?.type === "text" && e.initialData === "") return false;
      if (e?.type === "aya" && e?.data?.options.length === 0) return false;
      return true;
    }),
    id: v4(),
    title: a.content,
  };
}
