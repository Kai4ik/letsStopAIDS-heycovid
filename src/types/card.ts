// key message card
export type CardType = {
  cardId: string;
  title: string;
  name: string;
  location: string;
  text: string;
  fact: string;
  link: string;
};

// array of cards
export type CardsDataType = {
  languageLabel: string;
  languageValue: string;
  bannerText: string;
  cards: CardType[];
}[];
