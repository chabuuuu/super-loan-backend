import { MenuController } from '@/controller/menu.controller';
import { MenuService } from '@/service/menu.service';
import { IMenuService } from '@/service/interface/i.menu.service';
import { Container } from 'inversify';

class MenuContainer {
  private container = new Container();

  constructor() {
    this.container.bind<IMenuService>('MenuService').to(MenuService);
    this.container.bind<MenuController>(MenuController).toSelf();
  }

  export() {
    const menuController = this.container.get<MenuController>(MenuController);
    const menuService = this.container.get<IMenuService>('MenuService');
    return { menuController, menuService };
  }
}

const menuContainer = new MenuContainer();
const { menuController, menuService } = menuContainer.export();
export { menuController, menuService };
