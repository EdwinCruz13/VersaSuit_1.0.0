"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const company_repositories_1 = require("../Repositories/company.repositories");
const company_models_1 = require("../Models/company/company.models");
/**
 * class that contain all the functions to get and set the
 * model company. using prisma ORM in order to get the information
 * from database
 */
class CompanyService {
    constructor() {
        this.CompanyRepository = new company_repositories_1.CompanyRepository();
    }
    /**
     * this method return all the companies
     * @returns
     */
    async GetAllCompanies() {
        let companies;
        //get the result from repository
        const result = await this.CompanyRepository.FindAll();
        console.log(result);
        if (result)
            companies = result.map((item) => new company_models_1.Company(item));
        else
            companies = null;
        return companies;
    }
    async GetByID(CompanyID) {
        //get the data from repository
        return this.CompanyRepository.FindByID(CompanyID);
    }
    /**
     * create a new company,
     * @param companyData
     * @returns
     */
    async CreateCompany(companyData) {
        return await this.CompanyRepository.CreateCompany(companyData);
    }
    /**
     * a service that update the company
     * @param companyData
     * @returns
     */
    async UpdateCompany(companyData) {
        return await this.CompanyRepository.UpdateCompany(companyData);
    }
}
exports.CompanyService = CompanyService;
