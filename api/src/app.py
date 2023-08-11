from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/move', methods=['POST'])
def move():
    data = request.get_json()
    print(data)

    return jsonify({"message": "Movement completed successfully"}), 200

@app.route('/status', methods=['GET'])
def get_status():
  
    return jsonify({"status": "This is a status"}), 200

@app.route('/create', methods=['POST'])
def create_match():

    return jsonify({"message": "New game"}), 200

if __name__ == '__main__':
    app.run(debug=True)

