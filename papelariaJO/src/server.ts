import express from "express";
import routes from "./routes";

import errors from "./middlewares/errors";

const server = express();
const port = 3333;


server.use(express.json());

server.use(routes);

server.use(errors);

server.listen(port, () => {
	console.log(`Port ${port} is working`);
});
