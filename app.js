var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    app        = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE/MODEL CONFIG
var blogSchema = mongoose.Schema({
  title: String,
  body: String,
  image: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTful ROUTES

app.get("/", function(req, res){
  res.redirect("/blogs");
});

//INDEX Route
app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log(err);
    }else {
      res.render("index", {blogs: blogs});
    }
  })
});

//NEW Route
app.get("/blogs/new", function(req, res){
  res.render("new");
});

//CREATE Route

app.post("/blogs", function(req, res){
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    }else {
      res.redirect("/blogs");
    }
  });
});



app.listen(3000, function(){
  console.log("server is running on port 3000");
});
