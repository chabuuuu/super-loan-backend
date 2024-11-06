import { StaticDataController } from '@/controller/static_data.controller';
import { Container } from 'inversify';

class StaticDataContainer {
  private container = new Container();

  constructor() {
    this.container.bind<StaticDataController>(StaticDataController).toSelf();
  }

  export() {
    const staticDataController = this.container.get<StaticDataController>(StaticDataController);
    return { staticDataController };
  }
}

const staticDataContainer = new StaticDataContainer();
const { staticDataController } = staticDataContainer.export();
export { staticDataController };
