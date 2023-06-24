import { ethers } from "ethers";
import { contractAddress, privateKey, rcpProvider } from "./constants";
import { abi } from "./MetaID.json";

const provider = new ethers.JsonRpcProvider(rcpProvider);
const signer = new ethers.Wallet(privateKey, provider);
const CONTRACT = (address: string, abi: any, prov: any) =>
	new ethers.Contract(address, abi, prov);

export const getOwner = async (tokenId: string) => {
	const contract = CONTRACT(contractAddress, abi, provider);
	const owner = await contract.ownerOf(tokenId);
	return owner;
};

export const mintNft = async (address: string) => {
	const contract = CONTRACT(contractAddress, abi, provider);
	const contractSigner: any = contract.connect(signer);
	const tx = await contractSigner.mintId(address);
	return tx;
};
