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
const dayjs = require('dayjs');
const { transform } = require('@openintegrationhub/ferryman');
const spec = require('../spec.json');
const componentJson = require('../../component.json');

const { contactToOihPerson } = require('../transformations/contactToOihPerson');

function processTrigger(msg, cfg, passedSnapshot, incomingMessageHeaders, tokenData) {
  const snapshot = passedSnapshot;
  const isVerbose = process.env.debug || cfg.verbose;
  snapshot.lastUpdated = snapshot.lastUpdated || new Date(0).getTime();

  const { syncParam } = cfg.nodeSettings;
  const trigger = componentJson.triggers[tokenData.function];
  const { pathName, method, requestContentType } = trigger.callParams;
  const body = msg.data;

  const specPath = spec.paths[pathName];
  const specPathParameters = specPath[method].parameters
    ? specPath[method].parameters.map(({ name }) => name)
    : [];

  if (isVerbose) {
    console.log(`---MSG: ${JSON.stringify(msg)}`);
    console.log(`---CFG: ${JSON.stringify(cfg)}`);
    console.log(`---ENV: ${JSON.stringify(process.env)}`);
  }

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

  // Call operation via Swagger client
  return Swagger.execute(callParams).then(async (passedData) => {
    const data = passedData;
    if (!data.ok) return true;

    const { contacts } = data.body;

    const lastUpdated = dayjs(snapshot.lastUpdated);
    let mostRecentChange = dayjs(snapshot.lastUpdated);

    for (let i = 0; i < contacts.length; i += 1) {
      if (cfg.listId) {
        let { listId } = cfg;
        if (listId !== 'number') listId = parseInt(`${listId}`.replace(/[^0-9]+/, ''), 10);
        if (!contacts[i].listIds || contacts[i].listIds.indexOf(listId) === -1) {
          console.log(`Dropping contact ${contacts[i].id} because it is not in list ${listId}`);
          continue; // eslint-disable-line
        }
      }

      const modifiedAt = dayjs(contacts[i].modifiedAt);

      if (lastUpdated.isAfter(modifiedAt)) {
        continue; // eslint-disable-line no-continue
      }

      if (modifiedAt.isAfter(mostRecentChange)) {
        mostRecentChange = dayjs(contacts[i].modifiedAt);
      }

      const newElement = transform(contacts[i], {}, contactToOihPerson);
      this.emit('data', newElement);
    }

    snapshot.lastUpdated = mostRecentChange.toISOString();
    return this.emit('snapshot', snapshot);
  });
}

// this wrapers offers a simplified emitData(data) function
module.exports = { process: processTrigger };
