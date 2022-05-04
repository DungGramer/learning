import { Student } from "./student.interface";

type StudentKeys = keyof Student;
const studentKey: StudentKeys = `id`;
console.log(studentKey);