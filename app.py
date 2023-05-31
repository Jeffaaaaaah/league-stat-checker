import Backend
from dotenv import load_dotenv
import threading, time, os, json
from flask import Flask, render_template, redirect, request


load_dotenv()
KEY = os.getenv("RIOT_API")
backend = Backend.App(KEY)
backend_player = Backend.Player(KEY, player='') #use when implementing cookies


app = Flask(__name__)


@app.route('/')
def home():
    return render_template("home.html")


@app.route('/error')
def error():
    return render_template("error.html")

    
@app.route('/matchhistory')
def matchHistory():
    query = request.args.get("playername")
    if query == None or query == "":
        return redirect("/")
    else:
        return render_template("matchHistory.html", PLAYERNAME=query)
    
    
@app.route('/api/matchhistory', methods=['POST'])
def data():
    name = request.get_json()
    print(name)
    if not name:
        return redirect("/error")
    else:
        x = {"matches": []}
        for y in range(10):
            x['matches'].append({'match': str(y)})
        return json.dumps({'matches':[1, 2, 3]})

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
    
    
    
