export type Item = {
	itemId: string;
	ownerId: string;
	name: string;
	type: "FOLDER" | "PHOTO";
	parentId?: string;
	extension?: string;
	shareToken?: string;
}

export type Folder = Item & { /* TODO Bad idea */
	type: "FOLDER";
}

export type FolderResponse = {
	folder?: Folder;
	items: Item[];
}

export type FolderCreateRequest = {
	name: string;
	parentId?: string;
}

export type Photo = Item & {
	type: "PHOTO";
}