import { ContactRepository } from "../../Repositories/company/contact.repositories";
import { Contact } from "../../Models/company/contact.models";

/**
 * class that contain all the functions to get and set the
 * model social media. using prisma ORM in order to get the information
 * from database
 */
export class ContactService {
    private ContactRepository = new ContactRepository();

    /**
     * create a new item for social media company
     * @param mediaData 
     * @returns 
     */
    async Create(contactdata: Contact): Promise<any> {
        return await this.ContactRepository.CreateContact(contactdata);
    }
}