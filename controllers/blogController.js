const Blog= require('../models/blogModel')
const AppError=require('../utils/appError')
const catchAsync= require('../utils/catchAsync')


exports.getBlog= catchAsync(async(req,res,next)=>{
    
    const id= req.params.id 

    const blog = await Blog.findById(id)
    if(!blog)
         return next(new AppError(' there no blog with this id '),404)
    
    res.status(200).json({
        sucess:"success",
        data:{
            blog
        }
    })
 

})

exports.createBlog= catchAsync(async(req,res,next)=>{
 

    const blog = await Blog.create(req.body)

    res.status(201).json({
        status:"success",
        data:{
            blog
        }
    })

})


exports.getAllBlogs= catchAsync(async(req,res,next)=>{

    const searchTerm = req.query.term;

    let filter = {};
    if (searchTerm) {
        filter = {
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { content: { $regex: searchTerm, $options: 'i' } },
                {tags: { $in: [searchTerm] }},
                {category:{$regex:searchTerm , $options :'i'}} 
            ]
        };
    }
 
    const blogs = await Blog.find(filter)

    if(!blogs||blogs.length===0)
        return next(new AppError('No blogs found matching the criteria'),404)

    res.status(200).json({
        status:"success",
        data:{
            blogs
        }
    })

})

exports.updateBlog=catchAsync(async(req,res,next)=>{
 
     const blog = await Blog.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
      runValidators: true
     })

     if(!blog)
        return next(new AppError('there is no blog in this ID'),404)
   
     res.status(200).json({
        status:"success",
        data:{
            blog
        }
     })

})

exports.deleteBlog=catchAsync(async(req,res,next)=>{
 
   const blog = await Blog.findByIdAndDelete(req.params.id)
    if(!blog)
        return next(new AppError('there is no blog in this ID'),404)

    res.status(204).json({
        status:"success",
        data:null
    })

})
