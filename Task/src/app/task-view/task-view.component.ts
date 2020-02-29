import { Component, OnInit } from '@angular/core';
import { videoText } from '../model/vtt';

@Component({
  selector: 'task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor() { }

  render: FileReader = new FileReader()
  vttdata: any;

  vttdatarecord: any[] = []
  result: any[] = []

  ngOnInit(): void {
  }
  changeEvent($event){
    let input = $event.target; 
    this.render.readAsText(input.files[0]);

    this.render.onload= ()=>{
      this.vttdata=  this.render.result;

      let array_= (this.vttdata).split('\n\n')

      this.jsonArray(array_)
    }
  }
  jsonArray(obj: any){
    for(let i=1;i < obj.length-1; i++){
      let info:videoText = new videoText();

      let infobj= obj[i].split('\n');
      //console.log(infobj)
      let formate= infobj[1];
      formate= formate.split('-->')

      info.key= infobj[0]
      info.startL= formate[0]
      info.endL= formate[1]

      info.subtitle= infobj[2]
      if(infobj[3]){
        info.subtitle_= infobj[3]
      }else{
        info.subtitle_=''
      }
      this.result.push(info)
    }
    console.log(this.result)
  }

  deleteEvent(obj: videoText){
    if(confirm('Are You Sour To Delete Content')){
    this.result= this.removedata(obj.key)
    }
  }

  
 removedata(index: number) {
   let du_array= [...this.result]
  console.log(du_array.length)
   du_array.splice(index, 1)
  
   console.log(du_array.length)
   return du_array

}

//var result = arrayRemove(array, 6);

// result = [1, 2, 3, 4, 5, 7, 8, 9, 0]

}
