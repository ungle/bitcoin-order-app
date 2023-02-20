import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Happy Hotel Room Book';


  constructor(private router: Router) { }

  book() {
    console.log('Book !');
    setTimeout(() => {
      document.getElementById("welcome").style.visibility="hidden";
      this.router.navigate(['order-form']);
    }, 400);
  }

  cancel() {
    var result = confirm("Do you want to cancel?");
    if(result === true){
      alert("cancel successful");
      this.router.navigate([""]);
      document.getElementById("welcome").style.visibility="visible";
    }
    
  }
}
