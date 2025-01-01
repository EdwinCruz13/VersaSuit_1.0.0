import { UnitMeasure } from "../Models/unitmeasure.models";
import { UnitMeasureRepository } from "../Repositories/unitmeasure.repositories";
import { ModelMapper } from "../../../Utils/mapping.utils";

/**
 * class that contain all the functions to get and set the
 * UnitMeasure "UnitMeasure".
 */
export class UnitMeasureService {
  private UnitMeasureRepository: UnitMeasureRepository;

  /**
   * use the inyection pattern
   * @param repository
   */
  constructor(repository: UnitMeasureRepository) {
    this.UnitMeasureRepository = repository;
  }

  /**
   * this method return all the UnitMeasures
   * @returns
   */
  async GetAll(): Promise<UnitMeasure[] | null> {
    //get data from repository
    const dt = await this.UnitMeasureRepository.FetchAll();

    //if there is not data return null
    if (!dt) return null;

    //return the prisma object to UnitMeasure[]
    return ModelMapper.toMap(UnitMeasure, dt) as UnitMeasure[];
  }
  /**
   * get the UnitMeasures by ID
   * Map to CompanyUnitMeasure
   * @param CompanyID
   * @returns
   */
  async GetByID(UnitMeasureID: number): Promise<UnitMeasure | null> {
    //get the data from repository
    const dt = await this.UnitMeasureRepository.FetchByID(UnitMeasureID);
    //if there is not data return null
    if (!dt) return null;

    //return the prisma object to UnitMeasure
    return ModelMapper.toMap(UnitMeasure, dt) as UnitMeasure;
  }

  /**
   * create a new UnitMeasures,
   * @param companyData
   * @returns
   */
  async Create(data: any): Promise<any> {
    return await this.UnitMeasureRepository.Save(data);
  }

  /**
   * a service that update the UnitMeasures
   * @param companyData
   * @returns
   */
  async Update(data: any): Promise<any> {
    return await this.UnitMeasureRepository.Update(data);
  }
}
