//we made controller folder such that we don't have to write logic for each route in posts.js of routes folder instead we just
//call router on that so that it reamains readable. and we write all logic inside that route in this posts.js of controller.
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts= async(req,res)=>{      
    const { page } = req.query;    
    try{
           const LIMIT = 8;
           const startIndex = (Number(page)-1)*LIMIT; //each page's starting index.
           const total = await PostMessage.countDocuments({})

           const posts= await PostMessage.find().sort({ _id:-1}).limit(LIMIT).skip(startIndex);//this will give the array of all the message present in model.
           res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    }
    catch(error){
            res.status(404).json({message: error.message});
    }
}

export const getPost = async(req,res) => {
    const{ id } = req.params;

    try{
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch(error){
        res.status(404).json({ message: error.message});
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags, page } = req.query; // also extract page number

    try {
        const title = new RegExp(searchQuery, 'i');
        const LIMIT = 8;  // Limit the number of posts per page
        const startIndex = (Number(page) - 1) * LIMIT;  // Calculate the starting index for pagination

        let posts = [];
        let total = 0;

        // Handle different search conditions (searchQuery, tags, or both)
        if (searchQuery && tags) {
            total = await PostMessage.countDocuments({ 
                $or: [
                    { title },
                    { tags: { $in: tags.split(',') } }
                ] 
            });
            posts = await PostMessage.find({
                $or: [
                    { title },
                    { tags: { $in: tags.split(',') } }
                ]
            })
            .sort({ _id: -1 })  // Sort by newest
            .limit(LIMIT)
            .skip(startIndex);  // Pagination using limit and skip
        } else if (searchQuery) {
            total = await PostMessage.countDocuments({ title });
            posts = await PostMessage.find({ title })
            .sort({ _id: -1 })
            .limit(LIMIT)
            .skip(startIndex);
        } else if (tags) {
            total = await PostMessage.countDocuments({ tags: { $in: tags.split(',') } });
            posts = await PostMessage.find({ tags: { $in: tags.split(',') } })
            .sort({ _id: -1 })
            .limit(LIMIT)
            .skip(startIndex);
        }

        res.status(200).json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT)
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



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
