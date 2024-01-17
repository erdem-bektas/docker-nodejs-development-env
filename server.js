const express = require("express")
const { Pool } = require("pg")
const app = express()
const port = 3000

const pool = new Pool({
  user: 'postgres',
  host: 'db',   
  database: 'example', 
  password: 'xyz-618abc',
  port: 5432,
});

app.get("/", async (req, res) => {
  try {
    await pool.query("INSERT INTO messages(text) VALUES($1)", ["Hello World"]);

    const result = await pool.query("SELECT text FROM messages");

    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.send("An error occurred");
  }
});

app.listen(port,() => {
  console.log(`App listenin: ${port}`)
})

app.get("/get-message", async (req, res) => {
  try {
    const result = await pool.query("SELECT text FROM messages");
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.send("An error occurred while fetching messages");
  }
});

