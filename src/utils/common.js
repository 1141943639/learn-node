const isEmpty = require("lodash/isEmpty")
const isPlainObject = require("lodash/isPlainObject")
const isArray = require("lodash/isArray")

module.exports = {
  /**
 * 只获取对象中需要的字段数据
 * @param {*} obj 目标对象
 * @param {*} fieldArr 过滤的字段数组
 * @returns 
 */
  filterObjField(obj = {}, fieldArr = []) {
    if(
      [obj, fieldArr].some((val) => isEmpty(val))
    ) return 
    if(!isArray(fieldArr)) return 
    if(!isPlainObject(obj)) return 

    const newObj = {}

    Object.keys(obj).forEach(key => {
      fieldArr.includes(key) && (newObj[key] = obj[key])
    })

    return newObj
  }
}