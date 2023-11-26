import express from "express";
import { json } from "express";
import { createConnection } from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const db = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "housebuilding"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

const corsOptions = {
  origin: ['*'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
  const values = [name, email, password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }

    console.log("Data inserted successfully:", data);

    return res.status(201).json({ success: true, data });
  });
});

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
