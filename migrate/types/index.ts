type Item = {
  afterExtractContent: "<x>$$</x>speaker 1 : <x>1:2</x>, <x>2:3</x>\nbe talking about finance. And";
  content: "speaker 1 : <x>1:2</x>, <x>2:3</x>\nbe talking about finance. And";
  content_api: "<x>$$</x>speaker 1 : <x>1:2</x>, <x>2:3</x>\nbe talking about finance. And";
  full_brackets_ayas: [
    {
      aya_id: "1:2";
      aya_text: "(In this lesson , we will)[1:2]";
      edition_info: [
        {
          edition: {
            direction: "ltr";
            englishName: "Muhammad Hamidullah";
            format: "text";
            identifier: "fr.hamidullah";
            language: "fr";
            name: "Hamidullah";
            type: "translation";
          };
          hizbQuarter: 1;
          juz: 1;
          manzil: 1;
          number: 2;
          numberInSurah: 2;
          page: 1;
          ruku: 1;
          sajda: false;
          surah: {
            englishName: "Al-Faatiha";
            englishNameTranslation: "The Opening";
            name: "سُورَةُ ٱلْفَاتِحَةِ";
            number: 1;
            numberOfAyahs: 7;
            revelationType: "Meccan";
          };
          text: "Louange à Allah, Seigneur de l'univers.";
        },
      ];
    },
    {
      aya_id: "2:3";
      aya_text: "(we're going to)[2:3]";
      edition_info: [
        {
          edition: {
            direction: "ltr";
            englishName: "Muhammad Hamidullah";
            format: "text";
            identifier: "fr.hamidullah";
            language: "fr";
            name: "Hamidullah";
            type: "translation";
          };
          hizbQuarter: 1;
          juz: 1;
          manzil: 1;
          number: 10;
          numberInSurah: 3;
          page: 2;
          ruku: 2;
          sajda: false;
          surah: {
            englishName: "Al-Baqara";
            englishNameTranslation: "The Cow";
            name: "سُورَةُ البَقَرَةِ";
            number: 2;
            numberOfAyahs: 286;
            revelationType: "Medinan";
          };
          text: "qui croient à l'invisible et accomplissent la Salât et dépensent (dans l'obéissance à Allah), de ce que Nous leur avons attribué,";
        },
      ];
    },
  ];
  index: 1;
  part_index: 1;
  patial_brackets_ayas: [
    {
      aya_id: "112:2";
      aya_text: "(the most important aspects\nof finance is interest. > When I go to a bank or some\nother lending institution)[112:2]";
      edition_info: [
        {
          edition: {
            direction: "ltr";
            englishName: "Muhammad Hamidullah";
            format: "text";
            identifier: "fr.hamidullah";
            language: "fr";
            name: "Hamidullah";
            type: "translation";
          };
          hizbQuarter: 240;
          juz: 30;
          manzil: 7;
          number: 6223;
          numberInSurah: 2;
          page: 604;
          ruku: 554;
          sajda: false;
          surah: {
            englishName: "Al-Ikhlaas";
            englishNameTranslation: "Sincerity";
            name: "سُورَةُ الإِخۡلَاصِ";
            number: 112;
            numberOfAyahs: 4;
            revelationType: "Meccan";
          };
          text: "Allah, Le Seul à être imploré pour ce que nous désirons.";
        },
      ];
      partial_full_len: 115;
    },
  ];
  real_percent: null;
  section_time: "00:00:03,400 --> 00:00:06,177";
  speaker_index: 1;
  translate: "orateur 1 : <x>1:2</x>, <x>2:3</x>\nparler de finance. Et";
};

export type PrimaryListItem = {
  id: string;
  time: string;
  data: SecondaryListItem[];
  title: string;
};

export type SecondaryListItem =
  | {
      type: "text";
      data: string;
      initialData: string;
    }
  | {
      type: "aya";
      data: {
        options: {
          edition: string;
          text: string;
          chapter: number;
          aya: number;
        }[];
        selected: string;
      };
    };

type AyaProps = Extract<SecondaryListItem, { type: "aya" }>;
type TextProps = Extract<SecondaryListItem, { type: "text" }>;

export type { Item, AyaProps, TextProps };
