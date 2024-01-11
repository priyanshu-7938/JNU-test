import {groth16} from "snarkjs";
import fs from "fs";

async function run() {
    const { proof, publicSignals } = await groth16.fullProve({days: 8000, id: 11821}, "circuit.wasm", "zkey_final.zkey");

    console.log("Proof: ");
    console.log(JSON.stringify(proof, null, 1));
    fs.writeFileSync('proof.txt', JSON.stringify(proof));
    fs.writeFileSync('public.txt', JSON.stringify(publicSignals));


    const vKey = JSON.parse(fs.readFileSync("verificationKey.json"));

    const res = await groth16.verify(vKey, publicSignals, proof);

    if (res === true) {
        console.log("Verification OK");
    } else {
        console.log("Invalid proof found");
    }

}

run().then(() => {
    process.exit(0);
});