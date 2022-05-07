const express=require("express");
const _=require("lodash");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const res = require("express/lib/response");
const req = require("express/lib/request");
const { redirect } = require("express/lib/response");


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});


const homeText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia assumenda dignissimos exercitationem doloribus. Distinctio, voluptatem? Natus minus neque unde ullam aperiam aliquam iste reprehenderit, facere consectetur recusandae iusto, voluptatibus cum repudiandae distinctio. Assumenda itaque quae labore culpa placeat blanditiis dignissimos mollitia molestiae quos modi voluptatem fugit porro officiis nam autem exercitationem consequuntur, vitae, voluptate eveniet eaque alias laboriosam a illum. Saepe eveniet expedita aperiam dolorum? Harum assumenda necessitatibus quas sunt perferendis saepe perspiciatis deserunt, molestias dolorem, nam laudantium, minima doloribus nostrum officia ex. Deserunt praesentium quo nostrum omnis! Necessitatibus labore maiores quos consequatur tempore ducimus harum voluptate? Ut, voluptatum officiis.";
const aboutContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia assumenda dignissimos exercitationem doloribus. Distinctio, voluptatem? Natus minus neque unde ullam aperiam aliquam iste reprehenderit, facere consectetur recusandae iusto, voluptatibus cum repudiandae distinctio. Assumenda itaque quae labore culpa placeat blanditiis dignissimos mollitia molestiae quos modi voluptatem fugit porro officiis nam autem exercitationem consequuntur, vitae, voluptate eveniet eaque alias laboriosam a illum. Saepe eveniet expedita aperiam dolorum? Harum assumenda necessitatibus quas sunt perferendis saepe perspiciatis deserunt, molestias dolorem, nam laudantium, minima doloribus nostrum officia ex. Deserunt praesentium quo nostrum omnis! Necessitatibus labore maiores quos consequatur tempore ducimus harum voluptate? Ut, voluptatum officiis.";
const contactContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia assumenda dignissimos exercitationem doloribus. Distinctio, voluptatem? Natus minus neque unde ullam aperiam aliquam iste reprehenderit, facere consectetur recusandae iusto, voluptatibus cum repudiandae distinctio. Assumenda itaque quae labore culpa placeat blanditiis dignissimos mollitia molestiae quos modi voluptatem fugit porro officiis nam autem exercitationem consequuntur, vitae, voluptate eveniet eaque alias laboriosam a illum. Saepe eveniet expedita aperiam dolorum? Harum assumenda necessitatibus quas sunt perferendis saepe perspiciatis deserunt, molestias dolorem, nam laudantium, minima doloribus nostrum officia ex. Deserunt praesentium quo nostrum omnis! Necessitatibus labore maiores quos consequatur tempore ducimus harum voluptate? Ut, voluptatum officiis.";

// const posts=[];

const postsSchema={
    title:String,
    content:String
};

const Post=mongoose.model("Post",postsSchema);


app.get("/",function(req,res){
    
    Post.find({},function(err,posts){
        if(!err){
            res.render("home",
    {
        hText:homeText,
        posts:posts,
    });
        }
    });
    

});

app.get("/about",function(req,res){
    res.render("about",{aboutText:aboutContent});
});

app.get("/contact",function(req,res){
    res.render("contact",{contactText:contactContent});
});

app.get("/compose",function(req,res){
    
    res.render("compose");
});

app.post("/compose",function(req,res){

    const post=new Post({
        title:req.body.postTitle,
        content:req.body.postBody
    });
    post.save();
   res.redirect("/");
});

app.get("/post",function(req,res){

    res.redirect("/");
});


app.get("/post/:postId",function(req,res){
    const requestedPostId=req.params.postId  ;

    Post.findOne({_id:requestedPostId},function(err,post){
        res.render("post",{postHeading:post.title,postBodyText:post.content});

    });


});




app.listen(3000,function(){
    console.log("server started at port 3000");
});