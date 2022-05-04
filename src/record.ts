import { Student } from './student.interface';

type studentName = 'John' | 'Tom';

const student: Record<studentName, Student> = {
  John: { id: 1, name: 'John', age: 20 },
  Tom: { id: 2, name: 'Tom', age: 22 },
}
