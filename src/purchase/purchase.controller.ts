import { Body, Controller, Post } from "@nestjs/common";
import { PurchaseService } from "./purchase.service";
import { CreatePurchaseDto } from "./createPurchaseDto";

@Controller("purchase")
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async createPurchase(@Body() body: CreatePurchaseDto) {
    return this.purchaseService.createPurchase(body);
  }
}
