var jwt = require("jsonwebtoken");

var _ = require("lodash");
/*Import express: https://www.npmjs.com/package/express 
Express is a node.js minimalist framework for building APIs and more.
*/
const express = require("express");

const app = express(); //creating app

/*Import body-parser : https://www.npmjs.com/package/body-parser
Node.js body parsing middleware.
Parse incoming request bodies in a middleware before your handlers, 
available under the req.body property.*/
const bodyParser = require("body-parser");

/*Importi cors: https://www.npmjs.com/package/cors
 CORS is a node.js package for providing a Connect/Express
 middleware that can be used to enable CORS with various options. */
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

//List of users
const users = [
  {
    id: "a6ea04ae-123e-4100-a9e0-e26aab7272ea",
    gender: "male",
    name: {
      title: "Mr",
      first: "Lucas",
      last: "Herrero",
    },
    email: "lucas.herrero@example.com",
    login: {
      username: "tinybear891",
      password: "milano",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/62.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/62.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/62.jpg",
    },
    accessLevel: 3,
    jobTitle: "Surgeon",
  },
  {
    id: "5ebb137d-57f1-4329-8c4b-51a5dc230402",
    gender: "female",
    name: {
      title: "Ms",
      first: "Emma",
      last: "Roger",
    },
    email: "emma.roger@example.com",
    login: {
      username: "sadfrog160",
      password: "dandan",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/84.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/84.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/84.jpg",
    },
    accessLevel: 2,
    jobTitle: "Head nurse",
  },
  {
    id: "001fc12c-2088-4339-bebf-925cb2da4fe6",
    gender: "female",
    name: {
      title: "Miss",
      first: "Anna",
      last: "Alexander",
    },
    email: "anna.alexander@example.com",
    login: {
      username: "whitemouse243",
      password: "puppydog",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/70.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/70.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/70.jpg",
    },
    accessLevel: 1,
    jobTitle: "Nurse",
  },
  {
    id: "9fa3ad5d-7a8a-4479-8cd3-e05354af720d",
    gender: "female",
    name: {
      title: "Mrs",
      first: "Lutske",
      last: "Zhu",
    },
    email: "lutske.zhu@example.com",
    login: {
      username: "bluewolf101",
      password: "somerset",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/35.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/35.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/35.jpg",
    },
    accessLevel: 1,
    jobTitle: "Nurse",
  },
  {
    id: "6b58eb62-ed27-4626-b3f0-d72bb6360771",
    gender: "male",
    name: {
      title: "Mr",
      first: "Gonzalo",
      last: "Peña",
    },
    email: "gonzalo.pena@example.com",
    login: {
      username: "whitebear833",
      password: "chase",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/73.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/73.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/73.jpg",
    },
    accessLevel: 4,
    jobTitle: "IT",
  },
];

/* Users API */

app.post("/api/auth", (req, res) => {
  const { email, password } = req.body;
  /* Request body {
    email: "string",
    password: "string"
  } */
  const userInDb = users.find(
    (user) => user.email === email && user.login.password === password
  );
  if (userInDb) {
    var token = jwt.sign(userInDb, "secretkey1");
    res.json(token);
  }
  res.sendStatus(404);
});

app.get("/api/users", (req, res) => {
  const usersFiltered = users.map((user) =>
    _.pick(
      user,
      "id",
      "gender",
      "name",
      "email",
      "picture",
      "login",
      "accessLevel",
      "jobTitle"
    )
  );
  res.json(usersFiltered);
});

app.post("/api/users", (req, res) => {
  const user = req.body;
  users.push(user);

  res.json(user);
});

app.patch("/api/users/:id/:patch", (req, res) => {
  const { id, patch } = req.params;
  const { email, password } = req.body;
  const index = users.findIndex((user) => user.id === req.params.id);
  console.log(req.params);
  if (index > -1) {
    if (patch === "email") {
      users[index].email = email;
      res.json({ id, email });
    }
    if (patch === "password") {
      users[index].login.password = password;
      res.sendStatus(200);
    }
  } else {
    res.sendStatus(404);
  }
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === id);
  if (index > -1) {
    users.splice(index, 1);
    res.json({ id });
  } else {
    res.sendStatus(404);
  }
});

/* Patients */

