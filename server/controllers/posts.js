//we made controller folder such that we don't have to write logic for each route in posts.js of routes folder instead we just
//call router on that so that it reamains readable. and we write all logic inside that route in this posts.js of controller.
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts= async(req,res)=>{          
    try{
           const postMessages = await PostMessage.find();//this will give the array of all the message present in model.
           res.status(200).json(postMessages);
    }
    catch(error){
            res.status(404).json({message: error.message});
    }
}

export  const getPostsBySearch = async(req,res)=>{

    const  { searchQuery, tags } = req.query;
    try{
        const title = new RegExp(searchQuery, 'i');

        const posts = await PostMessage.find({ 
            $or: [
                {title},
                {tags: {$in: tags.split(',')}} 
            ]});

        res.json({ data: posts});
    }
    catch(error){
        res.status(404).json({ message: error.message })
    }
}
export const createPost=async(req,res)=>{
    const post = req.body;                 //new post that we receive from client side.
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()}); //sending value received from client to model.
    
    try{
        await newPost.save();
        res.status(201).json(newPost) //successfully creation.
    }
    catch(error){
          res.status(409).json({message: error.message}); //409 for conflict from client side.
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    // Use the result of findByIdAndUpdate to return the actual updated document
    const result = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(result);  // Return the updated document from the database
}


export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully." });
}


export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message:'Unauthenticated'});
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`);
    }
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){//like post

        post.likes.push(req.userId);
    }
    else{//dislike post
        post.likes = post.likes.filter((id) => id != String(req.userId));
    }
  
  
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
  };
