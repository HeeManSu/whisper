import express from "express"
import { config } from "dotenv";
import errorHandlerMiddleware from "./middlewares/errorHandler.js"
import cookieParser from "cookie-parser";
import cors from "cors"



config({
    path: "./config/config.env"
})
const app = express();


//using middlewares on 

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

//importing and using routes
import user from "./routes/userRouter.js"
import chat from "./routes/chatRouter.js"

app.use("/api/v1", user);
app.use("/api/v1", chat)




export default app;



app.use(errorHandlerMiddleware);


