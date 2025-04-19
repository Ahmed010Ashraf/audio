import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AudioService } from '../../audio/audio.service';
import { audio } from '../interface/audiointerface';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule , RouterLink ,NgFor ,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {


allaudios !: audio[]
  constructor(private _AudioService:AudioService ){}


  loader:boolean = false;

  ngOnInit(): void {
    this.loader= true;
    this._AudioService.getAllAudio().subscribe(res=>{
      console.log(res);
      this.allaudios = res;
      this.loader = false;
    })
  }

  // tags logic
  availableTags = [
    { id: 1, name: 'arabic' },
    { id: 2, name: 'english' },
    { id: 3, name: 'technology' },
    { id: 4, name: 'education' },
    { id: 5, name: 'history' }
  ];

  // Array to store selected tag ids
  selectedTags: number[] = [];
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

  // handel the line width

  linewidth : string = "0px";
  helper : number = 0;
  searchQuery !:string ;
  onSearch():void {
    console.log('Search query:', this.searchQuery);
    // this.linewidth++;
    if(this.searchQuery.length < 23){
      this.helper= this.searchQuery.length * 20;
    }
    this.linewidth = `${this.helper}px`;
    console.log(this.linewidth);

  }




  // search audio
  search(title: string | null, category: string | null, tags: number[] | null){
    this.loader= true;
    let params = new HttpParams();

    if (title) {
      params = params.set('QueryString', title);
    } else {
      params = params.set('QueryString', 'null');
    }

    if (category) {
      params = params.set('Category', category);
    }
    // else {
    //   params = params.set('Category', 'null');
    // }

    if (tags && tags.length > 0) {
      tags.forEach((tagId) => {
        params = params.append('TagsIds', tagId.toString());
      });
    }
    // else {
    //   params = params.set('TagsIds', 'null');
    // }

    console.log(params);


    this._AudioService.search(params).subscribe(res=>{
      console.log(res);

      this.allaudios =res;
      this.loader= false;
    })
  }



}
