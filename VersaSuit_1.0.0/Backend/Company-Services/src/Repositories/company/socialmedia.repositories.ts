import { PrismaClient } from "@prisma/client";
import { SocialMedia } from "Models/company/socialmedia.models";

export class SocialMediaRepository {
 //use prismaClient as ORM
  private prisma = new PrismaClient();

 /**
   * add a new urlSocial media
   * in order to manage it
   * @param _Media 
   * @returns 
   */
 async CreateMedia(_Media: SocialMedia): Promise<any>
 {
   try {
    //create a new data
     const newBranch = await this.prisma.companySocialMedia.create({
       data: {
         CompanyID: _Media.CompanyID,
         nMedia: _Media.nMedia,
         UrlMedia: _Media.UrlMedia
       }
     });

     return { Message: "", data: newBranch } ;
   } catch (error) {
    
     return { Message: error, data: null };
   }
 }

}