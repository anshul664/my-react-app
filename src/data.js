export const initialNodes = [
  {
    id: 'root-1',
    type: 'root',
    position: { x: 250, y: 25 },
    data: { label: 'Root Node' },
  },
  {
    id: 'ou-1',
    type: 'orgUnit',
    position: { x: 100, y: 150 },
    data: { label: 'Engineering' },
  },
  {
    id: 'user-1',
    type: 'userList',
    position: { x: 400, y: 150 },
    data: { label: 'Users List' },
  },
  {
    id: 'course-1',
    type: 'courseList',
    position: { x: 600, y: 150 },
    data: { label: 'Courses List' },
  },
  {
    id: 'optional-course-student-list-1',
    type: 'optionalCourseStudentList',
    position: { x: 400, y: 400 },
    data: { label: 'Optional Course Student List' },
  },
];

export const initialEdges = [];
