import isAya from "./isAya";
import isFullAya from "./isFullAya";
import parsePartialAyaId from "./parsePartialAya";

type ContentArrayType =
  | {
      partial: boolean;
      partIndex?: number;
      ayaId: string;
      type: "aya";
    }
  | {
      type: "text";
      content: string;
    };

export default function parseTranslation(translation: string): {
  content: string;
  contentArray: ContentArrayType[];
} {
  const pattern: RegExp = /<x>(.*?)<\/x>/g;
  const splittedContent = translation.split(pattern);
  const contentArray: ContentArrayType[] = splittedContent.map(
    (e): ContentArrayType => {
      const aya = isAya(e);
      if (!aya) {
        if (e) {
          return {
            type: "text",
            content: e.trim(),
          };
        }
      }

      const full = isFullAya(e);
      if (full) {
        return {
          type: "aya",
          ayaId: e,
          partial: false,
        };
      }
      const parsedPartialAya = parsePartialAyaId(e);
      return {
        ayaId: parsedPartialAya.ayaId,
        partial: true,
        type: "aya",
        partIndex: 0,
      };
    },
  );
  return {
    content: translation,
    contentArray,
  };
}
