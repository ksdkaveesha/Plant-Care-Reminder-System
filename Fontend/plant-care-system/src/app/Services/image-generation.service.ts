import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageGenerationService {
  constructor(private http: HttpClient) {}

  generateImage(prompt: string): Observable<Blob> {
    return this.http.post('http://localhost:5230/api/ImageGeneration/generate-image', JSON.stringify(prompt), {
      responseType: 'blob',
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
