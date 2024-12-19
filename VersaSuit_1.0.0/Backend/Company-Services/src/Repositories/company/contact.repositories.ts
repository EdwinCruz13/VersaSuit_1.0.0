import { PrismaClient } from "@prisma/client";
import { Contact } from "Models/company/contact.models";
import { SocialMedia } from "Models/company/socialmedia.models";

export class ContactRepository {
 //use prismaClient as ORM
  private prisma = new PrismaClient();

 /**
  * add a new contact for the company
  * @param _contact 
  * @returns 
  */
 async Save(_contact: Contact): Promise<any>
 {
   try {

    const lastContact = await this.prisma.companyContact.findFirst({
      orderBy: { ContactID: "desc"}
    })
    const ContactID = (!lastContact) ? 1: lastContact.ContactID + 1;

    //create a new data
     const newBranch = await this.prisma.companyContact.create({
       data: {
         ContactID: ContactID,
         CompanyID: _contact.CompanyID,
         nContact: _contact.nContact,
         PhoneContact: _contact.PhoneContact,
         EmailContact: _contact.EmailContact,
       }
     });

     return { Message: "", data: newBranch } ;
   } catch (error) {
    
     return { Message: error, data: null };
   }
 }

}