import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AudioService } from '../../audio/audio.service';

import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uploade',
  standalone: true,
  imports: [FormsModule , NgFor , NgIf , RouterLink ,
    ToastrModule ],
templateUrl: './uploade.component.html',
  styleUrl: './uploade.component.css'
})
export class UploadeComponent {

  constructor(private _uploadAudio:AudioService , private toastr: ToastrService){}
  availableTags = [
    { id: 1, name: 'arabic' },
    { id: 2, name: 'english' },
    { id: 3, name: 'technology' },
    { id: 4, name: 'education' },
    { id: 5, name: 'history' }
  ];

  // Array to store selected tag ids
  selectedTags: number[] = [];

  title: string = '';
  description: string = '';
  tags: string = '';
  audios: any[] = [];
  audioFile !:File;

  // Method to handle tag selection
  onTagChange(event: any, tagId: number) {
    if (event.target.checked) {
      this.selectedTags.push(tagId);
    } else {
      const index = this.selectedTags.indexOf(tagId);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      }
    }
    console.log('Selected Tags:', this.selectedTags);
  }

  // Handle file selection (audio file)
  handleAudioFile(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.audioFile = input.files[0];

      // let reader = new FileReader();

      // reader.addEventListener("load", () => {
      //   // Store the result (data URL of the audio file) in a variable
      //   this.audioURL = reader.result as string;

      //   console.log('Audio file:', this.audioFile);
      //   console.log('Audio file URL:', this.audioURL);

      // });

      // reader.readAsDataURL(this.audioFile);
    }
  }


  // Upload the audio data (including title, description, selected tags , audio file)
  loader:boolean = false
  uploadAudio() {
this.loader = true
if (!this.audioFile) {
  alert('Please select an audio file.');
  return;
}

const formData = new FormData();
formData.append('Title', this.title);
formData.append('Description', this.description);
formData.append('File', this.audioFile);
formData.append('Category', this.selectedCategory);

// Append each tagId like: TagsIds[0], TagsIds[1], etc.
this.selectedTags.forEach((tagId, index) => {
  formData.append(`TagsIds[${index}]`, tagId.toString());
});

console.log('Uploading with FormData:', formData);

this._uploadAudio.uploadAudio(formData).subscribe({
  next: (res) => {
    console.log(res);
    // alert('Uploaded successfully!');


    this.toastr.success('Uploaded successfully');


    //handle loader
    this.loader = false
  },
  error: (err) => {
    console.error('Upload error:', err);
    // alert("There was an error with your data. Please check and try again.");
    this.toastr.success('There was an error with your data. Please check and try again');



  //handle loader
  this.loader = false
}
});

  }



  // handel the catigories

  categories: string[] = ['quran', 'music', 'audiobooks', 'podcasts' , 'other'];
  selectedCategory: string = 'podcasts';
  onCategoryChange() {
    console.log('Selected category:', this.selectedCategory);
  }
}
