import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
import { isAddress } from "ethers";
const port = process.env.PORT || 3000;

import { addCourse, getOwner, mintNft, mintPoap } from "./utils";

app.get("/", (req, res) => {
	res.send("ok");
});

app.post("/issue/id", async (req, res) => {
	const { address } = req.body;
	console.log(isAddress(address));
	if (isAddress(address)) {
		const tx = await mintNft(address);
		res.send({ address, tx });
	} else {
		res.json({ address: "error" });
	}
});

app.post("/issue/cert", async (req, res) => {
	// TODO: only compute the TBA here.
	const { address, courseId } = req.body;
	console.log(isAddress(address), address, courseId);
	if (isAddress(address)) {
		const tx = await mintPoap(address, courseId);
		res.send({ address, tx });
	} else {
		res.json({ address: "error" });
	}
});
app.post("/addtest", async (req, res) => {
	const { id } = req.body;
	console.log({ id });
	const tx = await addCourse(id);
	res.json({ tx });
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
