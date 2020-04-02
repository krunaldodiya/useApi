export class Database {
  store: any;
  entities: any = [];
  schemas: any = {};
  initialized: boolean = false;

  register(model: any) {
    this.checkModelTypeMappingCapabilities(model);

    const entity = {
      name: model.entity,
      base: model.baseEntity || model.entity,
      model: this.createModelBinding(model)
    };

    this.entities.push(entity);
    if (this.initialized) {
      this.registerSchema(entity);
    }
  }

  checkModelTypeMappingCapabilities(model: any) {
    if (!model.entity) {
      throw new Error("Please add an entity to model");
    }
  }

  createModelBinding(model: any) {
    Object.defineProperty(model, "store", {
      value: this.store
    });

    return model;
  }

  createSchema() {
    this.entities.forEach((entity: any) => {
      this.registerSchema(entity);
    });
  }

  registerSchema(entity: any) {
    this.schemas[entity.name] = entity;
  }

  getInstance() {
    return this;
  }
}
