const express = require('express');
const cors = require('cors');

const {Sequelize} = require('./models');

const models=require('./models');
const itempedido = require('./models/itempedido');

const app=express();
app.use(cors());
app.use(express.json())

let cliente = models.Cliente;
let itemPedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;
let compra = models.Compra;
let produto = models.Produto;
let itemCompra = models.ItemCompra

app.get('/', function(req, res){
    res.send('Olá, mundo!')
});

// app.get('/servicos', async(req, res) =>{
//     await servico.create({
//         nome: "HTML/CSS",
//         descricao: "Páginas estáticas estilizadas",
//         createAt: new Date(),
//         updateAt: new Date()
//     });
//     res.send('Serviço criado com sucesso!');
// });

app.post('/servicos', async(req, res) =>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
}); //http://localhost:3001/servicos

app.post('/clientes', async(req, res) =>{
    await cliente.create(
        req.body 
    ).then(function(){
        return res.json({
            error: false,
            message: "Cliente adicionado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível incluir esse cliente."
        })
    });
});  //http://localhost:3001/clientes

app.post('/pedidos', async(req, res) =>{
    await pedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Pedido computado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível gerar esse pedido."
        })
    });
});  //http://localhost:3001/pedidos

app.post('/itempedidos', async(req, res) =>{
    await itemPedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item do pedido acrescentado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível acrescentar este item ao pedido."
        })
    });
});  //http://localhost:3001/itempedidos

app.post('/compras', async(req, res) =>{
    await compra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Compra efetuada com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Não foi possível concluir essa compra."
        })
    });
}); //http://localhost:3001/compras

app.post('/produtos', async(req, res) =>{
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Produto selecionado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível selecionar este produto."
        })
    });
}); //http://localhost:3001/produtos

app.post('/itemcompras', async(req, res) =>{
    await itemCompra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item da compra acrescentado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível acrescentar este item à compra."
        })
    });
});  //http://localhost:3001/itemcompras

app.get('/listaservicos',async(req, res)=>{
    await servico.findAll({
        //raw: true
        order: [['nome', 'ASC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});  //http://localhost:3001/listaservicos

app.get('/listacompras',async(req, res)=>{
    await compra.findAll({
        order: [['data', 'ASC']]
    }).then(function(compras){
        res.json({compras})
    });
});  //http://localhost:3001/listacompras

app.get('/listapedidos',async(req, res)=>{
    await pedido.findAll({
        order: [['nome', 'ASC']]
    }).then(function(pedidos){
        res.json({pedidos})
    });
});  //http://localhost:3001/listapedidos


app.get('/listaclientes', async(req, res)=>{
    await cliente.findAll({
        raw: true,
    }).then(function(clientes){
        res.json({clientes})
    });
});  //http://localhost:3001/listaclientes

app.get('/listaitemcompras',async(req, res)=>{
    await itemCompra.findAll({
        order: [['quantidade', 'ASC']]
    }).then(function(itemCompras){
        res.json({itemCompras})
    });
});  //http://localhost:3001/listaitemcompras

app.get('/listaitempedidos',async(req, res)=>{
    await itemPedido.findAll({
        order: [['PedidoId', 'ASC']]
    }).then(function(itemPedidos){
        res.json({itemPedidos})
    });
});  //http://localhost:3001/listaitempedidos

app.get('/listaprodutos',async(req, res)=>{
    await produto.findAll({
        order: [['nome', 'ASC']]
    }).then(function(produtos){
        res.json({produtos})
    });
});  //http://localhost:3001/listaprodutos

app.get('/ofertaservicos', async(req, res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

app.get('/servico/:id', async(req, res)=>{
    await servico.findByPk(req.params.id)
    .then(serv =>{
        return res.json({
            error: false,
            serv
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível conectar!"
        });
    });
});

app.put('/atualizaservicos', async(req, res)=>{
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração de serviço."
        });
    });
});

app.put('/atualizaclientes', async(req, res)=>{
    await cliente.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do cliente."
        });
    });
});

app.put('/atualizacompras', async(req, res)=>{
    await compra.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Compra foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração da compra."
        });
    });
});

app.put('/atualizaitemcompras', async(req, res)=>{
    await itemCompra.update(req.body,{
        where: {CompraId: req.body.CompraId}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item da compra foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do item da compra."
        });
    });
});

app.put('/atualizaitempedidos', async(req, res)=>{
    await itemPedido.update(req.body,{
        where: {PedidoId: req.body.PedidoId}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item do pedido foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do item do pedido."
        });
    });
});

app.put('/atualizapedidos', async(req, res)=>{
    await pedido.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do pedido."
        });
    });
});

app.put('/atualizaprodutos', async(req, res)=>{
    await produto.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do produto."
        });
    });
});

app.get('/pedidos/:id', async(req, res)=>{
    await pedido.findByPk(req.params.id,{include: [{all: true}]})
    .then(ped=>{
        return res.json({ped});
    });
});

app.put('/pedidos/:id/editaritem', async(req, res)=>{
    const item={
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if (!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Pedido não foi encontrado.'
        });
    };

    if (!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };

    await itemPedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId},
            {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: 'Pedido foi alterado com sucesso!',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

app.get('/excluirclientes/:id', async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o cliente."
        });
    });
});

app.get('/excluircompras/:id', async(req, res)=>{
    await compra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Compra foi excluída com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir a compra."
        });
    });
});

app.get('/excluiritemcompras/:id', async(req, res)=>{
    await itemCompra.destroy({
        where: {ProdutoId: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item da compra foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o item da compra."
        });
    });
});

app.get('/excluiritempedidos/:id', async(req, res)=>{
    await itemPedido.destroy({
        where: {PedidoId: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item do pedido foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o item do pedido."
        });
    });
});

app.get('/excluirpedidos/:id', async(req, res)=>{
    await pedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o pedido."
        });
    });
});

app.get('/excluirprodutos/:id', async(req, res)=>{
    await produto.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o produto."
        });
    });
});

app.get('/excluirservicos/:id', async(req, res)=>{
    await servico.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o serviço."
        });
    });
});

let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});