import { Student } from "./student.interface";

type OptionFlags<T> = {
  [Property in keyof T]: boolean;
}

let a: OptionFlags<Student> = {
  id: true,
  name: true,
  age: true,
};