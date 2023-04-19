const fs = require('fs');
const loaderUtils = require('loader-utils');

module.exports = function (source, sourceMap) {
  const callback = this.async();
  const filePath = this.resourcePath;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    const encodedData = JSON.stringify(data);
    const modifiedSource = `${source}\nexport const encodedContent = ${encodedData};`;

    if (sourceMap) {
      const currentRequest = loaderUtils.getCurrentRequest(this);
      sourceMap.sources = [currentRequest];
      sourceMap.file = currentRequest;
      sourceMap.sourcesContent = [modifiedSource];
      callback(null, modifiedSource, sourceMap);
    } else {
      callback(null, modifiedSource);
    }
  });
};
