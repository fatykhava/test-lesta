export interface ITestData {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
}

const testdata: ITestData[] = [
  {
    firstName: 'Tanner',
    lastName: 'Linsley',
    age: 33,
    visits: 100,
    progress: 50,
    status: 'Married'
  },
  {
    firstName: 'Kevin',
    lastName: 'Vandy',
    age: 27,
    visits: 200,
    progress: 100,
    status: 'Single'
  }
];

export default testdata;
