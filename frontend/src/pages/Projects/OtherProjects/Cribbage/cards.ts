type Suit = "S" | "H" | "D" | "C";
type Rank = "A" | "K" | "Q" | "J" | "T" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2";

interface CardInfo {
  code: string;
  suit: Suit;
  suitName: string;
  rank: Rank;
  rankName: string;
  value: number; // Ace high = 14
}

const SUITS: { code: Suit; name: string }[] = [
  { code: "S", name: "Spades" },
  { code: "H", name: "Hearts" },
  { code: "D", name: "Diamonds" },
  { code: "C", name: "Clubs" },
];

const RANKS: { code: Rank; name: string; value: number }[] = [
  { code: "A", name: "Ace", value: 14 },
  { code: "K", name: "King", value: 13 },
  { code: "Q", name: "Queen", value: 12 },
  { code: "J", name: "Jack", value: 11 },
  { code: "T", name: "10", value: 10 },
  { code: "9", name: "9", value: 9 },
  { code: "8", name: "8", value: 8 },
  { code: "7", name: "7", value: 7 },
  { code: "6", name: "6", value: 6 },
  { code: "5", name: "5", value: 5 },
  { code: "4", name: "4", value: 4 },
  { code: "3", name: "3", value: 3 },
  { code: "2", name: "2", value: 2 },
];

export const CARD_DICT: Record<string, CardInfo> = (() => {
  const dict: Record<string, CardInfo> = {};
  for (const s of SUITS) {
    for (const r of RANKS) {
      const code = r.code + s.code; // e.g. "AS"
      dict.code = dict.code; // Type helper (ignored)
      dict[code] = {
        code,
        suit: s.code,
        suitName: s.name,
        rank: r.code,
        rankName: r.name,
        value: r.value,
      };
    }
  }
  return dict;
})();

// Example:
// CARD_DICT["AS"] => { code:"AS", suit:"S", suitName:"Spades", rank:"A", rankName:"Ace", value:14 }