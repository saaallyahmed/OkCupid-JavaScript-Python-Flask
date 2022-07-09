from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo

# Create an instance of Flask
app = Flask(__name__,template_folder='templates')
app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
mongo = PyMongo(app)
# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    return render_template("index.html")  

# Route to the basic info
@app.route("/basic_info")
def basic_info():
    print("================")
    print("Basic Info")
    print("================")
    
    return render_template("index1.html") 


if __name__ == "__main__":
    app.run(debug=True)

@app.route('/test')
def test():
    # Find one record of data from the mongo database
    mars = mongo.db.mars.find_one()
    print(mars)
    # Return template and data
    return render_template("index.html", mars=mars)
