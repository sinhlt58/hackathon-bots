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
    { content: "test\ntext", user_id: 123, datetime: new Date(), type: "text" },
    { content: "test\ntext", datetime: new Date(), type: "text" },
    { content: ["abc", "xyz", "123"], datetime: new Date(), type: "buttons" },
    { content: "https://cauhoi-api.sachmem.vn/api/media/doc_img/1RO-EmF3oqJcEuex9VSUnCdm1wa_z4egS8_P850SXLnc/1_1_1_0_1_bf4876fe.jpg", datetime: new Date(), type: "image" },
    { content: "https://cauhoi-api.sachmem.vn/api/media/5a5f04e6bf44445f6bdc1f90.mp3", datetime: new Date(), type: "audio" }
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

  classMessage(message) {
    return {
      "message-bot"  : !message.user_id,
      "message-me"   : message.user_id,
    }
  }

  isBot(message) {
    return !message.user_id;
  }

  isText(message) {
    return message.type === "text";
  }

  isButtons(message) {
    return message.type === "buttons";
  }

  isImage(message) {
    return message.type === "image";
  }

  isAudio(message) {
    return message.type === "audio";
  }

  clickButtonMessage(btn) {
    this.sendMessage(btn);
  }

  clickSendMessage() {
    if (this.send_text) {
      this.sendMessage(this.send_text);
      this.send_text = "";
    }
  }

  sendMessage(text) {
    this.messages.push({ content: text, user_id: 123, datetime: new Date(), type: "text" });
    this.botsService.chatBot({ text: text }).subscribe(res => {
      console.log(res);
      if (res.nlg) {
        let nlg = res.nlg;
        let time = new Date(res.timestamp * 1000);
        this.showBotMessage(nlg, time);
        this.scrollToBottom();
      }
    })
    this.scrollToBottom();
  }

  showBotMessage(nlg, time) {
    for (let index = 0; index < nlg.length; index++) {
      const message = nlg[index];
      if (message.hasOwnProperty("text")) {
        let content = message.text.trim();
        content = content.replace(/\n+/g, "\n");
        this.messages.push({ content: content, datetime: time, type: "text" });
      }
      if (message.hasOwnProperty("buttons")) {
        let content = message.buttons;
        this.messages.push({ content: content, datetime: time, type: "buttons" });
      }
      if (message.hasOwnProperty("image")) {
        let content = message.image;
        this.messages.push({ content: content, datetime: time, type: "image" });
      }
      if (message.hasOwnProperty("attachment")) {
        let content = message.attachment;
        this.messages.push({ content: content, datetime: time, type: "audio" });
      }
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
