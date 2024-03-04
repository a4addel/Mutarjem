const ayaPattern = /\d+:\d+/;

export default function isAya(aya: string) {
  return ayaPattern.test(aya);
}
