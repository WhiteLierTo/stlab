import service from "./base";

class Workbench {
  constructor(ajax) {
    this.ajax = ajax;
  }
}

export default new Workbench(service);
