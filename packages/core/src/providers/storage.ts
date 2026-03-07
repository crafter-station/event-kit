export interface StorageProvider {
	name: string;
	upload(buffer: Buffer, filename: string, contentType?: string): Promise<string>;
	delete?(url: string): Promise<void>;
}
