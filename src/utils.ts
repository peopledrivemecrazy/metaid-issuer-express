import { ethers } from "ethers";
import {
	contractAddress,
	metaCertcontractAddress,
	privateKey,
	rcpProvider,
} from "./constants";
import { abi as metaIDABI } from "./MetaID.json";
import { abi as metaCertABI } from "./MetaCert.json";

const provider = new ethers.JsonRpcProvider(rcpProvider);
const signer = new ethers.Wallet(privateKey, provider);
const CONTRACT = (address: string, abi: any, prov: any) =>
	new ethers.Contract(address, abi, prov);

export const getOwner = async (tokenId: string) => {
	const contract = CONTRACT(contractAddress, metaIDABI, provider);
	const owner = await contract.ownerOf(tokenId);
	return owner;
};

export const mintNft = async (address: string) => {
	const contract = CONTRACT(contractAddress, metaIDABI, provider);
	const contractSigner: any = contract.connect(signer);
	const tx = await contractSigner.mintId(address);
	return tx;
};

export const mintPoap = async (address: string, courseId: number) => {
	const contract = CONTRACT(metaCertcontractAddress, metaCertABI, provider);
	const contractSigner: any = contract.connect(signer);
	const tx = await contractSigner.mintCert(address, courseId);
	return tx;
};

export const addCourse = async (courseId: number) => {
	const contract = CONTRACT(metaCertcontractAddress, metaCertABI, provider);
	const contractSigner: any = contract.connect(signer);
	const tx = await contractSigner.addNewCourse(courseId);
	return tx;
};
