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
const { mapFieldNames, getMetadata } = require('../utils/helpers');
const componentJson = require('../../component.json');

const { contactToOihPerson } = require('../transformations/contactToOihPerson');

function processAction(msg, cfg, snapshot, incomingMessageHeaders, tokenData) {
  const isVerbose = process.env.debug || cfg.verbose;

  console.log('data function:', tokenData.function);
  console.log('msg:', msg);
  console.log('cfg:', cfg);

  if (isVerbose) {
    console.log(`---MSG: ${JSON.stringify(msg)}`);
    console.log(`---CFG: ${JSON.stringify(cfg)}`);
    console.log(`---ENV: ${JSON.stringify(process.env)}`);
  }
  const action = componentJson.actions[tokenData.function];
  const { pathName, method, requestContentType } = action.callParams;

  const specPath = spec.paths[pathName];
  const specPathParameters = specPath[method].parameters
    ? specPath[method].parameters.map(({ name }) => name)
    : [];

  const body = msg.data;
  mapFieldNames(body);

  const parameters = {};
  for (const param of specPathParameters) { // eslint-disable-line
    parameters[param] = body[param];
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
  return Swagger.execute(callParams).then((passedData) => {
    // emit a single message with data
    const data = passedData;
    delete data.uid;
    newElement.metadata = getMetadata(msg.metadata);
    newElement.data = data.data;

    console.log('newElement in action:', JSON.stringify(newElement));

    // Transform contacts to oih contact data format
    if (newElement.data && 'contacts' in newElement.data) {
      let i;
      for (i in newElement.data.contacts) { // eslint-disable-line
        newElement.data.contacts[i] = transform(newElement.data.contacts[i], cfg, contactToOihPerson);
      }
    }

    console.log('newElement in action after transform:', JSON.stringify(newElement));

    this.emit('data', newElement);
  });
}

// this wrapers offers a simplified emitData(data) function
module.exports = { process: processAction };
