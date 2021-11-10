pragma solidity ^0.5.10;

contract Claim {
    address[] public over18;
    address[] public bcnBorn;
    address[] public espluguesResident;
    address[] public informaticsEngineer;

    // Making a claim
    function claim(uint claimId, string memory claimName, string memory claimValidity, string memory claimFormat) public returns (uint) {
    require(claimId >= 0 && claimId <= 4);
    require(keccak256(bytes(claimValidity)) != keccak256(bytes("0")));
    if (keccak256(bytes(claimName)) == keccak256(bytes("over-18"))) {
        over18.push(msg.sender);
    }
    else if (keccak256(bytes(claimName)) == keccak256(bytes("birth-place"))) {
        if (keccak256(bytes(claimFormat)) == keccak256(bytes("barcelona"))) {
            bcnBorn.push(msg.sender);
        }
    }
    else if (keccak256(bytes(claimName)) == keccak256(bytes("residence-place"))) {
        if (keccak256(bytes(claimFormat)) == keccak256(bytes("esplugues"))) {
            espluguesResident.push(msg.sender);
        }
    }
    else if (keccak256(bytes(claimName)) == keccak256(bytes("university-degree"))) {
        if (keccak256(bytes(claimFormat)) == keccak256(bytes("Informatics Engineering"))) {
            informaticsEngineer.push(msg.sender);
        }
    }

    return claimId;
    }
    
    // Retrieving the Claimers
    function getOver18Claimers() public view returns (address[] memory) {
    return over18;
    }

    // Retrieving the Claimers
    function getBcnBornClaimers() public view returns (address[] memory) {
    return bcnBorn;
    }

    // Retrieving the Claimers
    function getEspluguesResidentClaimers() public view returns (address[] memory) {
    return espluguesResident;
    }

    // Retrieving the Claimers
    function getInformaticsEngineerClaimers() public view returns (address[] memory) {
    return informaticsEngineer;
    }
}