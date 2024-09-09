import { IsNumber } from "class-validator";

export class CreatePurchaseDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  offerId: number;
}
