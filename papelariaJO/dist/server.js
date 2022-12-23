"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
	return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
const port = 3333;
let users = [];
server.use(express_1.default.json());
server.get("/", (req, res) => {
	res.send(users);
});
server.post("/", (req, res) => {
	const user = req.body;
	users.push(user);
	res.send(user);
	console.log("Deu certo");
});
server.put("/:id", (req, res) => {
	const { id } = req.params;
	console.log("id", id);
	const userIndex = users.findIndex((x) => x.id === Number(id));
	if (userIndex === -1) {
		return res.send("Not found");
	}
	users[userIndex].id = req.body.id;
	users[userIndex].nome = req.body.name;
	users[userIndex].idade = req.body.idade;
	return res.send(users[userIndex]);
});
server.delete("/:id", (request, response) => {
	const { id } = request.params;
	users = users.filter(x => x.id !== Number(id));
	return response.send(users);
});
server.listen(port, () => {
	console.log(`Port ${port} is working`);
});
