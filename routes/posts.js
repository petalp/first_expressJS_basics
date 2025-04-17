import express from 'express';
const router = express.Router();


let posts = [
    {id:1, title:"Game of Thrones"},
    {id:2, title:"Big Bang Thoery"},
    {id:3, title:"Gifted"}
];


//Get all posts
router.get('/', (req, res)=>{
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit>0){
        return res.status(200).json(posts.slice(0,limit));
    }
    res.status(200).json(posts);
});



//Get single post
router.get('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id === id);
    if(!post){
        res.status(404).json({msg:`A post with the id of ${id} was not found`})
    }
    else{
        res.status(200).json(post);
    }
})

//Create new post
router.post('/', (req, res)=>{
    const newPost = {
        id:posts.length+1,
        title: req.body.title
    };
    if(!newPost.title){
        return res.status(400).json({msg:'Please include a title'});
    }
    posts.push(newPost); 
    res.status(200).json(posts);
})

router.put('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id);
    console.log(post);
    if(!post){
        res.status(404).json({msg:`A post with the id of ${id} was not found`})
    }
    post.title = req.body.title;
    res.status(200).json(posts);
})

router.delete('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id);
    
    if(!post){
        res.status(404).json({msg:`A post with the id of ${id} was not found`})
    }
    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(posts);
})

export default router;