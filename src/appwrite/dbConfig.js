
import config from "../config/config";
import {Client, Databases, ID, Query, Storage} from "appwrite";

export class DBService{
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredimage,status,userid,writer,readtime}){
        console.log(title, slug, content, featuredimage,status,userid,writer,readtime );

        try {
            return await this.databases.createDocument(config.appwriteDatabaseId,   
            config.appwriteCollectionId, slug, { //slug is the documentId
                title,  
                content,
                userid,   //userid
                featuredimage,
                status,
                writer,
                readtime
            });
        } catch (error) {
            console.log(error)
        }
    }

    async updatePost(slug,{title,content,featuredimage,status,author}){
        try {
            return this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, //slug is the document id
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    author,
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(error);
        }
    }

    async getPost(slug){  //slug id the post id
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(error);
        }
    }

    async getPosts(){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [   
                    Query.equal("status","") //Only the posts with status 'active' will be listed
                ]
            )
        } catch (error) {
            console.log(error);
        }
    }

    //File Service
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;   //to handle ui accordingly
        } catch (error) {
            console.log(error)
            return false; //to handle ui accordingly
        }
    }

    async getFile(fileId){
        try {
            return await this.storage.getFile(config.appwriteBucketId, fileId);
        } catch (error) {
            console.log('Appwrite::Error in GetFile ',error)
        }
    }

    getFilePreview(fileId){
        const file = this.storage.getFilePreview(config.appwriteBucketId, fileId);
        // return file.href.concat('&mode=admin');
        return file;

    }

    //likes
    async createLike({articleid,userid}) {
        try {
            const like = await this.databases.createDocument(config.appwriteDatabaseId,
                config.appwriteLikesCollectionId,ID.unique(),{ 
                userid,
                articleid //blog id
            })

            const post = await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                articleid
            )

            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                articleid, // the document id
                {
                    likes: post.likes+1
                }
            )
            

        } catch (error) {
            console.log('appwrite :: createLike()', error)
        }
    }

    async deleteLike({documentId,articleid}) { //here documentId is the id of the document and articleid is the attribute
        try {
                await this.databases.deleteDocument(
                    config.appwriteDatabaseId,
                    config.appwriteLikesCollectionId,
                    documentId
                )
                const post = await this.databases.getDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    articleid // it is the attribute of likes and it's value is the id of the actual article
                )
                await this.databases.updateDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    articleid, 
                    {
                        likes: post.likes-1
                    }
                )
            } catch (error) {
                console.log(error);
            }
        
    }

    async getLikes(id=null,userid=null) { //gets the likes collection
        try {

            const query = [];
            if(userid) {
                query.push(Query.equal("userid",userid))
            }
            else if(id){
                query.push(Query.equal("articleid",id))
            }
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteLikesCollectionId,
                query
            ) 
        } catch (error) {
            
        }
    }
}

const dbService = new DBService;
export default dbService;


