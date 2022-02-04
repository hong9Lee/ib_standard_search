const { body, param } = require('express-validator');
const { logger } = require('../module/logger');

const checkKeyword = async req => {
  await body('keyword', 'keyword validation error')
    .exists()
    .trim()
    .isString()
    .run(req);
}

const checkExists = async (req, ...paramNms) => {
  for (const paramNm of paramNms) {
    await body(paramNm, `${paramNm} must be required`)
    .exists()
    .trim()
    .run(req);
  }
}

// TODO isDate() validation 포맷 확인 필요
const checkDate = async (req, paramNm) => {
  await body(paramNm, `${paramNm} validation error`)
    .trim()
    .isDate()
    .run(req);
}

const checkArrayType = async (req, ...paramNms) => {
  for (const paramNm of paramNms) {
    await body(paramNm, `${paramNm} must be array type`)
      .optional()
      .isArray()
      .run(req);
  }
}

const checkSorts = async (req, ...validSortValues) => {
  await body('sorts.*', 'sorts validation error. check sorts format')
    .optional()
    .trim()
    .isString()
    .custom(sort => new Promise((resolve, reject) => {
      const [sortValue, sortType] = sort.split('^');
      if (!(sortValue && sortType)) {
        reject('sorts format error. check sorts format');
      } else {
        const isSortValueValid = [...validSortValues, '_score', 'title'].some(key => key === sortValue);
        const isSortTypeValid = ['asc', 'desc'].some(key => key === sortType);
        if (isSortValueValid && isSortTypeValid) {
          resolve();  
        } else {
          reject('sorts format error. check sorts format');
        }
      }
    }))
    .run(req);
}

/**
 * check request param name. If there is an error, add error msg to validationErrors
 * @param {Object} reqParams 
 * @param {Array} validParams 
 * @param {Array} validationErrors
 * @returns {Array}
 */
const checkParamName = (reqParams, validParams, validationErrors) => {
  const errorParams = Object.keys(reqParams).filter(param => !validParams.includes(param));
  if (errorParams.length > 0) {
    return validationErrors.concat(errorParams.map(setValidationError));
  }
  return validationErrors;
}

/**
 * 
 * @param {String} errorParam
 * @return {Object} 
 */
const setValidationError = errorParam => ({
  msg: 'request parameter name error. Please check request parameter name.',
  param: errorParam
});

module.exports = {
  checkKeyword,
  checkExists,
  checkDate,
  checkArrayType,
  checkSorts,
  checkParamName
}