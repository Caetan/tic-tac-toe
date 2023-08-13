import logging
import sys

logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s - %(levelname)s - %(message)s',
        stream=sys.stderr
    )

class GameError(Exception):
    pass

class Game:
    def __init__(self):
        self.match_id = str(hash(self))
        self.board = [[" " for _ in range(3)] for _ in range(3)]
        self.current_player = "X"
        self.game_over = False
        self.winner = None

    def check_winner(self):
        winning_combinations = [
            [(0, 0), (0, 1), (0, 2)],
            [(1, 0), (1, 1), (1, 2)],
            [(2, 0), (2, 1), (2, 2)],
            [(0, 0), (1, 0), (2, 0)],
            [(0, 1), (1, 1), (2, 1)],
            [(0, 2), (1, 2), (2, 2)],
            [(0, 0), (1, 1), (2, 2)],
            [(0, 2), (1, 1), (2, 0)]
        ]

        for win_line in winning_combinations:
            marks = [self.board[x][y] for x, y in win_line]
            if all(mark == "X" for mark in marks):
                return "X"
            elif all(mark == "O" for mark in marks):
                return "O"

        return None


    def check_tie(self):
        for row in self.board:
            for square in row:
                if square == " ":
                    return False
        return True

    def move(self, player_id, x, y):
        if self.game_over:
            logging.error("Match %s is finished", self.match_id)
            raise GameError("Game is over")
        if player_id != self.current_player:
            logging.error("Match %s - it's not the player %s turn", self.match_id, player_id)
            raise GameError("It's not your turn")
        if self.board[x][y] != " ":
            logging.error("Match %s - Player %s: Square %d-%d already occupied", self.match_id, player_id, x, y)
            raise GameError("Square already occupied")

        self.board[x][y] = player_id
        self.current_player = "X" if player_id == "O" else "O"

        winner = self.check_winner()
        if winner:
            self.game_over = True
            self.winner = winner

        if self.check_tie():
            self.game_over = True
            self.winner = None


    def get_status(self):
        status = {
            "board": self.board,
            "currentPlayer": self.current_player,
            "gameOver": self.game_over,
            "winner": self.winner,
        }
        return status
