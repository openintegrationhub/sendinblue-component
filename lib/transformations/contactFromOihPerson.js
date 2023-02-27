/**
 * Copyright 2018 Wice GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

module.exports.contactFromOihPerson = (msg) => {
  if (Object.keys(msg).length === 0 && msg.constructor === Object) {
    return msg;
  }

  // Mapping contact Data to fields, first entry for each type wins
  let phone = '';
  let email = '';
  if (msg.contactData) {
    for (let i = 0; i < msg.contactData.length; i += 1) {
      if (
        (msg.contactData[i].type === 'phone' || msg.contactData[i].type === 'mobile')
        && msg.contactData[i].value.trim() !== ''
      ) {
        if (phone === '') phone = msg.contactData[i].value.trim();
      } else if (msg.contactData[i].type === 'email' && msg.contactData[i].value.trim() !== '') {
        if (email === '') email = msg.contactData[i].value.trim();
      }
    }
  }

  let emailBlacklisted = false;
  let smsBlacklisted = false;

  if (
    msg.categories
     && Array.isArray(msg.categories)
     && msg.categories.length
     && typeof msg.categories[0] === 'string'
  ) {
    let i;
    for (i in msg.categories) { // eslint-disable-line
      const categoryName = msg.categories[i].trim().toLowerCase();
      if (categoryName === 'emailblacklisted') {
        emailBlacklisted = true;
      } else if (categoryName === 'smsblacklisted') {
        smsBlacklisted = true;
      }
    }
  }

  const expression = {
    // metadata: {
    //   oihUid: msg.metadata.oihUid ? msg.metadata.oihUid : false,
    //   recordUid: msg.metadata.recordUid,
    // },
    // data: {
    email,
    emailBlacklisted,
    smsBlacklisted,
    attributes: {
      name: `${msg.firstName} ${msg.lastName}`,
      FIRSTNAME: msg.firstName || '',
      LASTNAME: msg.lastName || '',
      // @todo: there can be several custom user defined attributes, we might need to add a list of existent ones to cfg
    },
    // listIds,
    // listUnsubscribed,
    // },
  };

  // Remove null values
  // Object.keys(expression.data).forEach(
  //   (key) => (expression.data[key] == null || expression.data[key] === undefined)
  // && delete expression.data[key],
  // );

  return expression;
};
