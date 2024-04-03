import supertest from 'supertest';
import expect from 'expect';
import app from "../src/server";
const api = supertest(app);
describe('Theseus apis', () => {
    it('should get the lprate of the theseus', async () => {
        const response = await api.get('/api/theseus/status/lprate');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.lprate).toBeGreaterThan(1);
    });

    it('should get the tvl of the theseus', async () => {
        const response = await api.get('/api/theseus/status/tvl');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.tvl).toBeGreaterThan(1);
    });
    
    it('should get the position of the theseus', async () => {
        const address = "0x0116E7f6960BB76332246444f323df7Cf46255Fc";
        const response = await api.get(`/api/theseus/status/position?address=${address}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.position).toBeGreaterThanOrEqual(0);
    });

    it('should select the deposit token of the theseus', async () => {
        const address = "0x0116E7f6960BB76332246444f323df7Cf46255Fc";
        const response = await api.get(`/api/theseus/zap/selectDepositToken`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.tokenAddress).toEqual("0xaf88d065e77c8cC2239327C5EDb3A432268e5831");
    });

    it('should select the withdrawal plugin and pool of the theseus', async () => {
        const response = await api.get(`/api/theseus/zap/selectWithdrawalPluginAndPool`);
    
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.pluginId).toBe(1);
        expect(response.body.data.poolId).toBeLessThan(10);
        expect(response.body.data.tokenList[0].address).toContain("0x");
        expect(response.body.data.tokenList[0].symbol).toBeTruthy();
        expect(response.body.data.tokenList[0].decimals).toBeGreaterThanOrEqual(6);
        expect(response.body.data.tokenList[1].address).toContain("0x");
        expect(response.body.data.tokenList[1].symbol).toBeTruthy();
        expect(response.body.data.tokenList[1].decimals).toBeGreaterThanOrEqual(6);
    });
});