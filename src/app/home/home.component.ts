import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';

import { SpeechRecognitionService } from 'src/app/_core/services/speech-recognition.service';
import { BotsService } from 'src/app/_core/services/bots.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('scrollChat', { static: true }) scrollContainer: ElementRef;

  messages = [
    { text: "test", user_id: 123, datetime: new Date() },
    { text: "test", datetime: new Date() }
  ]

  send_text = "";
  temp_text = "";
  recording = false;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private cDRef: ChangeDetectorRef,
    private speechRecognitionService: SpeechRecognitionService,
    private botsService: BotsService
  ) {}

  ngOnInit() {
  }

  scrollToBottom() {
    this.cDRef.detectChanges();
    try {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error(err)
    }
  }

  sendMessage() {
    if (this.send_text) {
      this.messages.push({ text: this.send_text, user_id: 123, datetime: new Date() });
      this.botsService.chatBot({ text: this.send_text }).subscribe(res => {
        console.log(res);
        if (res.nlg) {
          let nlg = res.nlg[0];
          let time = new Date(res.timestamp * 1000)
          this.messages.push({ text: nlg.text, datetime: time });
          this.scrollToBottom();
        }
      })
      this.send_text = "";
      this.scrollToBottom();
    }
  }

  record() {
    if (this.recording) this.stopRecord();
    else {
      this.activateSpeechSearchMovie();
      this.recording = true;
    }
  }

  activateSpeechSearchMovie(): void {
    this.speechRecognitionService.record("vi-VN").subscribe(
      //listener
      (result) => {

        if (result.final) {
          this.send_text = this.temp_text + result.final;
          this.temp_text = this.send_text;
        }

        this.send_text = this.temp_text + result.temp;
      },
      //errror
      (err) => {
        console.log(err);
        if (err.error == "no-speech" || err.error == "recording") {
          console.log("--restatring service--");
          this.activateSpeechSearchMovie();
        } else {
          this.stopRecord();
        }
      },
      //complete
      () => {
        this.stopRecord();
      }
    );
  }

  stopRecord() {
    this.temp_text = '';
    this.speechRecognitionService.DestroySpeechObject();
    this.recording = false;
  }
}
