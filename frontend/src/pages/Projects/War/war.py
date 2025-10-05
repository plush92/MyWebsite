# activate virtual env:
#cd /Users/brendanduffy/Documents/MyWebsite
#source venv/bin/activate

from typing import NamedTuple, Dict
import random

class Player:
    def __init__(self, name):
        self.name = name
        self.deck = []
    
    def play_card(self):
        if self.deck:
            return self.deck.pop(0)
        return None

    def add_cards(self, cards):
        if isinstance(cards, list):  
            # If 'cards' is a list (multiple cards), add all of them to the deck
            self.deck.extend(cards)
        else:  
            # Otherwise, treat 'cards' as a single card and add it to the deck
            self.deck.append(cards)
            # This is uncommon for war, but good that we have a method to handle it at least.

    def give_cards(self, war_pile):
        if len(self.deck) < 4:
            return None
        for _ in range(3):
            war_pile.append(self.deck.pop(0))
        return self.deck.pop(0)
    
    def name_to_json(self):
        return {"name": self.name}
    
    def deck_to_json(self):
        return {"deck": [card.card_to_json() for card in self.deck]}
    
    def to_json(self):
        return {
            "name": self.name,
            "deck length": len(self.deck),
            "top card": self.deck[0].card_to_json() if self.deck else None
        }

    
    
class Card:
    suits = [
        ("S", "Spades"),
        ("H", "Hearts"),
        ("D", "Diamonds"),
        ("C", "Clubs"),
    ]

    ranks = {
        "A": ("Ace", 14),
        "K": ("King", 13),
        "Q": ("Queen", 12),
        "J": ("Jack", 11),
        "T": ("10", 10),
        "9": ("9", 9),
        "8": ("8", 8),
        "7": ("7", 7),
        "6": ("6", 6),
        "5": ("5", 5),
        "4": ("4", 4),
        "3": ("3", 3),
        "2": ("2", 2),
    }

    display_rank = {
        2: ("2"),
        3: ("3"),
        4: ("4"),
        5: ("5"),
        6: ("6"),
        7: ("7"),
        8: ("8"),
        9: ("9"),
        10: ("10"),
        11: ("J"),
        12: ("Q"),
        13: ("K"),
        14: ("A"),
    }

    def __init__(self, value):
        self.value = value #1-52
        self.rank = (value - 1) % 13 + 2  #2-14 (2-10, J, Q, K, A (ace is highest)).
        self.suit = self.suits[(value - 1) // 13] #Hearts, Clubs, Spades, Diamonds.
        #if value = 14, rank is 13%13+2 = 2, and suit = suits[1] = Hearts. so 14 = 2 of Hearts

    def __lt__(self, other):  # less than
        return self.rank < other.rank

    def __eq__(self, other):  # equal
        return self.rank == other.rank

    def __str__(self):  # for printing
        rank_name = self.display_rank.get(self.rank, str(self.rank))
        return f"{rank_name} of {self.suit[1]}"
    
    def card_to_json(self):
        return {
            "rank": self.display_rank[self.rank],
            "suit": self.suit[1]                    
            }

class Game:
    def __init__(self, player1, player2, deck):
        self.player1 = player1
        self.player2 = player2
        self.deck = deck
        self.deal_cards()
        self.rounds_played = 0 #total rounds attempted
        self.rounds_won = {self.player1.name: 0, self.player2.name: 0}
        self.last_winner = None #who won the most recent round
        self.wars_count = 0 #number of wars that have occurred
        self.current_war_chain = 0
        self.longest_war_chain = 0
    
    def to_json(self):
        return {
            # Get each player's JSON representation
            "players": {
                "player 1": self.player1.to_json(),
                "player 2": self.player2.to_json(),
            },

            # Return the scores dictionary you’re already tracking
            "scores": self.rounds_won,

            # Most recent round winner (could be None if no rounds yet)
            "last_winner": self.last_winner,

            # Total rounds that have been played
            "rounds_played": self.rounds_played,

            # Number of wars that have occurred
            "wars_count": self.wars_count,

            # How many consecutive wars are happening currently
            "current_war_chain": self.current_war_chain,

            # Longest chain of wars recorded in the game
            "longest_war_chain": self.longest_war_chain,
        }
    
    def score_to_json(self):
        return {"name": self.rounds_won}
    
    def rounds_played_to_json(self):
        return {"rounds played": self.rounds_played}
    
    def last_winner_to_json(self):
        return {"last winner": self.last_winner}
    
    def update_score(self, winner):
        self.rounds_played += 1
        if isinstance(winner, Player):
            self.rounds_won[winner.name] += 1
            self.last_winner = winner.name
        else:
            self.last_winner = None


    
    def deal_cards(self):
        while self.deck: #if a deck exists:
            self.player1.deck.append(self.deck.pop()) #player 1 is dealt a card
            if self.deck: #followed by:
                self.player2.deck.append(self.deck.pop()) #player 2 is dealt a card
    
    def resolve_war(self, war_pile):
        war = True
        while war:
            # Check if either player cannot continue
            if len(self.player1.deck) < 4:
                print(f"{self.player2.name} wins the war, {self.player1.name} doesn't have enough cards")
                self.player2.add_cards(war_pile + self.player1.deck)
                self.player1.deck = []
                war = False
                break
            elif len(self.player2.deck) < 4:
                print(f"{self.player1.name} wins the war, {self.player2.name} doesn't have enough cards")
                self.player1.add_cards(war_pile + self.player2.deck)
                self.player2.deck = []
                war = False
                break

            # Each player contributes cards
            faceup1 = self.player1.give_cards(war_pile)
            faceup2 = self.player2.give_cards(war_pile)
            war_pile.append(faceup1)
            war_pile.append(faceup2)

            print(f"WAR CARDS: {self.player1.name} plays {faceup1}, {self.player2.name} plays {faceup2}")

            if faceup1 > faceup2:
                self.player1.add_cards(war_pile)
                self.update_score(self.player1)
                print(f"{self.player1.name} wins the war")
                war = False
            elif faceup2 > faceup1:
                self.player2.add_cards(war_pile)
                self.update_score(self.player2)
                print(f"{self.player2.name} wins the war")
                war = False


    def play_round(self):
        card1 = self.player1.play_card() #player 1 plays a card
        card2 = self.player2.play_card() #player 2 plays a card
        if card1 is None or card2 is None: #if neither plays a card:
            return None

        print(f"{self.player1.name} plays {card1}, {self.player2.name} plays {card2}") #print each player's card

        if card1 > card2: #if player 1's card > player 2's card:
            self.player1.add_cards([card1, card2]) #player1 collects both cards
            self.update_score(self.player1)
            print(f"{self.player1.name} wins the round") #print player 1 wins
        elif card2 > card1: 
            self.player2.add_cards([card1, card2])
            self.update_score(self.player2)
            print(f"{self.player2.name} wins the round")
        else:
            war_pile = [card1, card2]
            self.resolve_war(war_pile)

        print(f"{self.player1.name} has {self.rounds_won[self.player1.name]} rounds won, {self.player2.name} has {self.rounds_won[self.player2.name]} rounds won")
 
        return True
    

# Only run the game if this file is executed directly (not imported)
if __name__ == "__main__":
    deck = [Card(value) for value in range(1, 53)]
    random.shuffle(deck)
    player1 = Player("Alice")
    player2 = Player("Bob")

    game = Game(player1, player2, deck)
    while len(player1.deck) > 0  and len(player2.deck) > 0:
        game.play_round()




