import { Color } from "../Models/color.models";
import { ColorRepository } from "../Repositories/color.repository";
import { ModelMapper } from "../../../Utils/mapping.utils";

/**
 * class that contain all the functions to get and set the
 * Color "Color".
 */
export class ColorService {
  private ColorRepository: ColorRepository;

  /**
   * use the inyection pattern
   * @param repository
   */
  constructor(repository: ColorRepository) {
    this.ColorRepository = repository;
  }

  /**
   * this method return all the Colors
   * @returns
   */
  async GetAll(): Promise<Color[] | null> {
    //get data from repository
    const dt = await this.ColorRepository.FetchAll();

    //if there is not data return null
    if (!dt) return null;

    //return the prisma object to Color[]
    return ModelMapper.toMap(Color, dt) as Color[];
  }
  /**
   * get the Colors by ID
   * Map to CompanyColor
   * @param CompanyID
   * @returns
   */
  async GetByID(ColorID: number): Promise<Color | null> {
    //get the data from repository
    const dt = await this.ColorRepository.FetchByID(ColorID);
    //if there is not data return null
    if (!dt) return null;

    //return the prisma object to Color
    return ModelMapper.toMap(Color, dt) as Color;
  }

  /**
   * create a new Colors,
   * @param companyData
   * @returns
   */
  async Create(data: any): Promise<any> {
    return await this.ColorRepository.Save(data);
  }

  /**
   * a service that update the Colors
   * @param companyData
   * @returns
   */
  async Update(data: any): Promise<any> {
    return await this.ColorRepository.Update(data);
  }
}
