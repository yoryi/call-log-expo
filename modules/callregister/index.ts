import CallregisterModule from './src/CallregisterModule';

export function makeCall(numberPhone: Number) {
  return CallregisterModule.makeCall(numberPhone)
}

export function getCallStartTime() {
  return CallregisterModule.getCallStartTime()
}

export function getCallEndTime() {
  return CallregisterModule.getCallEndTime()
}

// export function setup() {
//   return CallregisterModule.setup()
// }
