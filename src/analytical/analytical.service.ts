import { Injectable } from "@nestjs/common";

const fakeRequest = (data: { userId: number; offerId: number }) => {};

@Injectable()
export class AnalyticalService {
  async sendAnalyticalData(data: { userId: number; offerId: number }) {
    fakeRequest(data);
  }
}
