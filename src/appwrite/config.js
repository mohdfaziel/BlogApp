import toast from "react-hot-toast";
import conf from "../conf/conf";
import {Client, ID,Databases,Storage,Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Returns the created document object from Appwrite.
    async createPost({title,slug,content,featuredImage,status,userId})
    {
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                //taking slug as document ID
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
        }catch(error){
            toast.error("Title already exists");
            console.log("Appwrite service failed: createPost :"+ error);
        }
    }

    // Returns the updated document object from Appwrite.
    async updatePost(slug,{title,content,featuredImage,status})
    {
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                //slug as doc id to find the targeted document/post
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                    //no userid because we are not updating it
                }
            )
        }catch(error){
            console.log("Appwrite service failed: updatePost :"+ error);
        }
    }

    // Returns true after the document is successfully deleted.
    async deletePost(slug)
    {
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }catch(error){
            console.log("Appwrite service failed: deletePost :"+ error);
            return false;
        }
    }
    // Returns the document object if the document with the given slug exists. else false
    async getPost(slug)
    {
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }catch(error){
            console.log("Appwrite service failed: getPost :"+ error);
            return false;
        }
    }

    // Returns an object containing an array of documents matching the query.
    //here status is index thats why we can query on it
    async getPosts(queries = [Query.equal('status','active')])
    {
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        }catch(error){
            console.log("Appwrite service failed: getPosts :"+ error);
            return false;
        }
    }

    //File upload service
    // Returns the uploaded file object.
    async uploadFile(file)
    {
        try{
            //this will return the ID of the uploaded file i.e fileID
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        }catch(error){
            console.log("Appwrite service failed: uploadFile :"+ error);
    }
    }

    //Delete file 
    // Returns true after successfully deleting the file
    async deleteFile(fileId)
    {
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }catch(error){
            console.log("Appwrite service failed: deleteFile :"+ error);
            return false;
        }
    }

    //get preview of the file
    // Returns a URL to preview the file.
    getFilePreview(fileId)
    {
        return this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
    }
}
const service = new Service();
export default service;