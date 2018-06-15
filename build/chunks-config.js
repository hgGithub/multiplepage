/**
 * [BODYCHUNKS 每个入口html文件对应chunk,添加每个入口chunk时，注意顺序]
 * @type {Object}
 * 键：views/html文件名(多页面对应页面入口)。
 * 值：每个页面所需要的chunk数组
 */
const CHUNKS = {
  'views/index': ['global/flexiblefit', 'manifest', 'vendor', 'views/index'],
  'views/prodslist': ['global/flexiblefit', 'manifest', '3rdlibs/jquery','vendor', 'views/prodslist']
};

/**
 * [HEADCHUNKS 需要放在head里解析的js文件]
 * @type {Object}
 */
const HEADCHUNKS = {
  'global/flexiblefit': './src/assets/scripts/global/flexiblefit.js'
};

/**
 * [MANIFESTCHUNKS 由于生成的manifest包含HEADCHUNKS,而HEADCHUNKS
 * 执行在前，所以有错误出现,为避免该错误发生，单独设置MANIFESTCHUNKS
 *所需要包含的chunks,每添加一个CHUNKS，请对应也添加一个到MANIFESTCHUNKS]
 * @type {Array}
 */
const MANIFESTCHUNKS = ['views/index', 'views/prodslist', '3rdlibs/jquery', 'vendor'];

/**
 * [THIRDLIBS 页面中需要引入的第三方库，都以键值对的格式存入到该
 * 对象当中,每个对象代表一个chunk,资源大的库尽量抽离单独处理（100k左右）,
 * 资源小的库没必要抽离，使其进入vendor即可]
 * @type {Object}
 */
const THIRDLIBS = {
  'global/flexiblefit': './src/assets/scripts/global/flexiblefit.js'
  // '3rdlibs/jqsignature':'./src/assets/scripts/3rdlibs/jq-signature.js'
  // '3rdlibs/jquery': 'jquery'
}


var getChunks = function (key) {
  return CHUNKS[key];
}

module.exports = {
  getChunks,
  headChunks: HEADCHUNKS,
  manifestChunks: MANIFESTCHUNKS,
  thirdlibs: THIRDLIBS
};
