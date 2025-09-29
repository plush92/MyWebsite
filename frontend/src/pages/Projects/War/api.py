# activate virtual env:
# cd /Users/brendanduffy/Documents/MyWebsite
# source venv/bin/activate
# uvicorn frontend.src.pages.Projects.War.api:app --reload
# to deactivate virtual environment: deactivate

from fastapi import FastAPI
from frontend.src.pages.Projects.War.war import Game, Player, Card


app = FastAPI()


@app.get("/")
async def root():
    return {Game}