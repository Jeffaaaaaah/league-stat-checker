import cringe
import threading, time
import os
from flask import Flask, render_template, redirect, request

app = Flask(__name__)


@app.route('/')
def home():
    return render_template("home.html")

    
@app.route('/matchhistory')
def matchHistory():
    query = request.args.get("playername")
    if query == None or query == "":
        return redirect("/")
    else:
        return render_template("matchHistory.html", PLAYERNAME=query)
    
@app.route('/getData', methods=['POST'])
def data():
    pass

###########################################################################################################

def open():
    time.sleep(1)
    os.system('"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" ' + "http://127.0.0.1:5000/")
    return

if __name__ == "__main__":
    
    debug = True
    if not debug:
        y = threading.Thread(target=open, daemon=True)
        y.start()
    app.run(debug=debug)
    
    
    
