import  nano from 'nano';

const couchDb = {
    protocol: 'http',
    server: 'localhost',
    port: 5984,
    user: 'marian',
    password: 'Fsac1sp@l'
}

const encodeCredentials = (user, password) =>
 `${encodeURIComponent(user)}:${encodeURIComponent(password)}`;

const createCouchDbUrl = (dbData) =>
    `${dbData.protocol}://${encodeCredentials(dbData.user, dbData.password)}@${dbData.server}:${dbData.port}`;

const couch = nano('http://localhost:5984');

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