const GetAndSetString = artifacts.require("GetAndSetString");

contract('GetAndSetString', () => {
    it('should set the value of data variable in smart contract', async() => {
        const getandsetString = await GetAndSetString.deployed();
        await getandsetString.set('testString');
        const result = getandsetString.get();
        assert(result, 'testString');
    });
});