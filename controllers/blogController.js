const {client} =require('../db/dbConnections')
const catchAsync= require('../utils/catchAsync')
const AppError=require('../utils/appError')


exports.getBlog= catchAsync(async(req,res,next)=> {

        const result = await client.query(`select * from blogs where id = ${req.params.id}`)
        const blog =result.rows
        if(!blog.length)
           return next(new AppError('no blog with this ID'),404)
       
        res.status(200).json({
            status:"sucess",
            data:{
                blog
            }
        })
    

})

exports.createBlog= catchAsync(async (req,res,next)=>{
 
   const {title, content , category ,tags}=req.body
  
    const result = await client.query(' insert into blogs (title , content ,category , tags) values($1 , $2 , $3 , $4 )RETURNING *',
    [title,content,category,tags]
   ) 

   res.status(201).json({
    status:"success",
    data: {
        blog:result
    }
   });
      
   
})


exports.getAllBlogs= catchAsync(async (req,res,next)=>{

        const result = await client.query('select * from blogs')
        const blogs= result.rows
        console.log(blogs)
        res.status(200).json({
            status:"sucess",
            data:{
                blogs 
            }
        })
        
 
})

exports.updateBlog= catchAsync(async (req,res,next)=>{

      const updates = req.body

      const keys= Object.keys(updates)
      const values= Object.values(updates)

      if(!keys.length)
        return next(new AppError('No fields to update', 400))

    const setClause= Object.keys(updates).map((key,index)=>`${key}=$${index+1}`).join(',')

    const result= await client.query(`update  blogs set ${setClause} where id = ${req.params.id} RETURNING *`,
        values
      )
      

      res.status(200).json({
        status:"sucess",
        data:{
            result
        }
      })
    

  })
   



exports.deleteBlog=catchAsync(async (req,res,next)=>{

        const result = await client.query(
            'delete from blogs where id = $1 RETURNING *',[req.params.id]
        )
        if(!result.rows.length)
           return next(new AppError('this id is not found'),400)
      res.status(204).json({
        status:"sucess",
        data:null
      })
 
 
})
