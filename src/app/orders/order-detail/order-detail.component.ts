import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: IOrder;

  constructor(private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService,
              private orderService: OrdersService) {
    this.bcService.set('@orderDetails', '');
  }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getOrderById(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(data => {
      this.order = data;
      this.bcService.set('@orderDetails', `Order# ${data.id} - ${data.status}`);
    }, error => {
      console.log(error);
    });
  }

}
