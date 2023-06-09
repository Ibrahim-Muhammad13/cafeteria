import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
orders:any[]=[];
userID!:number;
startDate!: string;
endDate!: string;
delOrder:any={};
constructor(private authService:AuthService , private orderService:OrderService){}
ngOnInit(){
  this.authService.currentUsers.subscribe((data:any)=>this.userID=data[1].id);
  this.orderService.getOrderByUserId(this.userID).subscribe((res:any)=>this.orders=res.reverse());
}

filterOrders() {
  this.orderService.getOrderByUserId(this.userID).subscribe((res: any) => {
    this.orders = res;
    this.orders.reverse();
    if (this.startDate && this.endDate) {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      this.orders = this.orders.filter((order: any) => {
        const orderDate = new Date(order.created_at);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }
  });
}

deleteOrder(order_id:any , item_id:any){
this.delOrder['order_id']=order_id;
this.delOrder['item_id']=item_id
this.orderService.deleteOrder(this.delOrder).subscribe((data:any)=>{
  if(data){
    window.location.reload();
  }
})
}

}
