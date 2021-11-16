pragma solidity ^0.5.10;

contract Claim {
    address[] public over18;
    address[] public bcnBorn;
    address[] public espluguesResident;
    address[] public informaticsEngineer;

    // Making a claim
    function claim(uint claimId, string memory claimName, string memory claimValidity, string memory claimFormat, bytes32 claimSignature) public returns (uint256) {
    require(claimId >= 0 && claimId <= 4);
    require(keccak256(bytes(claimValidity)) != keccak256(bytes("0")));
    if (keccak256(abi.encodePacked(((claimName)))) == keccak256(abi.encodePacked((("over-18"))))) {
        bytes32 hash = sha256("Cuerpo Nacional de Policia");
        if (claimSignature == hash) over18.push(msg.sender);
    }
    if (claimId == 1 && keccak256(abi.encodePacked(((claimName)))) == keccak256(abi.encodePacked((("birth-place"))))) {
        if (keccak256(abi.encodePacked(((claimFormat)))) == keccak256(abi.encodePacked((("barcelona"))))) {
            bytes32 hash = sha256("Ajuntament de Barcelona");
            if (claimSignature == hash) bcnBorn.push(msg.sender);
        }
    }
    if (claimId == 2 && keccak256(abi.encodePacked(((claimName)))) == keccak256(abi.encodePacked((("residence-place"))))) {
        if (keccak256(abi.encodePacked(((claimFormat)))) == keccak256(abi.encodePacked((("esplugues"))))) {
            bytes32 hash = sha256("Ajuntament d'Esplugues");
            if (claimSignature == hash) espluguesResident.push(msg.sender);
        }
    }
    if (claimId == 3 && keccak256(abi.encodePacked(((claimName)))) == keccak256(abi.encodePacked((("university-degree"))))) {
        if (keccak256(abi.encodePacked(((claimFormat)))) == keccak256(abi.encodePacked((("Informatics Engineering"))))) {
            bytes32 hash = sha256("Universitat Politecnica de Catalunya");
            if (claimSignature == hash) informaticsEngineer.push(msg.sender);
        }
    }
    return claimId;
    }
    
    // Retrieving people over 18
    function getOver18Claimers() public view returns (address[] memory) {
    return over18;
    }

    // Retrieving people born in Barcelona
    function getBcnBornClaimers() public view returns (address[] memory) {
    return bcnBorn;
    }

    // Retrieving people resident of Esplugues
    function getEspluguesResidentClaimers() public view returns (address[] memory) {
    return espluguesResident;
    }

    // Retrieving people with an Informatics Engineering degree
    function getInformaticsEngineerClaimers() public view returns (address[] memory) {
    return informaticsEngineer;
    }

}