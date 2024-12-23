export class PrismaModelMapper {
    /**
     * convert int a model from a prisma model
     * @param ModelClass the entity into convert.
     * @param data prisma object.
     * @returns return the entity.
     */
    static map<T>(ModelClass: { new (data: Partial<T>): T }, data: any | any[]): T | T[] 
    {
        if (Array.isArray(data)) {
          // Si es una lista, mapear cada elemento.
          return data.map((data) => new ModelClass(data));
        }
        // Si es un único objeto, mapear directamente.
        return new ModelClass(data);
    }

  }