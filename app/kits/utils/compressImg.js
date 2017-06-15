/**
 * 给大图url添加后缀 @!600whlp， 限制图片过大, 但又保留清晰度，普遍用在轮播图和相册中
 * @param  {[string]} imgurl [ajax返回的url]
 * @return {[string]}        [加上后缀的url]
 */
export const urlForBigHDImage = (imgurl) =>
  `${imgurl}@!600whlp`

/**
 * 给大图url添加后缀 @!600whl， 限制图片过大， 普遍用 6rem的情况下
 * @param  {[string]} imgurl [ajax返回的url]
 * @return {[string]}        [加上后缀的url]
 */
export const urlForBigImage = (imgurl) =>
  `${imgurl}@!600whl`

/**
 * 给小图url添加后缀 @!260wh， 限制图片过大， 普遍用 2.6rem的情况下
 * @param  {[string]} imgurl [ajax返回的url]
 * @return {[string]}        [加上后缀的url]
 */
export const urlForMiddleImage = (imgurl) =>
  `${imgurl}@!300wh`


/**
 * 给小图url添加后缀 @!150wh， 限制图片过大， 普遍用 1.5rem的情况下
 * @param  {[string]} imgurl [ajax返回的url]
 * @return {[string]}        [加上后缀的url]
 */
export const urlForSmallImage = (imgurl) =>
  `${imgurl}@!150wh`

