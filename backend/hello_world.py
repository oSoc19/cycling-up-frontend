from flask import Flask
app = Flask(__name__)

@app.route("/api/")
def hello():
    return "Hello world!"

@app.route("/api/one")
def hello_one():
    return "page one"