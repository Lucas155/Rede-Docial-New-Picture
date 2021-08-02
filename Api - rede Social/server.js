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

app.get('/usuario/:id', function(req, res){
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
						res.json({'ok' : 'true'});
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

	res.setHeader("Access-Control-Allow-Origin", "*");

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
	console.log(dados);

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

		var dados = {
			url_imagem: url_imagem,
			descricao: req.body.descricao
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

	fs.readFile('./uploads/'+img, function(err, content){
		if(err){
			res.status(400).json(err);
			return;
		}

		res.writeHead(200, { 'content-type' : 'image/jpg'});
		res.end(content);
	})
});

// lista todas postagem
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
				} else {
					res.status(200).json(results);
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

//PUT by ID (update)
/*app.put('/api/:id', function(req, res){
	
	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.update(
				{ _id : objectId(req.params.id) },
				{ $push : 	{
								comentarios : {
									id_comentario : new objectId(),
									comentario : req.body.comentario
								}
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

});*/

app.delete('/api/:id', function(req, res){
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