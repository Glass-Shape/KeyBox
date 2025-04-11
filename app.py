from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

def get_message_from_db(code):
    conn = sqlite3.connect("messages.db")
    cursor = conn.cursor()
    cursor.execute("SELECT message FROM messages WHERE code = ?", (code,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else "Message inconnu pour ce QR code."

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/message/<code>")
def get_message(code):
    message = get_message_from_db(code)
    return jsonify({"message": message})

if __name__ == "__main__":
    app.run(debug=True)
