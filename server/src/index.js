const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/users')
require('./db/db')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors());
app.use(userRouter)


app.listen(port, () => {
    console.log('Server Started at port ' + port)
})