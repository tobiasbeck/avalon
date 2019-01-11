export function shuffle<T>(arr: Array<T>): Array<T> {
  let ctr = arr.length, temp, index;
  while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arr[ctr];
      arr[ctr] = arr[index];
      arr[index] = temp;
  }
  return arr;
}