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

export type CardsDataType = {
  languageLabel: string;
  languageValue: string;
  bannerText: string;
  cards: CardType[];
}[];
