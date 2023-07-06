export interface Products {
	totalResults: number;

	result: Result[];
}

export interface Result {
	id: string;
	name: string;
	featureHighlight: string;
	images: {
		'240w': string;
		'480w': string;
		'640w': string;
	};
	demoProductId: string;

	description: string;

	ecoSystems: [];

	fullProductId: string;

	hasDemo: boolean;

	includedPlugins: string[];

	isHardwareProduct: boolean;

	isInStock: boolean;

	legacyPdfStorageUrl: string;

	notSoldOnWebsite: boolean;
	price: {
		campaign: string;
		normal: string;
		campaignDecimal: number;
		normalDecimal: number;
	};

	productionRoles: [];
	url: string;
}

export interface LocationState {
	pageNumber: number;
	searchField: string;
	productItem: Result;
	currentProducts: Result[];
	products: Products;
}
