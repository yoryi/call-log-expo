import CallregisterModule from './src/CallregisterModule';

export function makeCall(numberPhone: Number) {
  return CallregisterModule.makeCall(numberPhone)
}

export function getLocalize() {
  return CallregisterModule.getLocalize()
}