// Load environment variables
import express from 'express';
import config from './utils/config';
import user_routes from './routes/user_routes';
import post_routes from './routes/post_routes';
import cors from 'cors';
import auth_routes from './routes/auth_routes';
import fileUpload from 'express-fileupload';


// creating a server
const server = express();

//TODO :enable use of cors in order to make auth data transfers
const corsOptions = {
    exposedHeaders: "authorization",
};
server.use(cors(corsOptions));
//TODO :enable a middleware

server.use(fileUpload({
    createParentPath:true
}));


// makes every data transfer as JSON data
// server.use(express.json())
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb", extended: true }));
//TODO :connect to different routes(urls)
server.use("/user", user_routes)
server.use("/post", post_routes)
server.use("/auth", auth_routes)
// uploading server with matching PORT 
const currentPort = config.port;

server.listen(currentPort, () => {
    console.log(`listening on http://localhost:${currentPort}`)
})