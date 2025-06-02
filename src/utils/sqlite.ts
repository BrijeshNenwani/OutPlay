import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("cart.db");

export default db;
