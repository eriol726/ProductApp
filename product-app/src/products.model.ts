export interface Products {
	totalResults: number;

	result: Result[];
}

export interface Result {
    id: number;

	name: string;

	featureHighlight: string;

	images: {
		'240w': string,
		'480w': string,
		'640w': string,
	};
}