//List ot patients
const patients = [
  {
    id: "82ccf663-e950-4862-aba5-a626b452ec2b",
    gender: "female",
    name: {
      title: "Ms",
      first: "Julia",
      last: "Castro",
    },
    location: {
      street: {
        number: 9627,
        name: "Calle de Atocha",
      },
      city: "Jerez de la Frontera",
      state: "Canarias",
      country: "Spain",
      postcode: 89492,
    },
    email: "julia.castro@example.com",
    login: {
      username: "goldenostrich453",
      password: "pegasus",
    },
    dob: {
      date: "1952-09-24T17:59:13.081Z",
      age: 68,
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/68.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/68.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/68.jpg",
    },
    discharging: {
      inProcess: true,
      dischargeLetter: true,
      letterApproved: false,
      discharged: false,
      letter: {
        patientName: "Miss Demy Peeman",
        date: new Date().getVarDate,
        body: `Dear Ms Julia Castro,\n\nToday ${new Date().getUTCDate()}/${new Date().getUTCMonth()}/${new Date().getUTCFullYear()}, we are discharging you from [Hospital name].\n\n[Some information about the following days]\n\nDiagnose:\n\n[Write the diagnose of the patient here]\n\n Additional information:\n\n [Write any additional information for the patient]`,
        createdBy: "Miss Anna Alexander - Nurse",
        headNurseApproved: true,
        surgeonApproved: false,
        signedBy: [
          "Head Nurse - Miss Silvia Denaro",
          "Surgeon - Daniel Jackson",
        ],
      },
    },
    notes: [{ title: "First note", body: "This is my first note!" }],
  },
  {
    id: "453aa3ee-ef3b-4610-9647-a20fbf678ce3",
    gender: "female",
    name: {
      title: "Miss",
      first: "Danielle",
      last: "Green",
    },
    location: {
      street: {
        number: 6323,
        name: "Grange Road",
      },
      city: "Wells",
      state: "Warwickshire",
      country: "United Kingdom",
      postcode: "S2K 7RP",
    },
    email: "danielle.green@example.com",
    login: {
      username: "lazymouse226",
      password: "diablo",
    },
    dob: {
      date: "1945-07-05T17:07:30.922Z",
      age: 75,
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/71.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/71.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/71.jpg",
    },
    discharging: {
      inProcess: true,
      dischargeLetter: true,
      letterApproved: false,
      discharged: false,
      letter: {
        patientName: "Miss Demy Peeman",
        date: new Date().getVarDate,
        body: `Dear Miss Danielle Green,\n\nToday ${new Date().getUTCDate()}/${new Date().getUTCMonth()}/${new Date().getUTCFullYear()}, we are discharging you from [Hospital name].\n\n[Some information about the following days]\n\nDiagnose:\n\n[Write the diagnose of the patient here]\n\n Additional information:\n\n [Write any additional information for the patient]`,
        createdBy: "Miss Anna Alexander - Nurse",
        headNurseApproved: false,
        surgeonApproved: false,
        signedBy: [
          "Head Nurse - Miss Silvia Denaro",
          "Surgeon - Daniel Jackson",
        ],
      },
    },
    notes: [],
  },
  {
    id: "380de9e2-000d-4d98-a9eb-c6ee8d966f74",
    gender: "female",
    name: {
      title: "Miss",
      first: "Demy",
      last: "Peeman",
    },
    location: {
      street: {
        number: 8847,
        name: "Greveling",
      },
      city: "Wijdemeren",
      state: "Flevoland",
      country: "Netherlands",
      postcode: 10024,
    },
    email: "demy.peeman@example.com",
    login: {
      username: "sadrabbit473",
      password: "tuscl",
    },
    dob: {
      date: "1994-04-27T06:34:53.672Z",
      age: 26,
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/51.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/51.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/51.jpg",
    },
    discharging: {
      inProcess: false,
      dischargeLetter: true,
      letterApproved: true,
      discharged: false,
      letter: {
        patientName: "Miss Demy Peeman",
        date: new Date().getVarDate,
        body: `Dear Miss Demy Peeman,\n\nToday ${new Date().getUTCDate()}/${new Date().getUTCMonth()}/${new Date().getUTCFullYear()}, we are discharging you from [Hospital name].\n\n[Some information about the following days]\n\nDiagnose:\n\n[Write the diagnose of the patient here]\n\n Additional information:\n\n [Write any additional information for the patient]`,
        createdBy: "Miss Anna Alexander - Nurse",
        headNurseApproved: true,
        surgeonApproved: true,
        signedBy: [
          "Head Nurse - Miss Silvia Denaro",
          "Surgeon - Daniel Jackson",
        ],
      },
    },
    notes: [],
  },
  {
    id: "627de85c-e13f-471c-a2cb-12b8f8680ac7",
    gender: "male",
    name: {
      title: "Mr",
      first: "Harry",
      last: "Coleman",
    },
    location: {
      street: {
        number: 8403,
        name: "W Belt Line Rd",
      },
      city: "Mcallen",
      state: "Louisiana",
      country: "United States",
      postcode: 81616,
    },
    email: "harry.coleman@example.com",
    login: {
      username: "smallpeacock185",
      password: "bugger",
    },
    dob: {
      date: "1953-04-08T14:52:38.315Z",
      age: 67,
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/52.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/52.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/52.jpg",
    },
    discharging: {
      inProcess: false,
      dischargeLetter: false,
      letterApproved: false,
      discharged: false,
      letter: {},
    },
    notes: [],
  },
  {
    id: "fe72c64e-f240-416a-9a8a-5be0cf3dc33b",
    gender: "female",
    name: {
      title: "Madame",
      first: "Violeta",
      last: "Roche",
    },
    location: {
      street: {
        number: 7702,
        name: "Rue André-Gide",
      },
      city: "Erlen",
      state: "Zug",
      country: "Switzerland",
      postcode: 3064,
    },
    email: "violeta.roche@example.com",
    login: {
      username: "redgoose721",
      password: "lonely",
    },
    dob: {
      date: "1994-04-20T00:15:06.694Z",
      age: 26,
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/76.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/76.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/76.jpg",
    },
    discharging: {
      inProcess: false,
      dischargeLetter: false,
      letterApproved: false,
      discharged: false,
      letter: {},
    },
    notes: [],
  },
  {
    id: "f713d87c-c8a7-464d-9aaa-fbfa3b420033",
    gender: "male",
    name: {
      title: "Mr",
      first: "Waldemar",
      last: "Kortmann",
    },
    location: {
      street: {
        number: 2240,
        name: "Schlossstraße",
      },
      city: "Lieberose",
      state: "Mecklenburg-Vorpommern",
      country: "Germany",
      postcode: 78559,
    },
    email: "waldemar.kortmann@example.com",
    login: {
      username: "purplemouse979",
      password: "nimrod",
    },
    dob: {
      date: "1982-05-04T12:56:46.805Z",
      age: 38,
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/65.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/65.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/65.jpg",
    },
    discharging: {
      inProcess: false,
      dischargeLetter: false,
      letterApproved: false,
      discharged: false,
      letter: {},
    },
    notes: [],
  },
  {
    id: "e9126df4-e188-44b0-bdcf-77c2ee044ed6",
    gender: "female",
    name: {
      title: "Miss",
      first: "Scarlett",
      last: "Robinson",
    },
    location: {
      street: {
        number: 4265,
        name: "Taharoto Road",
      },
      city: "Whangarei",
      state: "Hawke'S Bay",
      country: "New Zealand",
      postcode: 91337,
    },
    email: "scarlett.robinson@example.com",
    login: {
      username: "whiteladybug495",
      password: "schmidt",
    },
    dob: {
      date: "1986-11-02T14:20:44.206Z",
      age: 34,
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/87.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/87.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/87.jpg",
    },
    discharging: {
      inProcess: false,
      dischargeLetter: false,
      letterApproved: false,
      discharged: false,
      letter: {},
    },
    notes: [],
  },
  {
    id: "21ff0dd4-c63b-441a-958d-a00d15ffd394",
    gender: "male",
    name: {
      title: "Mr",
      first: "Clayton",
      last: "Bowman",
    },
    location: {
      street: {
        number: 9414,
        name: "Boghall Road",
      },
      city: "Swords",
      state: "Tipperary",
      country: "Ireland",
      postcode: 34185,
    },
    email: "clayton.bowman@example.com",
    login: {
      username: "orangeswan710",
      password: "eagle",
    },
    dob: {
      date: "1944-12-27T12:05:26.748Z",
      age: 76,
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/84.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/84.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/84.jpg",
    },
    discharging: {
      inProcess: false,
      dischargeLetter: false,
      letterApproved: false,
      discharged: false,
      letter: {},
    },
    notes: [],
  },
];

