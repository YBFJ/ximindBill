const { Controller } = require("egg")
class BaseController extends Controller {
  success(code, msg, data) {
    this.ctx.body = {
      code: code,
      message: msg,
      data: data,
    }
  }
  onError(error) {
    const { ctx } = this
    ctx.body = error || "error"
    ctx.status = 500
  }
}
module.exports = BaseController
