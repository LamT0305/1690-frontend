export function splitArray(array: any[]) {
  const arr = [];
  const brr = [];
  for (let i = 0; i < array.length / 2; i++) {
    arr.push(array[i]);
  }
  for (let i = array.length / 2; i < array.length; i++) {
    brr.push(array[i]);
  }
  const c = [arr, brr];
  return c;
}

export const countAvailable = (slots:any[]) => {
  let count = 0;
  for (let i = 0; i < slots.length; i++) {
    if (slots[i].status === "available") {
      count++;
    }
  }
  return count;
};
