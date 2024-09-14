import { PrimaryListItem } from "../types";

export default function buildSrt(
  srtState: PrimaryListItem[],
  name = "placeholder name",
): string {
  const data = convertStateToSRT(srtState);

  const link = URL.createObjectURL(new File(data, name + ".srt"));

  return link;
}

function convertStateToSRT(state: PrimaryListItem[]) {
  const data = state.map((data, index) =>
    buildPrimaryItem({ ...data, index: index }),
  );
  return data || [];
}

function buildPrimaryItem(item: PrimaryListItem & { index: number }) {
  return [
    item.index + 1,

    item.time,

    item.data
      .map((data) =>
        data.type === "aya"
          ? `${data.data.selected.trim()}`
          : `${data.data.toString() || data.initialData.toString()}`,
      )
      .join(" "),
    "\n",
  ].join("\n");
}
