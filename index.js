import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID, PG_CONNECTION} = process.env;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

let currentClientName = "";
let currentClientId = 1;
let hospitalInData = "";
let healthInsuranceInData = "";
let user;
let comment = "";
let query = "";
let list = [];
let getlist;
const app = express();
const port = 3000;

const db = new pg.Client({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: "5433",
    ssl: {
        rejectUnauthorized: true, // Ensure SSL certificate verification
      },
    connectionString: PG_CONNECTION,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("login.ejs");
    /*await db.query("TRUNCATE TABLE clientinformationaccount;");
    await db.query("TRUNCATE TABLE clientinformationhospital;");
    await db.query("TRUNCATE TABLE clientinformationhealthinsurance;");*/
});

app.post("/loginselect", async (req, res) => {
    const check = await db.query("SELECT EXISTS (SELECT 1 FROM clientinformationaccount WHERE username = $1 AND password = $2);",
        [req.body.username, req.body.password]);
    console.log(check.rows[0].exists);
    if (check.rows[0].exists === true) {
        console.log("Login successfully!");
        user = await db.query("SELECT id,name FROM clientinformationaccount WHERE username = $1 AND password = $2;",
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
    const checkExistInfo = await db.query("SELECT EXISTS (SELECT 1 FROM clientinformationaccount WHERE username = $1 AND password = $2);",
        [req.body.username, req.body.password]);
    console.log(checkExistInfo.rows[0].exists);
    if (checkExistInfo.rows[0].exists === true) {
        const error = "Your username and password are already existed!";
        res.render("register.ejs", { error: error });
    } else {
        await db.query("INSERT INTO clientinformationaccount (username,password,name) VALUES ($1,$2,$3)", [req.body.username, req.body.password, req.body.fullname]);
        user = await db.query("SELECT id,name FROM clientinformationaccount WHERE username = $1 AND password = $2;",
            [req.body.username, req.body.password]);
        currentClientName = user.rows[0].name;
        currentClientId = user.rows[0].id;
        await db.query("INSERT INTO clientinformationhospital (id,name) VALUES ($1,$2)", [currentClientId,currentClientName]);
        await db.query("INSERT INTO clientinformationhealthinsurance (id,name) VALUES ($1,$2)", [currentClientId,currentClientName]);
        console.log(currentClientName + " " + currentClientId);
        console.log("Register successfully!");
        res.render("select.ejs");
    }
});

app.get("/hospital", async (req, res) => {
    list = [];
    getlist = await db.query("SELECT * FROM clientinformationhospital;");
    getlist.fields.forEach((item) => {
        if (item.name.includes("(hospital)")) {
            list.push(item.name.substring("(hospital)".length));
        };
    });
    res.render("hospital.ejs", { list: list });
});

app.get("/healthinsurance", async (req, res) => {
    list = [];
    getlist = await db.query("SELECT * FROM clientinformationhealthinsurance;");
    getlist.fields.forEach((item) => {
        if (item.name.includes("(health insurance)")) {
            list.push(item.name.substring("(health insurance)".length));
        };
    });
    res.render("healthinsurance.ejs", { list: list });
});

app.get("/hospitals/details/:hospitalName", async (req,res) => {
    hospitalInData = "(hospital)" + req.params.hospitalName;
    console.log(hospitalInData);
    query = `SELECT id, name, "${hospitalInData}" FROM clientinformationhospital;`;
    getlist = await db.query(query);
    console.log(getlist.rows);
    query = `SELECT "${hospitalInData}" FROM clientinformationhospital WHERE id=${currentClientId}`;
    comment = await db.query(query);
    comment = comment.rows[0][hospitalInData];
    console.log(comment);
    res.render("hospitaldetails.ejs", {list: getlist.rows, hospitalName : req.params.hospitalName, hospitalInData: hospitalInData, currentClientName: currentClientName, currentClientId: currentClientId, comment: comment});
});

app.post("/hospitals/news/:hospitalName", async (req,res) => {
    hospitalInData = "(hospital)" + req.params.hospitalName;
    console.log(hospitalInData);
    query = `UPDATE clientinformationhospital SET "${hospitalInData}" = '${req.body.assessment}' WHERE id = ${currentClientId};`;
    await db.query(query);
    query = `SELECT id, name, "${hospitalInData}" FROM clientinformationhospital;`;
    getlist = await db.query(query);
    console.log(getlist.rows);
    query = `SELECT "${hospitalInData}" FROM clientinformationhospital WHERE id=${currentClientId}`;
    comment = await db.query(query);
    comment = comment.rows[0][hospitalInData];
    console.log(comment);
    res.render("hospitaldetails.ejs", {list: getlist.rows, hospitalName : req.params.hospitalName, hospitalInData: hospitalInData, currentClientName: currentClientName, currentClientId: currentClientId, comment: comment});
});

app.get("/healthinsurances/details/:healthInsuranceName", async (req,res) => {
    healthInsuranceInData = "(health insurance)" + req.params.healthInsuranceName;
    console.log(healthInsuranceInData);
    query = `SELECT id, name, "${healthInsuranceInData}" FROM clientinformationhealthinsurance;`;
    getlist = await db.query(query);
    console.log(getlist.rows);
    query = `SELECT "${healthInsuranceInData}" FROM clientinformationhealthinsurance WHERE id=${currentClientId}`;
    comment = await db.query(query);
    comment = comment.rows[0][healthInsuranceInData];
    console.log(comment);
    res.render("healthinsurancedetails.ejs", {list: getlist.rows, healthInsuranceName : req.params.healthInsuranceName, healthInsuranceInData: healthInsuranceInData, currentClientName: currentClientName, currentClientId: currentClientId, comment: comment});
});

app.post("/healthinsurances/news/:healthInsuranceName", async (req,res) => {
    healthInsuranceInData = "(health insurance)" + req.params.healthInsuranceName;
    console.log(healthInsuranceInData);
    query = `UPDATE clientinformationhealthinsurance SET "${healthInsuranceInData}" = '${req.body.assessment}' WHERE id = ${currentClientId};`;
    await db.query(query);
    query = `SELECT id, name, "${healthInsuranceInData}" FROM clientinformationhealthinsurance;`;
    getlist = await db.query(query);
    console.log(getlist.rows);
    query = `SELECT "${healthInsuranceInData}" FROM clientinformationhealthinsurance WHERE id=${currentClientId}`;
    comment = await db.query(query);
    comment = comment.rows[0][healthInsuranceInData];
    console.log(comment);
    res.render("healthinsurancedetails.ejs", {list: getlist.rows, healthInsuranceName : req.params.healthInsuranceName, healthInsuranceInData: healthInsuranceInData, currentClientName: currentClientName, currentClientId: currentClientId, comment: comment});
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