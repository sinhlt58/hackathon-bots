import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Injectable({ providedIn: 'root' })
export class SpeechRecognitionService {
  speechRecognition: any;
  recording = false;

  constructor(private zone: NgZone) { }

  record(lang = 'en-us'): Observable<any> {
    return Observable.create(observer => {

      const { webkitSpeechRecognition }: IWindow = <IWindow>window;
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = lang;
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = speech => {
        var result = {temp: "", final: ""};
        for (var i = speech.resultIndex; i < speech.results.length; ++i) {
          if (speech.results[i].isFinal) {
            result.final += speech.results[i][0].transcript;
          } else {
            result.temp += speech.results[i][0].transcript;
          }
        }
        this.zone.run(() => {
          observer.next(result);
        });
      };

      this.speechRecognition.onerror = error => {
        observer.error(error);
      };

      this.speechRecognition.onend = () => {
        observer.complete();
      };

      this.recording = true;
      this.speechRecognition.start();
      console.log("Say something - We are listening !!!");
    });
  }

  DestroySpeechObject() {
    if (this.speechRecognition) {
      this.speechRecognition.stop();
    }
  }

}
