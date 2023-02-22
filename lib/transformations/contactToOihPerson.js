/* eslint "max-len":  ["error", { "code": 170 }] */
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

module.exports.contactToOihPerson = (msg) => {
  if (Object.keys(msg).length === 0 && msg.constructor === Object) {
    return msg;
  }

  const contactData = [
    {
      type: 'email',
      value: msg.data.email,
    },
  ];

  let firstname = '';
  let lastname = '';
  let salutation;
  let gender;
  let phone;
  let website;
  let mobile;

  const knownTypes = {
    email: 1,
    salutation: 1,
    anrede: 1,
    gender: 1,
    geschlecht: 1,
    firstname: 1,
    lastname: 1,
    vorname: 1,
    nachname: 1,
    name: 1,
    phone: 1,
    mobile: 1,
    website: 1,
  };

  if (msg.data.attributes) {
    if (msg.data.attributes.firstname) {
      // eslint-disable-next-line prefer-destructuring
      firstname = msg.data.attributes.firstname;
    } else if (msg.data.attributes.vorname) {
      // eslint-disable-next-line prefer-destructuring
      firstname = msg.data.attributes.vorname;
    }

    if (msg.data.attributes.lastname) {
      // eslint-disable-next-line prefer-destructuring
      lastname = msg.data.attributes.lastname;
    } else if (msg.data.attributes.name) {
      const nameString = `${msg.data.attributes.name}`.replace(/[\s]+/gui, ' ');
      const nameParts = nameString.split(' ');
      if (nameParts.length > 1) {
        firstname = nameParts.shift();
        lastname = nameParts.join(' ');
      } else {
        lastname = nameString;
      }
    } else if (msg.data.attributes.nachname) {
      lastname = msg.data.attributes.nachname;
    }

    if (msg.data.attributes.salutation) {
      salutation = msg.data.attributes.salutation;
    } else if (msg.data.attributes.anrede) {
      salutation = msg.data.attributes.anrede;
    }

    if (msg.data.attributes.gender) {
      gender = msg.data.attributes.gender;
    } else if (msg.data.attributes.geschlecht) {
      gender = msg.data.attributes.geschlecht;
    }

    if (msg.data.attributes.phone) {
      phone = msg.data.attributes.phone;
    }

    if (msg.data.attributes.mobile) {
      mobile = msg.data.attributes.mobile;
    }

    if (msg.data.attributes.website) {
      website = msg.data.attributes.website;
    }

    if (phone) {
      contactData.push({
        type: 'phone',
        value: phone,
      });
    }

    if (mobile) {
      contactData.push({
        type: 'mobil',
        value: mobile,
      });
    }

    if (website) {
      contactData.push({
        type: 'website',
        value: website,
      });
    }

    // There can be serveral other custom attributes, at the moment we just map them all to contactData

    for (const key in msg.data.attributes) { // eslint-disable-line
      if (!(key in knownTypes)) {
        contactData.push({
          type: key,
          value: msg.data.global_attributes[key],
        });
      }
    }
  }

  if (lastname === '') {
    // eslint-disable-next-line prefer-destructuring
    lastname = msg.data.email.split('@')[0];
    lastname = lastname.trim().replace(/[-_\s]+/uim, ' ');
    lastname = lastname.split(' ');

    if (lastname.length > 1 && firstname === '') firstname = lastname.splice(1);
    // eslint-disable-next-line prefer-destructuring
    lastname = lastname[0];
  }

  const categories = [];

  if (msg.data.emailBlacklisted) categories.push('emailBlacklisted');
  if (msg.data.smsBlacklisted) categories.push('smsBlacklisted');

  const expression = {
    // metadata: {
    //   recordUid: msg.data.id,
    // },
    // data: {
    firstName: firstname,
    lastName: lastname,
    salutation,
    gender,
    contactData,
    categories,
    // },
  };

  // Remove null values
  // Object.keys(expression.data).forEach(
  //   (key) => (expression.data[key] == null || expression.data[key] === undefined)
  // && delete expression.data[key],
  // );

  return expression;
};
