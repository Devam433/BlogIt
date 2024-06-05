import config from "../config/config";

import { Client, Account, ID, Avatars} from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectId);
        this.account= new Account(this.client);
        this.avatars = new Avatars(this.client);
    }

    async createAccount({Email,Password,Name}){
        try{
            const userAccount = await this.account.create(ID.unique(),Email,Password,Name);
            return userAccount;
        }catch(err){
            // console.log(err.code);//409 means email already exsts
            return err;
        }
    }

    async login({Email,Password}){
        try{
            return await this.account.createEmailPasswordSession(Email,Password)
        }catch(err){
            // console.log(err);
            return err;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get(); //for this to not through error, Session must be created
        } catch (error) {
            console.log(error)
        }
        return null
    }

    // getAvatar(userId) {
    //     const avatar = this.avatars.getInitials(userId);
    //     return avatar.href;
    // }

    generateInitials(name) {
        const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
        return initials;
    }

    getAvatarUrl(initials) {
        const avatarUrl = this.avatars.getInitials(initials).href;
        return avatarUrl;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log(error);
        }
    }
}

const authService = new AuthService;

export default authService