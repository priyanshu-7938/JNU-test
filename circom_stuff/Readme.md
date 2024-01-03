
All this be done on the server section....
first witness genration for the user...
    $node genrate_witness.js <file_name>.wsam input.json witness.wtns

second proof generation
    $snarkjs groth16 prove <file_name>_0001.zkey witness.wtns proof.json public.json


    proof verifying via library or in code.
        $snarkjs groth16 verify verificationkey

    proof verifying using smart contract
    generating the calldata :$
        snarkjs zkey export soliditycalldata public.json proof.json



proving via command line
    
    -proof generation
        $ snarkjs groth16 fullprove input.json circuit_js/circuit.wasm zkey_final.zkey proof.json public.json
    -verification
        $snarkjs groth16 verify verificationKey.json public.json proof.json