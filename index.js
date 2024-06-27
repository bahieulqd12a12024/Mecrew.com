import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

let currentClientName = "";
let currentClientId = 1;
let user;
let list = [];
let getlist;
const app = express();
const port = 3000;

const db = new pg.Client({
    user: "medicalreviewer_whereverwe",
    host: "lg9.h.filess.io",
    database: "medicalreviewer_whereverwe",
    password: "3e89955e2297edc6122d0e466a40bec005274cad",
    port: "5433",
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("login.ejs");
    /*await db.query("TRUNCATE TABLE clientinformation.account;");
    await db.query("TRUNCATE TABLE clientinformation.hospital;");
    await db.query("TRUNCATE TABLE clientinformation.healthinsurance;");*/
});

app.post("/loginselect", async (req, res) => {
    const check = await db.query("SELECT EXISTS (SELECT 1 FROM clientinformation.account WHERE username = $1 AND password = $2);",
        [req.body.username, req.body.password]);
    console.log(check.rows[0].exists);
    if (check.rows[0].exists === true) {
        console.log("Login successfully!");
        user = await db.query("SELECT id,name FROM clientinformation.account WHERE username = $1 AND password = $2;",
            [req.body.username, req.body.password]);
        currentClientName = user.rows[0].name;
        currentClientId = user.rows[0].id;
        console.log(currentClientName + " " + currentClientId);
        res.render("select.ejs");
    } else {
        const error = "Your username and password is not correct!";
        res.render("login.ejs", { error: error });
    }
});

app.post("/register", async (req, res) => {
    res.render("register.ejs");
});

app.post("/registerselect", async (req, res) => {
    const checkExistInfo = await db.query("SELECT EXISTS (SELECT 1 FROM clientinformation.account WHERE username = $1 AND password = $2);",
        [req.body.username, req.body.password]);
    console.log(checkExistInfo.rows[0].exists);
    if (checkExistInfo.rows[0].exists === true) {
        const error = "Your username and password are already existed!";
        res.render("register.ejs", { error: error });
    } else {
        await db.query("INSERT INTO clientinformation.account (username,password,name) VALUES ($1,$2,$3)", [req.body.username, req.body.password, req.body.fullname]);
        user = await db.query("SELECT id,name FROM clientinformation.account WHERE username = $1 AND password = $2;",
            [req.body.username, req.body.password]);
        currentClientName = user.rows[0].name;
        currentClientId = user.rows[0].id;
        await db.query("INSERT INTO clientinformation.hospital (id,name) VALUES ($1,$2)", [currentClientId,currentClientName]);
        console.log(currentClientName + " " + currentClientId);
        console.log("Register successfully!");
        res.render("select.ejs");
    }
});

app.get("/hospital", async (req, res) => {
    list = [];
    getlist = await db.query("SELECT * FROM clientinformation.hospital;");
    console.log(getlist);
    getlist.fields.forEach((item) => {
        if (item.name.includes("(hospital)")) {
            list.push(item.name.substring("(hospital)".length));
        };
    });
    console.log(list);
    res.render("hospital.ejs", { list: list });
});

app.get("/healthinsurance", async (req, res) => {
    res.render("healthinsurance.ejs");
});

app.get("/hospitals/details/:hospitalName", async (req,res) => {
    console.log(req.params.hospitalName);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




/*await db.query("INSERT INTO clientinformation.account (account,password) 
    VALUES ('bahieu','123')");*/
/*await db.query("DELETE FROM clientinformation.account
WHERE id = 1;");*/
/*await db.query("UPDATE clientinformation.account
SET account = 'as', password = 'hihi'
WHERE id = 1;");*/
/*ALTER TABLE table_name
RENAME COLUMN old_name to new_name;*/
/*await db.query("TRUNCATE TABLE clientinformation.account;");*/