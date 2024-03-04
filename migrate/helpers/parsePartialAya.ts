function parsePartialAyaId(aya: string) {
  const pattern = /(.+)_part#(\d+)/;

  const splitAya = aya.split(pattern);

  const partIndex = parseInt(splitAya[2] ?? "", 10);
  const ayaId = splitAya[1] ?? "";
  return {
    partIndex,
    ayaId,
  };
}

export default parsePartialAyaId;
