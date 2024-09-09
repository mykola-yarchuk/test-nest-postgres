import { Module } from "@nestjs/common";
import { UserService } from "./user/user.service";
import { PurchaseService } from "./purchase/purchase.service";
import { PrismaService } from "./prisma/prisma.service";
import { UserController } from "./user/user.controller";
import { PurchaseController } from "./purchase/purchase.controller";
import { OfferService } from "./offer/offer.service";
import { AnalyticalService } from "./analytical/analytical.service";
import { UserReportsService } from "./user-reports/user-reports.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [UserController, PurchaseController],
  providers: [
    UserService,
    PurchaseService,
    PrismaService,
    OfferService,
    AnalyticalService,
    UserReportsService,
  ],
})
export class AppModule {}
