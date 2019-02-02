var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var Submission = new Schema({
    name : {
        type : String
    },
    userid : {
        type : mongoose.Types.ObjectId
    }
}, {
    timestamps : true,
    collection : "Submission"
})

var Users = new Schema({
    email:{
        type:String
    },
    password :{
        type:String,
    }
},{
    timestamps: true,
    collection : "Users"
});

module.exports = {
    users : mongoose.model('Users', Users),
    submission : mongoose.model('Submission', Submission)
}