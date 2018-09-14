var	bodyPareser = require("body-parser"),
 	mongoose = require("mongoose"),
 	express = require("express"),
 	app = express();
//App Config
 mongoose.connect("mongodb://localhost/blog_app",{ useNewUrlParser: true });
 app.set("view engine", "ejs");
 app.use(express.static("public"));
 app.use(bodyPareser.urlencoded({extended: true}));
//Moongose model congig
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);
	
//Restful Routes
app.get("/", function(req,res){
	res.redirect("/blogs");
});

app.get("/blogs",function(req, res){
	Blog.find({}, function(err, blogs){
		if (err) {
			console.log("Error");
		}
		else{
			res.render("index",{blogs: blogs});
		}
	});
});



app.listen(3000, function(req, res){
	console.log("Blog_App is running on sever 3000");
});
		