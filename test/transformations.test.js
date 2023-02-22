/* eslint no-unused-expressions: "off" */

const { expect } = require('chai');
const { contactFromOihPerson } = require('../lib/transformations/contactFromOihPerson');
const { contactToOihPerson } = require('../lib/transformations/contactToOihPerson');

const {
  oihPersonMessage,
  contactMessage,
} = require('./seed/seed');

describe('Transformations - personFromOih', () => {
  before(async () => {
  });

  it('should transform OIH person to contact format', async () => {
    const contact = await contactFromOihPerson(oihPersonMessage);

    expect(contact).to.not.be.empty;
    expect(contact).to.be.an('object');
    expect(contact.metadata).to.be.an('object');
    expect(contact.data).to.be.an('object');

    expect(contact.data.attributes).to.be.an('object');

    expect(contact.metadata.recordUid).to.equal('25mop1jxq2ss3x');

    expect(contact.data.email).to.equal('info@smith.com');

    expect(contact.data.emailBlacklisted).to.equal(false);
    expect(contact.data.smsBlacklisted).to.equal(true);

    expect(contact.data.attributes.name).to.equal('Mark Smith');
  });
});

describe('Transformations - personToOih', () => {
  before(async () => {
  });

  it('should transform contact to OIH person format', async () => {
    const person = await contactToOihPerson(contactMessage);

    expect(person).to.not.be.empty;
    expect(person).to.be.an('object');
    expect(person.metadata).to.be.an('object');
    expect(person.metadata.recordUid).to.equal('279');

    expect(person.data).to.be.an('object');

    expect(person.data.firstName).to.equal('Moe');
    expect(person.data.lastName).to.equal('Flanders');

    expect(person.data.contactData).to.be.an('array');
    expect(person.data.contactData[0].type).to.equal('email');
    expect(person.data.contactData[0].value).to.equal('a@b.de');

    expect(person.data.categories).to.be.an('array');
    expect(person.data.categories.length).to.equal(1);
    expect(person.data.categories).to.deep.equal(['emailBlacklisted']);
  });
});
