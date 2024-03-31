export const deviceTypes = {
  pump: 2,
  tank: 3,
  phtdsmeter: 4,
  flowmeter: 1,
}
export const clientInitialState = {
  clientInfo: {
    name: '',
    address: '',
    city: '',
    description: '',
    country: { id: null, name: '' },
    state: { id: null, name: '' },
  },
  contactPersonInfo: [
    {
      fname: '',
      lname: '',
      mname: '',
      contactNo: '',
      description: '',
      emailId: '',
    },
  ],
  // locations: [
  //   {
  //     name: '',
  //     latitude: 23.022505,
  //     longitude: 72.571362,
  //     map: 'Link to map or map details',
  //   },
  // ],
}

export const locationInitialState = {
  client: { encryptedId: null, name: '' },
  locationInfo: {
    name: '',
    latitude: '',
    longitude: '',
    map: '',
  },
  contactPersonInfo: [
    {
      fname: '',
      lname: '',
      mname: '',
      contactNo: '',
      description: '',
      emailId: '',
    },
  ],
}

export const isCurrentData = [
  {
    deviceNo: 'DIV0000000001',
    name: 'Device A',
    level: {
      currentLevel: '80',
      maxCapacity: '10 liters',
    },
    time: '26 December 2024 10:00:00',
    deviceBattery: {
      NCB: { for: 'NCB', value: 80, unit: 'Volt' },
      CB: { for: 'CB', value: 20, unit: 'Volt' },
    },
    signal: 'High',
  },
  {
    deviceNo: 'DIV0000000002',
    name: 'Device B',
    level: {
      currentLevel: '60',
      maxCapacity: '20 liters',
    },
    time: '26 December 2024 11:30:00',
    deviceBattery: {
      NCB: { for: 'NCB', value: 60, unit: 'Volt' },
      CB: { for: 'CB', value: 40, unit: 'Volt' },
    },
    signal: 'Moderate',
  },
  {
    deviceNo: 'DIV0000000003',
    name: 'Device C',
    level: {
      currentLevel: '50',
      maxCapacity: '30 liters',
    },
    time: '26 December 2024 13:45:00',
    deviceBattery: {
      NCB: { for: 'NCB', value: 60, unit: 'Volt' },
      CB: { for: 'CB', value: 40, unit: 'Volt' },
    },
    signal: 'Low',
  },
  {
    deviceNo: 'DIV0000000004',
    name: 'Device D',
    level: {
      currentLevel: '90',
      maxCapacity: '40 liters',
    },
    time: '26 December 2024 15:20:00',
    deviceBattery: {
      NCB: { for: 'NCB', value: 60, unit: 'Volt' },
      CB: { for: 'CB', value: 40, unit: 'Volt' },
    },
    signal: 'High',
  },
  {
    deviceNo: 'DIV0000000005',
    name: 'Device E',
    level: {
      currentLevel: '70',
      maxCapacity: '50 liters',
    },
    time: '26 December 2024 16:55:00',
    deviceBattery: {
      NCB: { for: 'NCB', value: 60, unit: 'Volt' },
      CB: { for: 'CB', value: 40, unit: 'Volt' },
    },
    signal: 'Moderate',
  },
  {
    deviceNo: 'DIV0000000006',
    name: 'Device F',
    level: {
      currentLevel: '40',
      maxCapacity: '60 liters',
    },
    time: '26 December 2024 18:10:00',
    deviceBattery: {
      NCB: { for: 'NCB', value: 40, unit: 'Volt' },
      CB: { for: 'CB', value: 60, unit: 'Volt' },
    },
    signal: 'Low',
  },
  {
    deviceNo: 'DIV0000000007',
    name: 'Device G',
    level: {
      currentLevel: '85',
      maxCapacity: '70 liters',
    },
    time: '26 December 2024 19:30:00',
    deviceBattery: {
      NCB: { for: 'NCB', value: 85, unit: 'Volt' },
      CB: { for: 'CB', value: 15, unit: 'Volt' },
    },
    signal: 'High',
  },
  {
    deviceNo: 'DIV0000000008',
    name: 'Device H',
    level: {
      currentLevel: '65',
      maxCapacity: '80 liters',
    },
    time: '26 December 2024 20:45:00',
    deviceBattery: {
      NCB: { for: 'NCB', value: 65, unit: 'Volt' },
      CB: { for: 'CB', value: 35, unit: 'Volt' },
    },
    signal: 'Moderate',
  },
  {
    deviceNo: 'DIV0000000009',
    name: 'Device I',
    level: {
      currentLevel: '15',
      maxCapacity: '90 liters',
    },
    time: '26 December 2024 21:55:00',
    deviceBattery: {
      NCB: { for: 'NCB', value: 45, unit: 'Volt' },
      CB: { for: 'CB', value: 55, unit: 'Volt' },
    },
    signal: 'Low',
  },
  {
    deviceNo: 'DIV0000000010',
    name: 'Device J',
    level: {
      currentLevel: '95',
      maxCapacity: '100 liters',
    },
    time: '26 December 2024 22:45:00',
    deviceBattery: {
      NCB: { for: 'NCB', value: 95, unit: 'Volt' },
      CB: { for: 'CB', value: 100, unit: 'Volt' },
    },
    signal: 'High',
  },
]

