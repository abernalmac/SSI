// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Over18Claim {
    uint claimCount = 0;
    uint256 constant MAX_INT = 2**256 - 1;
    struct Claim {
        uint id;            //not used to define a claim, just for development purposes
        string claimName;
        uint validity;
        string proofFormat;
    }

    mapping(uint => Claim) public claims;

    address public owner;

    function addClaim() public {
        ++claimCount;
        claims[claimCount] = Claim(claimCount, "over18", MAX_INT, "basic");
    }

    constructor() public {
        addClaim();
    }
}
