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
            # this is uncommon for war, but good that we have a method to handle it at least.

    def give_cards(self, war_pile):
        if len(self.deck) < 4:
            return None
        for _ in range(3):
            war_pile.append(self.deck.pop(0))
        return self.deck.pop(0)
    
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
        rank_name = self.ranks.get(self.rank, str(self.rank))
        return f"{rank_name} of {self.suit}"

class Game:
    def __init__(self, player1, player2, deck):
        self.player1 = player1
        self.player2 = player2
        self.deck = deck
        self.deal_cards()
    
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
                print(f"{self.player1.name} wins the war")
                war = False
            elif faceup2 > faceup1:
                self.player2.add_cards(war_pile)
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
            print(f"{self.player1.name} wins the round") #print player 1 wins
        elif card2 > card1: 
            self.player2.add_cards([card1, card2])
            print(f"{self.player2.name} wins the round")
        else:
            war_pile = [card1, card2]
            self.resolve_war(war_pile)
            
                
        return True
    

deck = [Card(value) for value in range(1, 53)]
alice = Player("Alice")
bob = Player("Bob")

game = Game(alice, bob, deck)
game.play_round()