export const TankInitialState = {
  id: null,
  location: null,
  hwUniqueNo: '',
  tankType: '',
  tankName: '',
  tankCapacity: '',
  ltMinRange: '',
  ltMaxRange: '',
  ltMinCount: '',
  ltMaxCount: '',
  description: '',
  createdDate: '',
  updatedDate: '',
  createdBy: '',
  updatedBy: '',
  isActive: null,
  isDeleted: null,
}
export const tankTableColumnState = [
  { field: 'srNo', header: 'SR No.', sortable: true, style: { minWidth: '6rem' }, frozen: true },
  {
    field: 'locationdto.name',
    header: 'Location',
    sortable: true,
    style: { minWidth: '12rem' },
    frozen: true,
  },
  {
    field: 'swDeviceId',
    header: 'S/W Device ID',
    sortable: true,
    style: { minWidth: '12rem' },
    frozen: true,
  },
  {
    field: 'hwUniqueNo',
    header: 'H/W No',
    sortable: true,
    style: { minWidth: '12rem' },
    frozen: true,
  },
  { field: 'tankName', header: 'Name', sortable: true, style: { minWidth: '12rem' } },
  { field: 'tankCapacity', header: 'Capacity', sortable: true, style: { minWidth: '12rem' } },
  { field: 'tankType', header: 'Tank Type', sortable: true, style: { minWidth: '12rem' } },
  { field: 'ltMinRange', header: 'LT Min Range', sortable: true, style: { minWidth: '12rem' } },
  { field: 'ltMaxRange', header: 'LT Max Range', sortable: true, style: { minWidth: '12rem' } },
  { field: 'ltMinCount', header: 'LT Min Count', sortable: true, style: { minWidth: '12rem' } },
  { field: 'ltMaxCount', header: 'LT Max Count', sortable: true, style: { minWidth: '12rem' } },
  { field: 'description', header: 'Description', sortable: true, style: { minWidth: '12rem' } },
]

export const PumpInitialState = {
  location: '',
  hwUniqueNo: '',
  pumpName: '',
  emMinRange: '',
  emMaxRange: '',
  emMinCount: '',
  emMaxCount: '',
  description: '',
  createdDate: '',
  updatedDate: '',
  createdBy: '',
  updatedBy: '',
  isActive: '',
  isDeleted: '',
}

export const FlowmeterInitialState = {
  id: null,
  location: null,
  hwUniqueNo: null,
  deviceName: 'flowmeter',
  minRange: '',
  maxRange: '',
  minCount: '',
  maxCount: '',
  swDeviceId: '',
  description: '',
  createdDate: '',
  updatedDate: '',
  createdBy: '',
  updatedBy: '',
  isActive: '',
  isDeleted: '',
}

export const PHTDSMeterInitialState = {
  location: '',
  hwUniqueNo: '',
  meterName: '',
  phMinRange: '',
  phMaxRange: '',
  phMinCount: '',
  phMaxCount: '',
  tdsMinRange: '',
  tdsMaxRange: '',
  tdsMinCount: '',
  tdsMaxCount: '',
  description: '',
  createdDate: '',
  updatedDate: '',
  createdBy: '',
  updatedBy: '',
  isActive: '',
  isDeleted: '',
}

export const deviceData = {
  tanks: [
    {
      id: 'tank1',
      name: 'Tank 1',
      status: 'online',
      capacity: 10000,
      currentLevel: 7500,
      temperature: 25,
      pHLevel: 7.5,
      TDSLevel: 500,
      alerts: [
        {
          id: 'alert1',
          type: 'warning',
          message: 'Low level warning',
          timestamp: '2024-02-22T10:30:00',
        },
        // Add more alerts if needed
      ],
    },
    // Add more tanks if needed
  ],
  pumps: [
    {
      id: 'pump1',
      name: 'Pump 1',
      status: 'offline',
      flowRate: 0, // Flow rate in liters per minute
      alerts: [],
    },
    // Add more pumps if needed
  ],
  flowmeters: [
    {
      id: 'flowmeter1',
      name: 'Flowmeter 1',
      status: 'online',
      flowRate: 50, // Current flow rate in liters per minute
      totalVolume: 10000, // Total volume measured in liters
      alerts: [],
    },
    // Add more flowmeters if needed
  ],
  pHMeters: [
    {
      id: 'phmeter1',
      name: 'pH Meter 1',
      status: 'online',
      pHLevel: 7.0, // Current pH level
      alerts: [],
    },
    // Add more pH meters if needed
  ],
  TDSMeters: [
    {
      id: 'tdsmeter1',
      name: 'TDS Meter 1',
      status: 'offline',
      TDSLevel: 450, // Current TDS level
      alerts: [],
    },
    // Add more TDS meters if needed
  ],
}
