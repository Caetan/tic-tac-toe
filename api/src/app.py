from flask import Flask, request, jsonify
from flask_cors import CORS
from game import Game, GameError

app = Flask(__name__)
CORS(app)

games = {}

@app.route('/move', methods=['POST'])
def move():
    data = request.json

    match_id = data.get('matchId')
    player_id = data.get('playerId')
    x = data.get('square').get('x')
    y = data.get('square').get('y')

    if match_id not in games:
        return jsonify({"error": "Match not found"}), 404

    try:
        games[match_id].move(player_id, x, y)
    except GameError as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "Movement completed successfully"}), 200

@app.route('/status', methods=['GET'])
def get_status():
    match_id = request.args.get('matchId')

    if match_id not in games:
        return jsonify({"error": "Match not found"}), 404

    status = games[match_id].get_status()

    return jsonify(status), 200

@app.route('/create', methods=['POST'])
def create_match():
    new_game = Game()
    match_id = new_game.match_id
    games[match_id] = new_game

    return jsonify({"matchId": match_id}), 200  

if __name__ == '__main__':
    app.run(debug=True)

