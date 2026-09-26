/** O desenho do topo do cartão — cada notícia tem o seu. */
export type NewsArt = 'ranger' | 'recall' | 'battery';

export type NewsItem = {
	id: string;
	tag: string;
	title: string;
	summary: string;
	/** O corpo, em parágrafos. */
	body: string[];
	dateLabel: string;
	art: NewsArt;
};
