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
const { mapFieldNames } = require('../utils/helpers');
const componentJson = require('../../component.json');

const { contactFromOihPerson } = require('../transformations/contactFromOihPerson');

async function processAction(msg, cfg, snapshot, incomingMessageHeaders, tokenData) {
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
  const { requestContentType } = action.callParams;
  let { pathName, method } = action.callParams;

  const specPath = spec.paths[pathName];
  const specPathParameters = specPath[method].parameters
    ? specPath[method].parameters.map(({ name }) => name)
    : [];

  let body = msg.data;

  let operationId = 'createContact';

  if (msg.metadata && msg.metadata.recordUid) {
    // update

    pathName = '/contacts/{email}';
    method = 'put';
    operationId = 'updateContact';
  } else {
    // add new contact to list

    pathName = '/contacts';
    method = 'post';
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

  // pathName = pathName.replace('{email}', msg.metadata.recordUid);

  const parameters = {};
  for (const param of specPathParameters) { // eslint-disable-line
    parameters[param] = body[param];
  }

  if (msg.metadata && msg.metadata.recordUid) {
    parameters.email = msg.metadata.recordUid;
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
    // operationId: tokenData.function,
    operationId,
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
  const passedData = await Swagger.execute(callParams);

  if (cfg.listId) {
    try {
      let { listId } = cfg;
      if (listId !== 'number') listId = parseInt(`${listId}`.replace(/[^0-9]+/, ''), 10);
      pathName = '/contacts/lists/{listId}/contacts/add';
      method = 'post';

      parameters.listId = listId;

      const requestBody = {
        listId,
        requestBody: {
          emails: [
            body.email,
          ],
        },
      };

      const listCallParams = {
        spec,
        operationId: 'addContactToList', // tokenData.function,
        pathName,
        method,
        parameters,
        requestContentType,
        requestBody,
        securities: { authorized: securities },
        server: spec.servers[cfg.server] || cfg.otherServer,
      };

      await Swagger.execute(listCallParams);
    } catch (e) {
      console.error('List add failed');
      console.error(e);
    }
  }

  // emit a single message with data
  const data = passedData;

  if (data.ok && data.body.id) {
    const newElement = {
      metadata: {
        oihUid: msg.metadata.oihUid,
        recordUid: data.body.id,
      },
    };
    this.emit('data', newElement);
  }
}

// this wrapers offers a simplified emitData(data) function
module.exports = { process: processAction };
