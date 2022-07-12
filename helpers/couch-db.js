import  nano from 'nano';

const couchDb = {
    protocol: process.env.REACT_API_COUCHDB_PROTOCOL,
    server: process.env.REACT_API_COUCHDB_SERVER,
    port: process.env.REACT_API_COUCHDB_PORT,
    user: process.env.REACT_API_COUCHDB_USER,
    password: process.env.REACT_API_COUCHDB_PASSWORD
}

const encodeCredentials = (user, password) =>
 `${encodeURIComponent(user)}:${encodeURIComponent(password)}`;

const getAuthenticatedCouchDbUrl = (dbData) =>
    `${dbData.protocol}://${encodeCredentials(dbData.user, dbData.password)}@${dbData.server}:${dbData.port}`;

    const getCouchDbUrl = (dbData) =>
    `${dbData.protocol}://${dbData.server}:${dbData.port}`;

const couch = nano(getCouchDbUrl(couchDb));

couch.auth(couchDb.user, couchDb.password, (response) => {
    console.log('Couch Db Auth response:', response);
});
const db = couch.db;

const listDatabases = async () => await db.list();

const createDatabase = async (database) => {
    const existingDatabases = await listDatabases();

    if(existingDatabases.indexOf(database) >= 0) {
        console.log(`Database ${database} already exists!`);
        return;
    }

    return await db.create(database);
}

export default db;
export { listDatabases, createDatabase };