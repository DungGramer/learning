interface List<T> {
  length: number;
  [index: number]: T;
}

const numberList: List<number> = [1, 2, 3];

