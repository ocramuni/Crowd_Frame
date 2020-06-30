/*
 * This class provides...
 */
export class Worker {

  mturkId: string;
  properties: Object;

  constructor(
    mturkId: string,
    cloudflareData: string,
    navigator: Navigator
  ) {
    this.mturkId = mturkId
    let unwantedProperties = [
      "registerProtocolHandler",
      "requestMediaKeySystemAccess",
      "sendBeacon",
      "unregisterProtocolHandler",
      "vibrate",
      "getUserMedia",
      "webkitGetUserMedia"
    ]
    let properties = {}
    for (let property of cloudflareData.split(/\n/)) {
      if (property.length > 0 && !unwantedProperties.includes(property)) {
        properties[property.split("=")[0]] = property.split("=")[1]
      }
    }
    for (let property in navigator) {
      if(!unwantedProperties.includes(property)) {
        let str = navigator[property];
        if (str && str.length > 0) {
          properties[property] = str
        }
      }
    }
    this.properties = properties
  }

}
