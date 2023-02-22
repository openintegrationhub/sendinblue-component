/**
 * Auto-generated trigger file for "SendinBlue API" API.
 * Generated at: 2023-02-13T08:42:07.443Z
 * Mass generator version: 1.0.0
 *
 * : sendinblue-component
 * Copyright © 2020,  AG
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 */

const Swagger = require('swagger-client');
const { transform } = require('@openintegrationhub/ferryman');
const spec = require('../spec.json');
const {
  dataAndSnapshot, mapFieldNames, getMetadata, getElementDataFromResponse,
} = require('../utils/helpers');
const componentJson = require('../../component.json');

const { contactFromOihPerson } = require('../transformations/contactFromOihPerson');

function processTrigger(msg, cfg, passedSnapshot, incomingMessageHeaders, tokenData) {
  const snapshot = passedSnapshot;
  const isVerbose = process.env.debug || cfg.verbose;
  snapshot.lastUpdated = snapshot.lastUpdated || new Date(0).getTime();

  console.log('data function:', tokenData.function);
  console.log('msg:', msg);
  console.log('cfg:', cfg);
  const {
    snapshotKey, arraySplittingKey, syncParam, skipSnapshot,
  } = cfg.nodeSettings;
  const trigger = componentJson.triggers[tokenData.function];
  const { pathName, method, requestContentType } = trigger.callParams;

  const specPath = spec.paths[pathName];
  const specPathParameters = specPath[method].parameters
    ? specPath[method].parameters.map(({ name }) => name)
    : [];

  if (isVerbose) {
    console.log(`---MSG: ${JSON.stringify(msg)}`);
    console.log(`---CFG: ${JSON.stringify(cfg)}`);
    console.log(`---ENV: ${JSON.stringify(process.env)}`);
  }

  const body = msg.data;
  mapFieldNames(body);

  const parameters = {};
  for (const param of specPathParameters) { // eslint-disable-line
    parameters[param] = body[param];
  }
  if (syncParam) {
    parameters[syncParam] = snapshot.lastUpdated;
  }

  const securities = {};
  securities['api-key'] = cfg.key;

  if (cfg.otherServer) {
    if (!spec.servers) {
      spec.servers = [];
    }
    spec.servers.push({ url: cfg.otherServer });
  }

  const callParams = {
    spec,
    operationId: tokenData.function,
    pathName,
    method,
    parameters,
    requestContentType,
    requestBody: body,
    securities: { authorized: securities },
    server: spec.servers[cfg.server] || cfg.otherServer,
  };
  if (callParams.method === 'get') {
    delete callParams.requestBody;
  }

  if (isVerbose) {
    const out = { ...callParams };
    out.spec = '[omitted]';
    console.log(`--SWAGGER CALL: ${JSON.stringify(out)}`);
  }
  const newElement = {};

  // Call operation via Swagger client
  return Swagger.execute(callParams).then(async (passedData) => {
    const data = passedData;
    delete data.uid;
    newElement.metadata = getMetadata(msg.metadata);
    const response = JSON.parse(data.data);

    newElement.data = getElementDataFromResponse(arraySplittingKey, response);

    console.log('newElement in trigger:', JSON.stringify(newElement));

    if (Array.isArray(newElement.data) && newElement.data.length > 0 && ('firstName' in newElement.data[0] || 'lastName' in newElement.data[0])) {
      let i;
      for (i in newElement.data) { // eslint-disable-line
        newElement.data[i] = transform(newElement.data[i], cfg, contactFromOihPerson);
      }
    } else if (typeof newElement.data === 'object' && ('firstName' in newElement.data || 'lastName' in newElement.data)) {
      newElement.data = transform(newElement.data, cfg, contactFromOihPerson);
    }

    console.log('newElement in trigger after transform:', JSON.stringify(newElement));

    if (skipSnapshot) {
      return newElement.data;
    }
    await dataAndSnapshot(newElement, snapshot, snapshotKey, '', this);

    return true;
  });
}

// this wrapers offers a simplified emitData(data) function
module.exports = { process: processTrigger };
