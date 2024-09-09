import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { HOUR } from "../constants";
import { PurchaseService } from "../purchase/purchase.service";

const sendBasicReport = async (email: string) => {
  console.log(`send report to user with email ${email}`);
};

@Injectable()
export class UserReportsService {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Cron("0 0 * * * *")
  async sendBasicReport() {
    const now = new Date();

    const lessThan25HoursAgo = new Date(now.getTime() - 25 * HOUR);
    const moreThan24HoursAgo = new Date(now.getTime() - 24 * HOUR);

    const purchases = await this.purchaseService.getPurchases({
      where: {
        createdAt: {
          gte: lessThan25HoursAgo,
          lte: moreThan24HoursAgo,
        },
      },
      include: { user: { select: { email: true } } },
    });

    for (const purchase of purchases) {
      await sendBasicReport(purchase.user.email);
    }
  }
}
