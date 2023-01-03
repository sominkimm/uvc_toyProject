export const defaultXMLData = {
  '@': {
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xmlns:uax': 'http://opcfoundation.org/UA/2008/02/Types.xsd',
    xmlns: 'http://opcfoundation.org/UA/2011/03/UANodeSet.xsd',
    'xmlns:s1': 'http://uvc.co.kr/ModbusType/Types.xsd',
    'xmlns:ua': 'http://unifiedautomation.com/Configuration/NodeSet.xsd',
    'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
  },
  NamespaceUris: {
    Uri: 'http://uvc.co.kr/FlexingCPS/'
  },
  Aliases: {
    Alias: [
      {
        '@': {
          Alias: 'Double'
        },
        '#': 'i=11'
      },
      {
        '@': {
          Alias: 'Organizes'
        },
        '#': 'i=35'
      },
      {
        '@': {
          Alias: 'HasTypeDefinition'
        },
        '#': 'i=40'
      },
      {
        '@': {
          Alias: 'HasComponent'
        },
        '#': 'i=47'
      }
    ]
  }
}
