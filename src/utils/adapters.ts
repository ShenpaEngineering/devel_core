import { availableTypes } from '../types'

export function transformJSONtoModelMessage(data: any, messageType: availableTypes) {
    data['metadata'] = { type: messageType}
    const attrs = Object.keys(data)
    for (let i = 0; i < attrs.length; i++) {
        if (data[ attrs[i] ] == null){
            data[ attrs[i] ] = undefined
        }
    }
    return data
}


export function transformModelMessageToJSON(data: any){
    const attrs = Object.keys(data)
    for (let i = 0; i < attrs.length; i++) {
        if (data[ attrs[i] ] == undefined){
            data[ attrs[i] ] = null
        }
        if (attrs[i] == "metadata"){
            delete data[ attrs[i] ]
        }
    }
    return data
}