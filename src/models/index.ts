import apiClient from "@/plugins/axios"
import type { AxiosResponse } from "axios"

type SOARecord = {
    nameServer: string
    admin: string
    serial: number
    refresh: number
    retry: number
    expire: number
    minimum: number
}

export type Record = {
    type: string
    // + type related fields
}

export type Zone = {
    origin: string
    ttl: string
    soaRecord: SOARecord
    records: Record[]
}

export async function getZones(): Promise<Zone[]> {
    return apiClient
        .get(`/zones`)
        .then((resp: AxiosResponse<Zone[]>) => resp.data)
}

export async function getZone(origin: string): Promise<Zone> {
    return apiClient
        .get(`/zones/${origin}`)
        .then((resp: AxiosResponse<Zone>) => resp.data)
}

export async function postZone(zone: object): Promise<Zone> {
    return apiClient
        .post(`/zones`, zone)
        .then((resp: AxiosResponse<Zone>) => resp.data)
}

export async function patchZone(zone: object): Promise<Zone> {
    return apiClient
        .patch(`/zones`, zone)
        .then((resp: AxiosResponse<Zone>) => resp.data)
}

export async function deleteZone(origin: string): Promise<any> {
    return apiClient
        .delete(`/zones/${origin}`)
        .then((resp: AxiosResponse<any>) => resp.data)
}

export async function postRecord(origin: string, record: object): Promise<Record> {
    return apiClient
        .post(`/zones/${origin}/records`, record)
        .then((resp: AxiosResponse<Record>) => resp.data)
}

export async function patchRecord(origin: string, target: string, record: object): Promise<Record> {
    return apiClient
        .patch(`/zones/${origin}/records/${target}`, record)
        .then((resp: AxiosResponse<Record>) => resp.data)
}


export async function deleteRecord(origin: string, data: Record): Promise<any> {
    return apiClient
    .delete(`/zones/${origin}/records`, {data: data})
    .then((resp: AxiosResponse<any>) => resp.data)
}

// export class Domain implements IDomain {
//     id: Number;
//     name: String;
//     nameServer: String;
//     nsIp: String;
//     ttl: String;
//     subdomains: ISubdomain[] | null;

//     constructor(id: Number = 0, name: String = "", nameServer: String = "", nsIp: String = "", ttl: String = "", subdomains: ISubdomain[] | null = null) {
//         this.id = id
//         this.name = name
//         this.nameServer = nameServer
//         this.nsIp = nsIp
//         this.ttl = ttl
//         this.subdomains = subdomains
//     }

//     _fillFromResponse(resp: AxiosResponse) {
//         this.name = resp.data.name
//         this.nameServer = resp.data.nameServer
//         this.nsIp = resp.data.nsIp
//         this.ttl = resp.data.ttl
//         // this.subdomains = resp.data.subdomains  // should be null
//     }

//     _getFormData() {
//         return {
//             name: this.name,
//             nameServer: this.nameServer,
//             nsIp: this.nsIp,
//             ttl: this.ttl,
//         }
//     }

//     fillFromApi(id: Number, apiClient: AxiosInstance): Boolean {
//         let errorFlag = false

//         apiClient.get(`/domains/${id}`).then(resp => {
//             this.id = id
//             this._fillFromResponse(resp)
//         }).catch(error => {
//             errorFlag = true
//             console.error(error)
//         })

//         return errorFlag
//     }

//     createOnApi(apiClient: AxiosInstance) {
//         let errorFlag = false

//         apiClient.post(`/domains`, this._getFormData()).then(resp => {
//             this._fillFromResponse(resp)
//         }).catch(error => {
//             errorFlag = true
//             console.error(error)
//         })

//         return errorFlag
//     }

//     editOnApi(apiClient: AxiosInstance) {
//         let errorFlag = false

//         apiClient.patch(`/domains/${this.id}`, this._getFormData()).then(resp => {
//             this._fillFromResponse(resp)
//         }).catch(error => {
//             errorFlag = true
//             console.error(error)
//         })

//         return errorFlag
//     }
// }

// export interface ISubdomain {
//     id: Number
//     name: String
//     domainId: Number
//     ip: String
// }

// export class Subdomain implements ISubdomain {
//     id: Number;
//     name: String;
//     domainId: Number;
//     ip: String;

//     constructor(id: Number = 0, name: String = "", domainId: Number = 0, ip: String = "") {
//         this.id = id
//         this.name = name
//         this.domainId = domainId
//         this.ip = ip
//     }

//     _getFormData() {
//         return {
//             name: this.name,
//             ip: this.ip,
//         }
//     }

//     _fillFromResponse(resp: AxiosResponse) {
//         this.id = resp.data.id
//         this.domainId = resp.data.domainId
//         this.name = resp.data.name
//         this.ip = resp.data.ip
//     }

//     createOnApi(apiClient: AxiosInstance): Promise<Subdomain> {
//         const promise = apiClient.post(`/domains/${this.domainId}/subdomains`, this._getFormData()).then(resp => {
//             this._fillFromResponse(resp)
//             return this
//         })

//         return promise
//     }

//     updateOnApi(apiClient: AxiosInstance): Promise<Subdomain> {
//         const promise = apiClient.patch(`/domains/${this.domainId}/subdomains/${this.id}`, this._getFormData()).then(resp => {
//             this._fillFromResponse(resp)
//             return this
//         })

//         return promise
//     }
// }

// export class Email {
//     id: Number
//     priority: Number
//     name: String
//     ip: String

//     constructor(id: Number = 0, priority: Number = 0, name: String = "", ip: String = "") {
//         this.id = id
//         this.priority = priority
//         this.name = name
//         this.ip = ip
//     }

//     _getFormData() {
//         return {
//             priority: this.priority,
//             name: this.name,
//             ip: this.ip
//         }
//     }

//     _fillFromResponse(resp: AxiosResponse) {
//         this.id = resp.data.id
//         this.priority = resp.data.priority
//         this.name = resp.data.name
//         this.ip = resp.data.ip
//     }

//     createOnApi(domainId: Number, apiClient: AxiosInstance): Promise<Email> {
//         console.log(this._getFormData())
//         const promise = apiClient.post(`/domains/${domainId}/emails`, this._getFormData()).then(resp => {
//             this._fillFromResponse(resp)
//             return this
//         })

//         return promise
//     }

//     updateOnApi(domainId: Number, apiClient: AxiosInstance): Promise<Email> {
//         const promise = apiClient.patch(`/domains/${domainId}/emails/${this.id}`, this._getFormData()).then(resp => {
//             this._fillFromResponse(resp)
//             return this
//         })

//         return promise
//     }
// }
