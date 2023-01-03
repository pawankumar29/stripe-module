const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const { resolve } = require('path')
const app = express()

var Publishable_Key = 'pk_test_51MLhGxSBwBtpAzTXzlPP2qjeM9covdJBKVUl3t1luPKAtRlaOHLMvS82T3J0EOMTHNuRi5FLJainzDUZJtbL9ISV00M67Niqjh'
var Secret_Key = 'sk_test_51MLhGxSBwBtpAzTXaoB797r2SFSbsgiMWIALGkpWqstN5ZUeCLZJ7VDUkPduL0XjoMyt32M8O4sv00gD5AzWRbsK00UtRdOJrP'

const stripe = require('stripe')(Secret_Key)

const port = process.env.PORT || 3000

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// View Engine Setup

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

let t;


// async function token(){
    
//    stripe.tokens.create({
//   card: {
//     number: '4242424242424242',
//     exp_month: 1,
//     exp_year: 2024,
//     cvc: '314',
//   },
// })
 

// return s;

// }


app.get('/', function(req, res){
	res.render('index', {
	key: Publishable_Key
	})
})

// app.post('/payment', function(req, res){

// 	// Moreover you can take more details from user
// 	// like Address, Name, etc from form
// console.log("start");
//     stripe.tokens.create({
//         card: {
//           number: '4242424242424242',
//           exp_month: 1,
//           exp_year: 2024,
//           cvc: '314',
//         },
//       }).then((token)=>{
 
//         console.log("token------>",token);
// 	stripe.customers.create({
// 		email: "pawan123@yopmail.com",
// 		source: token.id,
// 		name: 'Gourav Hammad',
//         // payment_method:token.card.id,
// 		address: {
// 			line1: 'TC 9/4 Old MES colony',
// 			postal_code: '452331',
// 			city: 'Indore',
// 			state: 'Madhya Pradesh',
// 			country: 'India',
// 		}
// 	})
// 	.then((customer) => {
//         console.log("customer------>",customer );
// 		 stripe.paymentIntents.create({
// 			amount: 2500,	 // Charging Rs 25
// 			description: 'Web Development Product',
// 			currency: 'INR',
// 			customer: customer.id,
//             payment_method_types:['card'],
//             confirm:true
           
// 		})
// 	.then((charge) => {
// 		res.json({status:200,msg:"successful",Data:charge}) // If no error occurs
// 	})
// 	.catch((err) => {
//         console.log(err.message);
// 		res.send(err.message)	 // If some error occurs
// 	})
//       ;
// })})})



app.post('/payment',async(req,res)=>{
    try {
        const token= await stripe.tokens.create({
                    card: {
                      number: '4242424242424242',
                      exp_month: 1,
                      exp_year: 2024,
                      cvc: '314',
                    },
                  }); // generate card token 

        const customer=await stripe.customers.create({
            		email: "pawan123@yopmail.com",
            		source: token.id,
            		name: 'Pawan Kumar',
                    // payment_method:token.card.id,
            		address: {
            			line1: 'TC 9/4 Old MES colony',
            			postal_code: '452331',
            			city: 'Indore',
            			state: 'Texas',
            			country: 'Usa',
            		}
            	})  // generate customer 

        const charge=await  stripe.paymentIntents.create({
            			amount: 2500,	 // Charging Rs 25
            			description: 'Web Development Product',
            			currency: 'INR',
            			customer: customer.id,
                        payment_method_types:['card'],
                        confirm:true
                       
            		})

                    //making payment 

        return res.json({status:200,msg:"successful",Data:charge});
    } catch (error) {
        res.json({status:400,msg:"Error","error":error.message});
    }
})

app.listen(port, function(error){
	if(error) throw error
	console.log("Server created Successfully")
})
