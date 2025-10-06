# activate virtual env:
# cd /Users/brendanduffy/Documents/MyWebsite
# source venv/bin/activate
# uvicorn frontend.src.pages.Projects.War.api:app --reload
# to deactivate virtual environment: deactivate

from fastapi import FastAPI, HTTPException, status, Path
from frontend.src.pages.Projects.War.war import Game, Player, Card, create_deck
import random
from typing import Optional
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

class GameRequest(BaseModel):
    player1: str
    player2: str

deck = create_deck()
player1 = Player("Alice")
player2 = Player("Bob")
game = Game(player1, player2, deck)

@app.get("/")
async def root():
    return {"message": "War Game API is running."}

@app.get("/game")
def get_game_state():
    return game.to_json()

@app.post("/game")
def start_game(req: GameRequest):
    global game
    player1 = Player(req.player1)
    player2 = Player(req.player2)
    deck = create_deck()
    game = Game(player1, player2, deck)
    return game.to_json()

@app.post("/play_round")
async def play_round():
    global game
    result = game.play_round()
    if result is None:
        return {"message": "Game over — one player has no cards left.", "state": game.to_json()}
    return game.to_json()

@app.post("/reset")
async def reset_game(
    player1_name: Optional[str] = "Alice",
    player2_name: Optional[str] = "Bob"
):
    global game
    deck = create_deck()
    player1 = Player(player1_name)
    player2 = Player(player2_name)
    game = Game(player1, player2, deck)
    return {"message": "New game started!", "state": game.to_json()}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
