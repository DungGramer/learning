import { Student } from "./student.interface";

type StudentInfo = Omit<Student, 'id'>;
const studentInfo: StudentInfo = {
  name: 'Jack',
};