﻿import app = require("teem");

//**********************************************************************************
// Se por acaso ocorrer algum problema de conexão, autenticação com o MySQL,
// por favor, execute este código abaixo no MySQL e tente novamente!
//
// ALTER USER 'USUÁRIO'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SENHA';
//
// * Assumindo que o usuário seja root e a senha root, o comando ficaria assim:
//
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
//
//**********************************************************************************

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		res.render("index/index");
	}

	public async shows(req: app.Request, res: app.Response) {
		res.render("index/shows");
	}

	public async sobre(req: app.Request, res: app.Response) {
		res.render("index/sobre");
	}

	public async cadastro(req: app.Request, res: app.Response) {
		res.render("index/cadastro");
	}

	@app.http.post()
	public async criarEvento(req: app.Request, res: app.Response) {
		// Os dados enviados via POST ficam dentro de req.body
		let evento = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!evento) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!evento.nome) {
			res.status(400);
			res.json("Nome inválido");
			return;
		}

		if (!evento.email) {
			res.status(400);
			res.json("E-mail inválido");
			return;
		}

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.
			await sql.query("INSERT INTO evento (nome, email) VALUES (?, ?)", [evento.nome, evento.email]);

		});

		res.json(true);
	}
}

export = IndexRoute;
