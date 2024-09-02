
const mongoose = require('mongoose')
const { tags } = require('nodeman/lib/mustache')
const { types } = require('pg')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'your blog should have a title']
    },
    content:{
        type:String,
        required:[true,'blog should have a content']
    },
    category:{
        type:String,
    },
    tags:{
        type:[String]
    },
    createdAt:{
        type:Date,
        default: new Date().toISOString()
    },
    updatedAt:{
        type:Date
    }

})



blogSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});


module.exports=mongoose.model('blog',blogSchema)