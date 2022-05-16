const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("vibes");
    await domainContract.deployed();

    console.log("Contract Deployed to:", domainContract.address);

    let txn = await domainContract.register("chill", {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();

    const address = await domainContract.getAddress("chill");
    console.log("Owner of domain chill:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

runMain();
