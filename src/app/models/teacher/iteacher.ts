export interface ITeacher {
  id: number;
  name: string;
  email: string;
  pic: string;
  gender: string;
  age: number;
  isDeleted: boolean;
}

export interface IUpdateTeacher{
  id: number;
  pic: string;
  gender: string;
  age: string;
}
