import sqlite3

conn = sqlite3.connect("messages.db")
cursor = conn.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS messages (code TEXT PRIMARY KEY, message TEXT)")

cursor.executemany(
    "INSERT INTO messages (code, message) VALUES (?, ?)",
    [
        ("HELLO", "Bonjour à toi !"),
        ("INFO", "Voici des informations utiles."),
        ("QR123", "Contenu secret détecté."),
    ]
)

conn.commit()
conn.close()
