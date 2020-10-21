import service from "./index";

class Workbench {
  constructor(ajax) {
    this.ajax = ajax;
  }
}

export default new Workbench(service);
