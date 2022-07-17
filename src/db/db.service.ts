import IDatabase from './db.model';

const database: IDatabase = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: {
    tracks: [],
    artists: [],
    albums: [],
  },
};

export default database;
