import { Utils } from 'cable_ready'

const { before, operate, after, processElements } = Utils

export default {
  invokeMethod: operation => {
    processElements(operation, element => {
      before(element, operation)
      operate(operation, () => {
        let firstObjectInChain
        const { element, receiver, method, args } = operation
        const chain = method.split('.')

        switch (receiver) {
          case 'window':
            firstObjectInChain = window
            break
          case 'document':
            firstObjectInChain = document
            break
          default:
            firstObjectInChain = element
        }
        let lastObjectInChain = firstObjectInChain
        const foundMethod = chain.reduce((lastTerm, nextTerm) => {
          lastObjectInChain = lastTerm
          return lastTerm[nextTerm] || {}
        }, firstObjectInChain)

        if (foundMethod instanceof Function) {
          foundMethod.apply(lastObjectInChain, args || [])
        } else {
          console.warn(
            `CableReady invoke_method operation failed due to missing '${method}' method for:`,
            firstObjectInChain
          )
        }
      })
      after(element, operation)
    })
  }
}
