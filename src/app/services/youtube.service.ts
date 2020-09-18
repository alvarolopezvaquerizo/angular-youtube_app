import { Injectable } from '@angular/core';

// Importamos el HttpClient que sirve para hacer peticiones http y el HttpParams que este ultimo sirva para
// no concatenar tanto en la const url y que todos esos parametros este mas ordenado.
import { HttpClient, HttpParams } from '@angular/common/http';
// Importamos el modelo youtube.models.ts
import { YoutubeResponse } from '../models/youtube.models';
// Importamos Map para convertir los datos que nos vienen
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyDnJCASWkSZDC9Qb1GYqgqRm3w4z2NcP2w';
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor( private http: HttpClient ) {}

  // OBTENER EL LISTADO DE LOS VIDEOS
  getVideos() {

    const url = `${ this.youtubeUrl }/playlistItems`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '20')
      .set('playlistId', this.playlist)
      .set('key', this.apikey)
      // Para cargar los siguientes videos
      .set('pageToken', this.nextPageToken)

    return this.http.get<YoutubeResponse>( url, { params } )
                .pipe (

                  map ( resp => {
                    this.nextPageToken = resp.nextPageToken;
                    return resp.items;
                  }),

                  map ( items => items.map( video => video.snippet ) )

                );

  }

}
