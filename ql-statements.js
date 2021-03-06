const { Pool } = require("pg");
const pool = new Pool({
  connectionString: "postgresql://postgres:secret@localhost:5432/postgres"
});

pool
  .connect()
  // creates table if there isn't one
  .then(() =>
    pool.query(
      "CREATE TABLE IF NOT EXISTS person (id serial, first_name varchar(255), last_name varchar(255), eye_color varchar(255))"
    )
  )
  //inserts people
  .then(() =>
    pool.query(
      "INSERT INTO person (first_name, last_name, eye_color) VALUES($1, $2, $3)",
      ["James", "Smith", "brown"]
    )
  )
  .then(() =>
    pool.query(
      "INSERT INTO person (first_name, last_name, eye_color) VALUES($1, $2, $3)",
      ["Frank", "Jones", "brown"]
    )
  )
  .then(() =>
    pool.query(
      "INSERT INTO person (first_name, last_name, eye_color) VALUES($1, $2, $3)",
      ["Rebecca", "Andrews", "blue"]
    )
  )
  //updates eye_color from brown to blue in all instances
  .then(() =>
    pool.query("UPDATE person SET eye_color = 'blue' WHERE eye_color = 'brown'")
  )
  // selects where first name = James
  .then(() => pool.query("SELECT * FROM person WHERE first_name = 'James'"))
  //prints results of previous query
  .then(res => {
    console.log("Result of query for James: ", res);
  })
  .catch(err => console.error("error is:", err));
