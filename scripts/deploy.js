const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("vibes");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("goofy",  {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain goofy.vibes");

    txn = await domainContract.setRecord("goofy", "Am I being goofy or is it just the vibes??");
    await txn.wait();
    console.log("Set record for goofy.vibes");

    const address = await domainContract.getAddress("goofy");
    console.log("Owner of domain goofy:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();