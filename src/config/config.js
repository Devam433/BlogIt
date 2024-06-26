//this makes it clear that the env variables will be string
const config ={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteLikesCollectionId: String(import.meta.env.VITE_APPWRITE_LIKES_COLLECTION_ID),
    appwriteBookmarksCollectionId: String(import.meta.VITE_APPWRITE_BOOKMARKS_COLLECTION_ID),
}

export default config;  