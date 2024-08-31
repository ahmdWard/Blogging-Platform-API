const {client} =require('../db/dbConnections')

const AppError=require('../utils/appError')


exports.getBlog= async (req,res,next)=>{

        const result = await client.query(`select * from blogs where id = ${req.params.id}`)
        const blog =result.rows
        if(!blog.length)
           return next(new AppError('no blog with this ID'),404)
       
        res.status(200).json({
            status:"sucees",
            data:{
                blog
            }
        })
    

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

exports.updateBlog= async (req,res,next)=>{

      const updates = req.body
      console.log(updates)

      const keys= Object.keys(updates)
      const values= Object.values(updates)
      console.log(keys);
      console.log(values);
      const setClause= Object.keys(updates).map((key,index)=>`${key}=$${index+1}`).join(',')
      console.log(setClause)
      if(!keys.length)
        return next(new AppError('No fields to update', 400))

  try{
    const result= await client.query(`update  blogs set ${setClause} where id = ${req.params.id} RETURNING *`,
        values
      )
      console.log(result)   
      


      res.status(200).json({
        status:"success",
        data:{
            result
        }
      })
    
  }
    catch (err) {
        console.error('Error updating blog:', err);
        return next(new AppError('There was a problem updating the blog', 500));
      }
  }
   



exports.deleteBlog=async (req,res,next)=>{

        const result = await client.query(
            'delete from blogs where id = $1 RETURNING *',[req.params.id]
        )
        if(!result.rows.length)
           return next(new AppError('this id is not found'),400)
      res.status(204).json({
        status:"sucess",
        data:{
            result
        }
      })
 
 
}
