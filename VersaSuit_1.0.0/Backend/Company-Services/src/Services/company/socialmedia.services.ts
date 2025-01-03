import { SocialRepository } from "../../Repositories/company/socialmedia.repositories";


/**
 * class that contain all the functions to get and set the
 * model social media. using prisma ORM in order to get the information
 * from database
 */
export class SocialMediaService {
    private Contact = new SocialRepository();

    /**
     * create a new item for social media company
     * @param mediaData 
     * @returns 
     */
    async Create(mediaData: any): Promise<any> {
        return await this.Contact.Save(mediaData);
    }
}