import config from "../config/config";

import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectId);
        this.account= new Account(this.client);
    }

    async createAccount({Email,Password,Name}){
        try{
            console.log(Email)
            console.log(Password)

            console.log(Name)

        const userAccount = await this.account.create(ID.unique(),Email,Password);
        if(userAccount){
            //if userAccount exists then directly proceed to logging in
            this.login({Email,Password});
        }
        else{
            return userAccount;
        }
        }catch(err){
            console.log(err);
        }
    }

    async login({Email,Password}){
        try{
            return await this.account.createEmailPasswordSession(Email,Password)
        }catch(err){
            console.log(err);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error)
        }
        return null
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