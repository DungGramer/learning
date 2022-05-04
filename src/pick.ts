import { Student } from './student.interface';

type studentInfo = Pick<Student, 'id' | 'name'>;

const student: studentInfo = {
  id: 1,
  name: 'Jack',
};