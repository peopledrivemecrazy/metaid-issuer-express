import "dotenv/config";

export const rcpProvider = process.env.INFURA_API!;
export const contractAddress = process.env.CONTRACT_ADDRESS!;
export const metaCertcontractAddress = process.env.METACERT_POAP_ADDRESS!;
export const privateKey = process.env.PRIVATE_KEY!;
export const port: number = Number(process.env.PORT ?? 3000);
