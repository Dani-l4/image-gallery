export interface iImage {
    id: number
    type: string
    previewURL: string
    previewWidth: number
    previewHeight: number
    webformatURL: string
    webformatWidth: number
    webformatHeight: number
    views: number
    likes: number
}

export interface iPBResponse {
    total: number
    totalHits: number
    hits: iImage[]
}
