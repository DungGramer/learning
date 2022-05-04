interface Student {
  readonly id: number;
  name: string;
  age?: number;
}

// type Student = {
//   readonly id: number;
//   name: string;
//   age?: number;
// }

const s1: Student = {
  id: 1,
  name: 'Jack',
};