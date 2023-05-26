///require('events').EventEmitter.prototype._maxListeners = 100;

var express = require( 'express'),
    bodyParser = require('body-parser'),
	multiparty = require('connect-multiparty'),
    mongodb = require('mongodb');
    objectId = require('mongodb').ObjectId
	fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(multiparty());

var port = 8080;

app.listen(port);

var db = new mongodb.Db(
	'newPicture',
	new mongodb.Server('localhost', 27017, {}),
	{}
);

console.log('Servidor rododando na porta ' + port); 

app.post('/usuario/:id', function(req, res){
	db.open( function(err, mongoclient){
		mongoclient.collection('login', function(err, collection){
			collection.find(objectId(req.params.id)).toArray(function(err, results){
				if(err){
					res.json(err);
				} else {
					res.status(200).json(results);
					console.log(results);
				}
				mongoclient.close();
			});
		});
	});

});

// Login
app.post('/login', function(req, res){

	res.setHeader("Access-Control-Allow-Origin", "*");

	var dados = req.body;
	
	db.open( function(err, mongoclient){
		mongoclient.collection('login', function(err, collection){
			collection.find().toArray(function(err, results){
				if(err){
					res.json(err);
				} else {

					for (var i in results) {
						var login = results[i];
						if(login.Email == dados.Email){
							break;
						}	
					}

					if(dados.Email == login.Email && dados.Password == login.Password){
						console.log('ok');
						res.json(login);
					}else {
						res.json({'ok' : 'false'});
					}
				}

				mongoclient.close();
			});
		});
	});
});

// Todos os usuarios
app.get('/usuarios', function(req, res){
	db.open( function(err, mongoclient){
		mongoclient.collection('login', function(err, collection){
			collection.find().toArray(function(err, results){
				if(err){
					res.json(err);
				} else {
					res.json(results);
				}
				mongoclient.close();
			});
		});
	});

});

// cadastrar usuario
app.post('/cadastro', function(req, res){

	res.setHeader("Access-Control-Allow-Origin", "*");

	var dados = req.body;

	db.open( function(err, mongoclient){
		mongoclient.collection('login', function(err, collection){
			collection.insert(dados, function(err, records){
				if(err){
					res.json({'status' : 'erro'});
				} else {
					res.json({'status' : 'inclusao realizada com sucesso'});
				}
				mongoclient.close();
			});
		});
	});

});

// publicar imagem
app.post('/api', function(req, res){

	res.setHeader("Access-Control-Allow-Origin", "*");

	console.log(req.body);
	console.log(req.files.img.path);

	var date = new Date();
	time_stamp = date.getTime();

	var url_imagem = time_stamp + '_' + req.files.img.originalFilename;

	var path_origem = req.files.img.path;
	var path_destino = './uploads/' + url_imagem;

	fs.rename(path_origem, path_destino, function(err){
		if(err){
			res.status(500).json({error: err});
			return;
		}
			
		var imagem = 'http://localhost:8080/imagens/' + url_imagem;

		var dados = {
			url_imagem: imagem,
			descricao: req.body.descricao,
			author: req.body.author 
		}

		db.open( function(err, mongoclient){
			mongoclient.collection('postagens', function(err, collection){
				collection.insert(dados, function(err, records){
					if(err){
						res.json({'status' : 'erro'});
					} else {
						res.json({'status' : 'inclusao realizada com sucesso'});
					}
					mongoclient.close();
				});
			});
		});
	});
});


app.get('/imagens/:imagem', function(req, res){

	var img = req.params.imagem;

	fs.readFile('./uploads/'+ img, function(err, content){
		if(err){
			res.status(400).json(err);
			return;
		}

		res.writeHead(200, { 'content-type' : 'image/jpg'});
		res.end(content);
	})
});

// listar todas postagem
app.get('/api', function(req, res){

	res.setHeader("Access-Control-Allow-Origin", "*");

	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.find().toArray(function(err, results){
				if(err){
					res.json(err);
				} else {
					res.json(results);
				}
				mongoclient.close();
			});
		});
	});

});

