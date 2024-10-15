import mongoose from 'mongoose';

const postSchema = mongoose.Schema({  //schema is here is used so that post has to have these things in it and mongoose easily do it.
      title: String,
      message: String,
      name: String,
      creator: String,
      tags:[String],
      selectedFile:String,
      likes:{
        type: [String],
        Default: [],
      },
      createdAt:{
        type:Date,
        default:new Date
      },
})

const PostMessage = mongoose.model('PostMessage',postSchema); //it converts our schema into model.

export default PostMessage; //we are exporting mongoose model from postMessage(file) and later on we can perfom operations on this model like find,create,delete etc.