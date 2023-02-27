const oihPersonMessage = {
  _id: '5d1f429dbbe76eeb57af028e',
  isUser: false,
  firstName: 'Mark',
  lastName: 'Smith',
  photo: 'https://cdn3.iconfinder.com/data/icons/ultimate-social/150/43_yahoo-512.png',
  // uid: '25mop1jxq2ss3x',
  gender: 'male',
  jobTitle: '',
  nickname: '',
  displayName: '',
  middleName: '',
  salutation: 'Mr',
  title: '',
  birthday: '',
  lastUpdate: '1562409837891',
  updateEvent: '7q9m1jxreh6ir',
  meta: {
    role: 'USER',
    user: '5d1f42743805f3001257392e',
    tenant: '5d1f420d3805f3001257392d',
    username: 'mark.smith@yahoo.com',
  },
  addresses: [{
    street: 'Main Str.',
    streetNumber: '123',
    city: 'Hamburg',
  }],
  contactData: [
    {
      type: 'email',
      value: 'info@smith.com',
      description: 'public',
    },
    {
      type: 'phone',
      value: '123456',
      description: 'private',
    },
  ],
  categories: [
    'Customer',
    'Just the best',
    'smsBlacklisted',
  ],
  relations: [],
  __v: 0,
  lastUpdateBy: null,
  lastUpdateById: null,
};

const contactMessage = {
  id: '279',
  email: 'a@b.de',
  emailBlacklisted: true,
  smsBlacklisted: false,
  createdAt: '2017-05-12T12:30:00Z',
  modifiedAt: '2017-05-12T12:30:00Z',
  listIds: [12, 9, 20],
  listUnsubscribed: [1, 2],
  attributes: {
    name: 'Moe Flanders',
    email: 'moe@example.com',
  },
};

module.exports = {
  oihPersonMessage,
  contactMessage,
};
