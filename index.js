var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine' , 'ejs');

var conn = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'book_list'
    }
);

conn.connect(function(err)
{
if(err) throw err;
console.log("connection successfull....")
}
);


app.get('/' ,function(req,res){
    res.render('insert');
});

app.post('/insert',function(req,res)
{
var bname=req.body.bname;
var aname=req.body.aname;
var email=req.body.email;

var sql= `insert into books(book_name,author_name,author_email) values('${bname}', '${aname}' , '${email}');`

conn.query(sql,function(err,results)
{
if(err) throw err;
res.send("<h1>data sent...</h1>");
});

});

app.get('/show' , function(req,res)
{
    var sql="select * from books";
    conn.query(sql,function(err,results)
    {
        if(err) throw err;
        res.render('show', {books:results});
    });



});

app.get('/delete/:id' ,function(req,res)
{
var id= req.params.id;

var sql= `delete from books where book_id='${id}'`;

conn.query(sql,function(err,results)
{
    if(err) throw err;
    res.redirect('/show');
});

});

app.get('/edit/:id' ,function(req,res)
{
var id= req.params.id;

var sql= `select * from books where book_id='${id}'`;

conn.query(sql,function(err,results)
{
    if(err) throw err;
    res.render('edit' ,{books:results});
});

});

app.post('/update/:id',function(req,res)
{
    var id= req.params.id;
    var bname=req.body.bname;
    var aname=req.body.aname;
    var email=req.body.email;

    var sql=`update books set book_name='${bname}',author_name='${aname}' ,author_email='${email}' where book_id='${id}'`;

    conn.query(sql,function(err,results)
{
    if(err) throw err;
    res.redirect('/show');
});
});

var server = app.listen(4000,function(){
    console.log("App running on 4000...");
});