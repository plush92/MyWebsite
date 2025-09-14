export type Suit = "S" | "H" | "D" | "C";
export type CardT = { suit: Suit; rank: number; id: string };

const ranks = [2,3,4,5,6,7,8,9,10,11,12,13,14]; // 11=J,12=Q,13=K,14=A
const suits: Suit[] = ["S", "H", "D", "C"];

export const formatCard = (c: CardT) => {
  const r = c.rank <= 10 ? String(c.rank) : ({11:"J",12:"Q",13:"K",14:"A"} as any)[c.rank];
  const s = { S: "♠", H: "♥", D: "♦", C: "♣" }[c.suit];
  return `${r}${s}`;
};

export const teamName = (p: number) => (p % 2 === 0 ? "South/North" : "West/East");

export function makeDeck(): CardT[] {
  const deck: CardT[] = [];
  for (const s of suits) for (const r of ranks) deck.push({ suit: s, rank: r, id: `${s}${r}` });
  return deck;
}

function shuffle<T>(a: T[]) {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function dealNewHand(): CardT[][] {
  const deck = shuffle(makeDeck());
  return [0,1,2,3].map((i) => deck.slice(i * 13, i * 13 + 13));
}

export function sortHand(hand: CardT[]) {
  hand.sort((a, b) => {
    const suitOrder: Record<Suit, number> = { S: 0, H: 1, D: 2, C: 3 };
    if (a.suit !== b.suit) return suitOrder[a.suit] - suitOrder[b.suit];
    return b.rank - a.rank;
  });
}

export type Trick = {
  leader: number;
  cards: (CardT | null)[];
  ledSuit?: Suit;
};

export function legalCards(hand: CardT[], trick: Trick, spadesBroken: boolean): CardT[] {
  const isLead = trick.cards.every((c) => !c);
  if (isLead) {
    const hasNonSpade = hand.some((c) => c.suit !== "S");
    return hand.filter((c) => spadesBroken || !hasNonSpade || c.suit !== "S" ? true : c.suit !== "S");
  }
  const led = trick.ledSuit!;
  const hasLed = hand.some((c) => c.suit === led);
  return hand.filter((c) => (hasLed ? c.suit === led : true));
}

export function playCardOnTrick(trick: Trick, card: CardT, playerIndex: number, spadesBroken: boolean) {
  const idx = (playerIndex - trick.leader + 4) % 4; // position in the trick
  const cards = [...trick.cards];
  cards[idx] = card;
  const ledSuit = trick.ledSuit ?? card.suit;
  const broken = spadesBroken || card.suit === "S" && ledSuit !== "S";
  return { trick: { leader: trick.leader, cards, ledSuit }, spadesBroken: broken };
}

export function trickIsComplete(trick: Trick) {
  return trick.cards.every((c) => !!c);
}

export function winnerOfTrick(trick: Trick): number {
  const led = trick.ledSuit!;
  let winnerPos = 0;
  let winning = trick.cards[0]!;
  for (let i = 1; i < 4; i++) {
    const c = trick.cards[i]!;
    const isSpade = c.suit === "S";
    const winIsSpade = winning.suit === "S";
    if (isSpade && !winIsSpade) {
      winning = c; winnerPos = i; continue;
    }
    if ((isSpade && winIsSpade && c.rank > winning.rank) ||
        (!isSpade && !winIsSpade && c.suit === led && winning.suit === led && c.rank > winning.rank)) {
      winning = c; winnerPos = i;
    }
  }
  // convert trick position back to player index
  return (trick.leader + winnerPos) % 4;
}

// Very simple AI bid: count high spades and top-suit cards
export function aiBid(hand: CardT[]): number {
  const spades = hand.filter((c) => c.suit === "S");
  let bid = 0;
  bid += spades.filter((c) => c.rank >= 11).length;           // JQKA of spades
  bid += hand.filter((c) => c.rank === 14 && c.suit !== "S").length * 0.6; // off-suit Aces
  bid += hand.filter((c) => c.rank === 13 && c.suit !== "S").length * 0.3; // off-suit Kings
  bid = Math.min(10, Math.max(1, Math.round(bid)));
  return bid;
}

// Simple AI play: follow suit if possible; if cannot, prefer low off-suit; lead highest non-spade unless only spades
export function aiChooseCard(hand: CardT[], legals: CardT[], trick: Trick, spadesBroken: boolean): CardT {
  const isLead = trick.cards.every((c) => !c);
  const choose = (arr: CardT[], high = false) =>
    arr.sort((a, b) => (high ? b.rank - a.rank : a.rank - b.rank))[0];

  if (isLead) {
    const nonSpades = legals.filter((c) => c.suit !== "S");
    if (nonSpades.length) return choose(nonSpades, true);
    return choose(legals, true); // only spades: take highest
  }

  const led = trick.ledSuit!;
  const follow = legals.filter((c) => c.suit === led);
  if (follow.length) return choose(follow, false); // play low to conserve strength

  const spades = legals.filter((c) => c.suit === "S");
  if (spades.length) return choose(spades, false); // trump low if sloughing

  return choose(legals, false);
}