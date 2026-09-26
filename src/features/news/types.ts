export type NewsArt = 'ranger' | 'recall' | 'battery';

export type NewsItem = {
	id: string;
	tag: string;
	title: string;
	summary: string;
	body: string[];
	dateLabel: string;
	art: NewsArt;
};
