import supertest from 'supertest';
import expect from 'expect';
import app from "../src/server";
import { ARBITRUM } from '../src/constants/chains';
const api = supertest(app);
describe('Hercleus apis', () => {
    it('should get the tvl of the hercleus', async () => {
        const response = await api.get('/api/hercleus/status/tvl');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.tvl).toBeGreaterThan(0);

    });
    it('should get the correct LP rate', async () => {
        const response = await api.get('/api/hercleus/status/lprate');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.lprate).toBeGreaterThan(1);

    });
    it('should get lp balance of the account', async () => {
        const address = "0x0116E7f6960BB76332246444f323df7Cf46255Fc";
        const chainId = ARBITRUM;
        const response = await api.get(`/api/hercleus/status/lpbalance?address=${address}&chainId=${chainId}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.lp_balance).toBeGreaterThanOrEqual(0);
    }); 

    it('should get the position of the account', async () => {
        const address = "0x0116E7f6960BB76332246444f323df7Cf46255Fc";
        const response = await api.get(`/api/hercleus/status/position?address=${address}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.position).toBeGreaterThanOrEqual(0);
    }); 

    it("Select the Deposit Token", async () => {
        const chainId = ARBITRUM;
        const response = await api.get(`/api/hercleus/zap/selectDepositToken?chainId=${chainId}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.tokenAddress).toContain("0x");
    })

    it("Select the Withdraw Token", async () => {
        const chainId = ARBITRUM;
        const response = await api.get(`/api/hercleus/zap/selectWithdrawToken?chainId=${chainId}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.tokenAddress).toContain("0x");
    })
});