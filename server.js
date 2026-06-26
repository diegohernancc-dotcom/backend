const express=require("express");
const cors=require("cors");
const {Pool}=require("pg");
require("dotenv").config();

const app=express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

const db=new Pool({

 connectionString:
 process.env.DATABASE_URL,

 ssl:{
  rejectUnauthorized:false
 }

});




app.get("/",(req,res)=>{

res.send("API funcionando");

});

app.get(
"/usuarios",
async(req,res)=>{

try{

const resultado=
await db.query(
"SELECT * FROM usuarios"
);

res.json(
resultado.rows
);

}
catch(error){

res.status(500)
.send(error.message);

}

});

const PORT=
process.env.PORT||3000;

app.listen(
PORT,
()=>{

console.log(
"Servidor activo"
);

});
