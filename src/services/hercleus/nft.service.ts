import Moralis from 'moralis';

const fetchAllNFTs = async (address: string, chainId: number = 42161, cursor: any = null) => {
    let data: any = [];

    const fetchNFTsWithCursor = async (cursor: any) => {
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        chain: chainId,
        format: "decimal",
        mediaItems: false,
        cursor: cursor,
        address: address,
      });
      data = [...data, ...response.raw.result];
      if (response.raw.cursor) {
        await fetchNFTsWithCursor(response.raw.cursor);
      }
    };

    await fetchNFTsWithCursor(cursor);
    return data;
};

export default { fetchAllNFTs }