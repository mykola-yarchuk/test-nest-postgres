import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Offer } from "@prisma/client";

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async getOffer(
    offerWhereUniqueInput: Prisma.OfferWhereUniqueInput,
  ): Promise<Offer | null> {
    return this.prisma.offer.findUnique({
      where: offerWhereUniqueInput,
    });
  }
}