//GET by ID (ready)
app.get('/api/:id', function(req, res){

	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.find(objectId(req.params.id)).toArray(function(err, results){
				if(err){
					res.json(err);
				}else {
					res.status(200).json(results);
				}
				mongoclient.close();
			});
		});
	});
});

app.post('/postagen', function(req, res){

	res.setHeader("Access-Control-Allow-Origin", "*");

	console.log('teste', req.body._id);

	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.find(objectId(req.body._id)).toArray(function(err, results){
				if(err){
					res.json(err);
				}else {
					res.status(200).json(results);
					console.log(results);
				}
				mongoclient.close();
			});
		});
	});
});

//update password
app.post('/usuario/:Email', function(req, res){

	res.setHeader("Access-Control-Allow-Origin", "*");

	db.open( function(err, mongoclient){
		mongoclient.collection('login', function(err, collection){
			collection.findOne({}, function(err, results){
				//console.log(results); 
				collection.update(
					{ _id : objectId(results._id) },
					{ $set : {Password: req.body.Password}},
					
					{},
					function(err, records){
						if(err){
							res.json(err);
						} else {
							res.json(records);
						}
						mongoclient.close();
					}
				);
			});		
		});
	});

});


//atualizar dados do usuario
app.post('/usuarioUpdate', function(req, res){

	res.setHeader("Access-Control-Allow-Origin", "*");

	db.open( function(err, mongoclient){
		mongoclient.collection('login', function(err, collection){
			collection.update(
				{ _id : objectId(req.body.id) },
				{ $set : {Username: req.body.Username, Email: req.body.Email, Password: req.body.Password }},				
				{multi: true},

				function(err, records){
					if(err){
						res.json(err);
					} else {
						res.json(records);
					}
					mongoclient.close();
				}
			);	
		});
	});

});


//Listar imagem do usuario
app.post('/perfil/', function(req, res){

	res.setHeader("Access-Control-Allow-Origin", "*");

	var dados = req.body;

	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.find().toArray(function(err, results){
				
				//console.log(results); 
				const array = [];
				for (var i in results) {
					var author = results[i];
					if(author.author == dados.author){
						array.push(author);
						console.log(array);
					}				
				}

				if(err){
					res.json(err);
				} else {
					res.status(200).json(array);
				}
				mongoclient.close();
				
			});		
		});
	});

});

// Excluir postagem 
app.post('/api/:id', function(req, res){

	res.setHeader("Access-Control-Allow-Origin", "*");

	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.remove(
				{ _id : objectId(req.params.id) },				
				function(err, records){
					if(err){
						res.json(err);
					} else {
						res.json(records);
					}

					mongoclient.close();
				}
			);
		});
	});

});


//ira salva as imagem em base64
app.post('/postagem', function(req, res){

	var date = new Date();
	time_stamp = date.getTime();

	var url_imagem = time_stamp + '_' + req.files.img.originalFilename;

	var path_origem = req.files.img.path;
	var path_destino = './uploads/' + url_imagem;

	/*fs.rename(path_origem, path_destino, function(err){
		if(err){
			console.log(err);
			res.status(500).json({error: err});
			return;
		}

	});*/

	fs.writeFile(path_origem, path_destino, 'base64', (err) => {
		if(err) console.log(err);
	
	});

});

//PUT by ID (update)
app.post('/comentarios', function(req, res){

	
	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.update(
				{ _id : objectId(req.body.id) },
				{ $push : 	{
								comentarios : req.body.comentarios

								/*comentarios : {
									//id_comentario : new objectId(),
									comentario : req.body.comentarios
								}*/
							}
				},
				{},
				function(err, records){
					if(err){
						res.json(err);
					} else {
						res.json(records);
					}

					mongoclient.close();
				}
			);
		});
	});

});

//DELETE by ID (remover)
app.delete('/api/:id', function(req, res){

	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.update(
				{ }, 
				{ $pull : 	{
								comentarios: { id_comentario : objectId(req.params.id)}
							}
				},
				{multi: true},
				function(err, records){
					if(err){
						res.json(err);
					} else {
						res.json(records);
					}

					mongoclient.close();
				}
			);
		});
	});

});