app.get("/api/patients", (req, res) => {
  res.json(patients);
});

app.post("/api/patients", (req, res) => {
  const patient = req.body;
  patients.push(patient);
  res.json(patient);
});

//Discharging
app.put("/api/patients/:id", (req, res) => {
  const { id } = req.params;
  const { discharging } = req.body;
  const index = patients.findIndex((patient) => patient.id === id);
  if (index > -1) {
    patients[index].discharging = discharging;
    res.json({ id, discharging });
  } else res.sendStatus(404);
});

//Patching
app.patch("/api/patients/:id/:patch", (req, res) => {
  const { id, patch } = req.params;
  const { discharging, signedBy } = req.body;
  const index = patients.findIndex((patient) => patient.id === id);
  if (index > -1) {
    if (patch === "headNurseApproved") {
      patients[index].discharging = discharging;
      patients[index].discharging.letter.headNurseApproved = true;
      patients[index].discharging.letter.signedBy.push(signedBy);
      res.json({ id, discharging });
    }
    if (patch === "surgeonApproved") {
      patients[index].discharging = discharging;
      patients[index].discharging.letter.headNurseApproved = true;
      patients[index].discharging.letter.surgeonApproved = true;
      patients[index].discharging.letter.signedBy.push(req.body.signedBy);
      patients[index].discharging.inProcess = false;
      patients[index].discharging.letterApproved = true;
      res.json({ id, discharging });
    }

    if (patch === "discharge") {
      patients[index].discharging.discharged = true;
      res.json({ id, discharging });
    }
  } else res.sendStatus(404);
});

app.delete("/api/patients/:id", (req, res) => {
  const { id } = req.params;
  const index = patients.findIndex((patient) => patient.id === id);
  if (index > -1) {
    patients.splice(index, 1);
    res.json({ id });
  } else {
    res.sendStatus(404);
  }
});

app.listen(9002, () => {
  console.log("Node server started on port 9002.");
});
