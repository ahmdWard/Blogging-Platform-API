const {client} =require('../db/dbConnections')

const AppError=require('../utils/appError')


exports.getBlog= async (req,res,next)=>{
    try {
        const result = await client.query(`select * from blogs where id = ${req.params.id}`)
        const blog =result.rows
        if(!blog[0])
           return next(new AppError('no blog with this ID'),404)
       
        res.status(200).json({
            status:"sucees",
            data:{
                blog
            }
        })
    } catch (error) {
        next(new AppError('there is a problem in getting back blog'),400)
    }

}

exports.createBlog= async (req,res,next)=>{
 
   const {title, content , category ,tags}=req.body
   const tagsArray= `${tags.join(',')}`
   console.log(title, content,category,tags, tagsArray)
  
   try {

    const result = await client.query(' insert into blogs (title , content ,category , tags) values($1 , $2 , $3 , $4 )RETURNING *',
    [title,content,category,tags]
   ) 

   res.status(200).json({
    status:"success",
    data: {
        blog:result
    }
   });
    
   } catch (err) {
    return next(new AppError('Error creating blog post', 500));
  }
   
}


exports.getAllBlogs= async (req,res,next)=>{

    try {
        const result = await client.query('select * from blogs')
        const blogs= result.rows
        console.log(blogs)
        res.status(200).json({
            status:"sucess",
            data:{
                blogs 
            }
        })
        
    } catch (error) {
        next(new AppError('Error getting blogs'),404)
    }

}

exports.updateBlog= (req,res,next)=>{
 

}

exports.deleteBlog= (req,res,next)=>{
 

}
