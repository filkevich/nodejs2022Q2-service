import { IUser } from 'src/user/user.model';

interface IDatabase {
  users: IUser[];
}

const database: IDatabase = {
  users: [],
  // tracks: [],
  // albums: [],
  // artists: [],
  // favourites: {
  //   tracks: [],
  //   artists: [],
  //   albums: [],
  // },
};

export default database;
