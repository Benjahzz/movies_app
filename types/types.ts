

export interface alertaProps  {
    msg?: string;
    type: 'success' | 'error' | ''
}
export interface media{
    id: number,
    overview?: string,
    vote_average?: string,
    backdrop_path?: string,
    poster_path?: string,
    genre_ids?: Array<number>,
    media_type?: string
    videos?: {
        results: [
            {
                key: string
            }
        ]
    }
}
export interface movieProps extends media{
    title?: string
}
export interface serieProps extends media{
    name?: string
}

export interface Element {
    type:
      | 'Bloopers'
      | 'Featurette'
      | 'Behind the Scenes'
      | 'Clip'
      | 'Trailer'
      | 'Teaser'
  }

export interface User {
    email? : string | null | undefined;
    sessionId?: string | null | undefined
}
export type Avatar = {
    id: number,
    image: string
}