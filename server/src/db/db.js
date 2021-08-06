const db = require('mongoose')

db.connect('mongodb://127.0.0.1:27017/chat-app', {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})