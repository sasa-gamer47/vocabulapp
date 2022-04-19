// const mail = require('@sendgrid/mail')

// mail.setApiKey(process.env.SENDGRID_API_KEY)

// export default (req, res) => {
//     const body = JSON.parse(req.body)

//     const message = `
//         Email: ${body.email}\r\n
//         Message: Salve, hai mandato una richiesta per cambiare la password del tuo account VocabulApp\n
//         Se non sei stato tu a richiedere questa email, allora non rispondere.
//         Altimenti clicca <a href="http://localhost:3000/resetpassword">qui</a> per cambiare la password.
//         `

//     const data = {
//         to: body.email,
//         from: 'giacomofilippi@gmail.com',
//         subject: 'Richiesta cambio password',
//         text: message,
//         html: message.replace(/\r\n/g, '<br>')
//     }
    
//     mail.send(data)

//     console.log(data);
    
//     res.status(200).json({ status: 'Ok' })
// }
