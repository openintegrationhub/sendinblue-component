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
  try {
    if (!msg || (Object.keys(msg).length === 0 && msg.constructor === Object)) {
      return msg;
    }

    const contactData = [
      {
        type: 'email',
        value: msg.email,
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
      FIRSTNAME: 1,
      LASTNAME: 1,
    };

    if (msg.attributes) {
      if (msg.attributes.firstname) {
        // eslint-disable-next-line prefer-destructuring
        firstname = msg.attributes.firstname;
      } else if (msg.attributes.vorname) {
        // eslint-disable-next-line prefer-destructuring
        firstname = msg.attributes.vorname;
      } else if (msg.attributes.FIRSTNAME) {
        firstname = msg.attributes.FIRSTNAME;
      }

      if (msg.attributes.lastname) {
        // eslint-disable-next-line prefer-destructuring
        lastname = msg.attributes.lastname;
      } else if (msg.attributes.name) {
        const nameString = `${msg.attributes.name}`.replace(/[\s]+/gui, ' ');
        const nameParts = nameString.split(' ');
        if (nameParts.length > 1) {
          firstname = nameParts.shift();
          lastname = nameParts.join(' ');
        } else {
          lastname = nameString;
        }
      } else if (msg.attributes.nachname) {
        lastname = msg.attributes.nachname;
      } else if (msg.attributes.LASTNAME) {
        lastname = msg.attributes.LASTNAME;
      }

      if (msg.attributes.salutation) {
        salutation = msg.attributes.salutation;
      } else if (msg.attributes.anrede) {
        salutation = msg.attributes.anrede;
      }

      if (msg.attributes.gender) {
        gender = msg.attributes.gender;
      } else if (msg.attributes.geschlecht) {
        gender = msg.attributes.geschlecht;
      }

      if (msg.attributes.phone) {
        phone = msg.attributes.phone;
      }

      if (msg.attributes.mobile) {
        mobile = msg.attributes.mobile;
      }

      if (msg.attributes.website) {
        website = msg.attributes.website;
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

      for (const key in msg.attributes) { // eslint-disable-line
        if (!(key in knownTypes) && key in msg.global_attributes) {
          contactData.push({
            type: key,
            value: msg.global_attributes[key],
          });
        }
      }
    }

    if (lastname === '' && msg.email) {
      // eslint-disable-next-line prefer-destructuring
      lastname = msg.email.split('@')[0];
      lastname = lastname.trim().replace(/[-_\s]+/uim, ' ');
      lastname = lastname.split(' ');

      if (lastname.length > 1 && firstname === '') firstname = lastname.splice(1);
      // eslint-disable-next-line prefer-destructuring
      lastname = lastname[0];
    }

    const categories = [];

    if (msg.emailBlacklisted) categories.push('emailBlacklisted');
    if (msg.smsBlacklisted) categories.push('smsBlacklisted');

    const expression = {
      metadata: {
        recordUid: msg.id,
      },
      data: {
        firstName: firstname,
        lastName: lastname,
        salutation,
        gender,
        contactData,
        categories,
      },
    };

    // Remove null values
    Object.keys(expression.data).forEach(
      (key) => (expression.data[key] == null || expression.data[key] === undefined)
    && delete expression.data[key],
    );

    return expression;
  } catch (e) {
    console.error('Transformation failed!');
    console.error(e);
    return false;
  }
};
