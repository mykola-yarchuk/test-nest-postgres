import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Purchase } from "@prisma/client";
import { UserService } from "../user/user.service";
import { OfferService } from "../offer/offer.service";
import { AnalyticalService } from "../analytical/analytical.service";

@Injectable()
export class PurchaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UserService,
    private readonly offersService: OfferService,
    private readonly analyticalService: AnalyticalService,
  ) {}

  async createPurchase({
    userId,
    offerId,
  }: {
    userId: number;
    offerId: number;
  }): Promise<Purchase> {
    const user = await this.usersService.getUser({ id: userId });
    const offer = await this.offersService.getOffer({ id: offerId });

    if (!user) {
      throw new NotFoundException(`There is no User with id ${userId}`);
    }

    if (!offer) {
      throw new NotFoundException(`There is no Offer with id ${offerId}`);
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        user: { connect: { id: userId } },
        offer: { connect: { id: offerId } },
      },
    });

    await this.analyticalService.sendAnalyticalData({ userId, offerId });

    return purchase;
  }

  async getPurchases(params: {
    where?: Prisma.PurchaseWhereInput;
    include?: Prisma.PurchaseInclude;
  }): Promise<Array<Purchase & { user?: { email: string } }>> {
    const { where, include } = params;

    return this.prisma.purchase.findMany({
      where,
      include,
    });
  }
}
