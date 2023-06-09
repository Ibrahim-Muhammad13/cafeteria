import { Component } from '@angular/core';
import { CounterService } from '../services/counter.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  counter:number = 0;
  isLogin!:boolean;
  isAdmin!:boolean ;
  userImage:any='';
  constructor(private counterService:CounterService , private authService:AuthService){
    authService.currentUsers.subscribe((data:any)=>{
      if (data !=null) {
        this.isLogin = true;
        this.isAdmin=data[1].Is_admin
        this.userImage=data[1].picture
      } else {
        this.isLogin = false;
      }
    })
  }
  ngOnInit(){
    this.counterService.counterVal.subscribe(res=>this.counter=res);
  }

  logOut(){
    this.authService.logOut();
    this.isAdmin = false;
  }

}
