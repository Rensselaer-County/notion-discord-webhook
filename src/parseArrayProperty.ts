export default function parseArrayProperty(
  array: any,
  isPerson?: boolean,
): string | undefined {
  const key = isPerson ? "people" : "multi_select";

  if (array[key].length <= 0) {
    return;
  }

  let value = "";

  for (const obj of array[key]) {
    value += obj.name + ", ";
  }

  value = value.slice(0, -2);

  return value;
}
