import service from "./base";

class Login {
  constructor(ajax) {
    this.ajax = ajax;
  }
  async loginSync(username, password) {
    let data = new URLSearchParams();
    data.append("userName", username);
    data.append("password", password);
    try {
      let res = await this.ajax.post("/login", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return [res.code === 200, res.token || res.msg];
    } catch (e) {
      return [false, "服务器错误"];
    }
  }
}

export default new Login(service);
