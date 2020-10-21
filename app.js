let express = require('express')
let app = express()
let mySQL = require('mysql')
let bodyParser = require('body-parser')

//set the template engine, parser, and other uses
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))

let connection = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'join_us'
})

//=============PORT SETUP==================
app.listen(8080, function(){
    console.log('App listening on port 8080')
})


//==============ROUTES=====================
app.get("/",function(request,response){

    console.log('we have activity');

    let countQ = "select count(*) as Total from users"
    let usersCount;
    
    
    connection.query(countQ,function(error, results, fields){
        if(error)
        {
            console.log(error.message)
        }
        else
        {
            usersCount = results[0].Total;

            let responseToDisplay = `We have ${usersCount} users so far`

            response.render('home',{data: usersCount})
        }
    })
    
})

app.post("/register",function(request,response){
    
    let person = {
        email: request.body.email
    }

    let insertQ = `INSERT INTO users SET ?`

    connection.query(insertQ,person,function(error,res){
        if(error)
        {
            throw(error)
            console.log(error)
        }else{
            console.log(`Person with email ${person.email} added`)
           
            //response.send(`Thank you for joining ${person.email}`)
            
            response.redirect("/")
        }
    })
})


app.get("/joke",function(request,response){
    let joke = 'Alabra-Kadabrador!!! <em>Cheesey AF</em><input placeholder="email"></input><button>Submit</button>'
    
    console.log('REQUISTED THE JOKE ROUTE!')
    response.send(joke);
})

app.get("/random_num", function(request,response){
    let finalLottoNums = [...randomLottNum(5,59)]//this is how you want to copy the array not finalArr = [arrFromFunc]
    let randNum = randomNumber(0,100)

    finalLottoNums.map(r=>{
        console.log(r + ' is your lucky number')
    })

    response.send("Your lucky number is " + randNum)
})


//==================functions================
function randomNumber(min, max) {  
    return Math.floor(Math.random() * max) + 1
    //(max - min) + min); 
}

const randomLottNum = (pickSize, maxNum) =>{
    
    let pickFiveCollection = []
    let noDuplicates = false;

    for(let i = 0; i < pickSize;i++ )
    {
        if(pickFiveCollection.length == 0)
        {
            pickFiveCollection.push(randomNumber(0,maxNum))
            console.log("First num added")
        }
        else{
            do
            {
                
                var numToBeAdded = randomNumber(0,maxNum)
    
                pickFiveCollection.forEach(element => {
                    
                    if(element == numToBeAdded)
                    {
                        noDuplicates = false;
                        console.log('Duplicate found so re-do!')
                    }
                    
                    if(element != numToBeAdded){
                        noDuplicates = true;
                    }
                
                });
    
            }while(!noDuplicates)

            if(noDuplicates)
            {
                pickFiveCollection.push(numToBeAdded)
            }
        }
    }
    
    return pickFiveCollection;
}