"use strict"
const path = require("path")
const fse = require("fs-extra")
const Papa = require("papaparse")
const BaseController = require("../core/base_controller")

class BillController extends BaseController {
  /**
   * 新增账单
   * @param {*} ctx
   */
  async addBill(ctx) {
    const params = ctx.request.body
    // const rule  =
  }
  async getBillList(ctx) {
    const { config } = this

    try {
      const bills = fse.readFileSync(
        path.resolve(__dirname, "../../statistics/bill.csv")
      )
      const billContents = Papa.parse(bills.toString())
      const billList = []
      for (let i = 1; i < billContents.data.length; i++) {
        let tempObj = {}
        for (let j = 0; j < billContents.data[0].length; j++) {
          // let key = billContents.data[0][j]
          // tempObj = Object.assign(tempObj, { key: billContents.data[i][j] })
          tempObj[billContents.data[0][j]] = billContents.data[i][j]

          // Object.defineProperty(
          //   tempObj,
          //   billContents.data[0][j] + "",
          //   billContents.data[i][j]
          // )
          // billList.push({
          //   billContents.data[0][0]: billContents.data[i][0]
          // })
        }
        billList.push(tempObj)
      }

      const categories = fse.readFileSync(
        path.resolve(__dirname, "../../statistics/categories.csv")
      )

      const billCategories = Papa.parse(categories.toString())

      const cateArr = []
      for (let i = 1; i < billCategories.data.length; i++) {
        cateArr.push({
          value: billCategories.data[i][0],
          label: billCategories.data[i][2],
        })
      }
      // this.success(1, "success", cateArr)
      this.success(1, "success", { billList, cateArr })
    } catch (error) {
      this.onError(error)
    }
  }

  async getBillCateList(ctx) {
    // const billCategoryPath = path.resolve(
    //   __dirname,
    //   "../../statistics/categories.csv"
    // )
    try {
      const categories = fse.readFileSync(
        path.resolve(__dirname, "../../statistics/categories.csv")
      )

      const billCategories = Papa.parse(categories.toString())

      const cateArr = []
      for (let i = 1; i < billCategories.data.length; i++) {
        cateArr.push({
          value: billCategories.data[i][0],
          label: billCategories.data[i][2],
        })
      }
      this.success(1, "success", cateArr)
    } catch (error) {
      this.onError(error)
    }
  }
}

module.exports = BillController
