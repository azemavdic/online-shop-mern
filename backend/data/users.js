import bcrypt from "bcryptjs";

const users = [
  {
    name: "Asko",
    email: "asko@hotmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Farah",
    email: "farah@hotmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Akica",
    email: "akica@hotmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
