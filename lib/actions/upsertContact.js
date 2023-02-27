/**
 * Upsert contact and add new contact to list if id given
 * Started from Auto-generated action file for "SendinBlue API" API.
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

const { contactFromOihPerson } = require('../transformations/contactFromOihPerson');

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

  let body = msg.data;

  if (msg.metadata && msg.metadata.recordUid) {
    // update
  } else {
    // create contact
    // "createContact": {
    //     "main": "./lib/actions/action.js",
    //     "title": "Create a contact",
    //     "callParams": {
    //         "pathName": "/contacts",
    //         "method": "post",
    //         "requestContentType": "application/json"
    //     },
    //     "metadata": {
    //         "in": "./lib/schemas/createContact.in.json",
    //         "out": "./lib/schemas/createContact.out.json"
    //     }
    // },

    // add new contact to list
    // "updateContact": {
    //     "main": "./lib/actions/action.js",
    //     "title": "Update a contact",
    //     "callParams": {
    //         "pathName": "/contacts/{email}",
    //         "method": "put",
    //         "requestContentType": "application/json"
    //     },
    //     "metadata": {
    //         "in": "./lib/schemas/updateContact.in.json",
    //         "out": "./lib/schemas/updateContact.out.json"
    //     }
    // },

    // check if list id is provided cfg.listId ...?
    // "addContactToList": {
    //     "main": "./lib/actions/action.js",
    //     "title": "Add existing contacts to a list",
    //     "callParams": {
    //         "pathName": "/contacts/lists/{listId}/contacts/add",
    //         "method": "post",
    //         "requestContentType": "application/json"
    //     },
    //     "metadata": {
    //         "in": "./lib/schemas/addContactToList.in.json",
    //         "out": "./lib/schemas/addContactToList.out.json"
    //     }
    // },
  }

  console.log('newElement in action:', JSON.stringify(body));

  if (Array.isArray(body) && body.length > 0 && ('firstName' in body[0] || 'lastName' in body[0])) {
    let i;
    for (i in body) { // eslint-disable-line
      body[i] = transform(body[i], cfg, contactFromOihPerson);
    }
    console.log('newElement in action after transform:', JSON.stringify(body));
  } else if (typeof body === 'object' && ('firstName' in body || 'lastName' in body)) {
    body = transform(body, cfg, contactFromOihPerson);
    console.log('newElement in action after transform:', JSON.stringify(body));
  } else {
    mapFieldNames(body);
  }

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

    this.emit('data', newElement);
  });
}

// this wrapers offers a simplified emitData(data) function
module.exports = { process: processAction };
