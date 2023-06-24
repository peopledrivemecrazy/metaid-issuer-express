import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
import { isAddress } from "ethers";
const port = process.env.PORT || 3000;
import { ethers } from "ethers";

import { contractAddress, privateKey, rcpProvider } from "./constants";
import { abi } from "./MetaID.json";
import { getOwner, mintNft } from "./utils";

const provider = new ethers.JsonRpcProvider(rcpProvider);
const signer = new ethers.Wallet(privateKey, provider);
const CONTRACT = (address: string, abi: any, prov: any) =>
	new ethers.Contract(address, abi, prov);

app.get("/", (req, res) => {
	res.send("ok");
});

app.post("/issue", async (req, res) => {
	const { address } = req.body;
	console.log(isAddress(address));
	if (isAddress(address)) {
		const tx = await mintNft(address);
		res.send({ address, tx });
	} else {
		res.json({ address: "error" });
	}
});

app.get("/nft/:id", async (req, res) => {
	const { id } = req.params;
	const owner = await getOwner(id);
	const metadata = {
		tokenId: id,
		name: `MetaID #${id}`,
		image: `https://noun-api.com/beta/pfp?name=${owner}`,
		description: "MetaCert ID associated with WordID",
	};

	res.json(metadata);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
