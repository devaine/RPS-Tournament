// Where all environmental variables lie for import.meta.env
interface ImportMetaEnv {
	readonly DEV_URL: string;
	readonly PROD_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

