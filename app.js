const express= require("express")
const connectDB = require("./config/db")
const app= express();
const CustomerRouter= require("./routes/CustomerRoute");
const GroundRouter= require("./routes/GroundRoute");
const FileRouter= require("./routes/FileRoute");

connectDB();


app.use(express.json());

app.use("/api/customer",CustomerRouter);
app.use("/api/ground",GroundRouter);
app.use("/file",FileRouter);



const port= 3000;

app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
})

