const dayjs = require('dayjs');

function isSecondDateAfter(a, b) {
  return dayjs(a).isAfter(b);
}

function mapFieldNames(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(mapFieldNames);
  } else if (typeof obj === 'object' && obj) {
    obj = Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null)); // eslint-disable-line
    return obj;
  }
  return obj;
}
function getMetadata(metadata) {
  const metadataKeys = ['oihUid', 'recordUid', 'applicationUid'];
  const newMetadata = {};
  for (let i = 0; i < metadataKeys.length; i += 1) {
    newMetadata[metadataKeys[i]] = metadata !== undefined && metadata[metadataKeys[i]] !== undefined
      ? metadata[metadataKeys[i]]
      : `${metadataKeys[i]} not set yet`;
  }
  return newMetadata;
}

async function dataAndSnapshot(newElement, passedSnapshot, snapshotKey, standardSnapshot, self) {
  const snapshot = passedSnapshot;
  if (Array.isArray(newElement.data)) {
    let lastElement = 0;
    for (let i = 0; i < newElement.data.length; i += 1) {
      const newObject = { ...newElement, data: newElement.data[i] }; // eslint-disable-
      const currentObjectDate = newObject.data[snapshotKey]
        ? newObject.data[snapshotKey]
        : newObject.data[standardSnapshot];
      if (snapshot.lastUpdated === 0) {
        if (isSecondDateAfter(currentObjectDate, lastElement)) {
          lastElement = currentObjectDate;
        }
        await self.emit('data', newObject); // eslint-disable-line no-await-in-loop
      } else if (isSecondDateAfter(currentObjectDate, snapshot.lastUpdated)) {
        if (isSecondDateAfter(currentObjectDate, lastElement)) {
          lastElement = currentObjectDate;
        }
        await self.emit('data', newObject); // eslint-disable-line no-await-in-loop
      }
    }
    snapshot.lastUpdated = lastElement !== 0 ? lastElement : snapshot.lastUpdated;
    console.log('returned a new snapshot', snapshot);
    await self.emit('snapshot', snapshot);
  } else {
    await self.emit('data', newElement);
  }
}
function getElementDataFromResponse(splittingKey, res) {
  if (!splittingKey) {
    return res;
  }
  return splittingKey.split('.').reduce((p, c) => (p && p[c]) || null, res);
}
module.exports = {
  isSecondDateAfter,
  mapFieldNames,
  getMetadata,
  dataAndSnapshot,
  getElementDataFromResponse,
};
