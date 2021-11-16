App = {
  web3Provider: null,
  contracts: {},
  
  init: async function() {
    // Load claims.
    $.getJSON('../claims.json', function(data) {
      var claimsRow = $('#claimsRow');
      var claimTemplate = $('#claimTemplate');

      for (i = 0; i < data.length; i ++) {
        claimTemplate.find('.panel-title').text(data[i].title);
        claimTemplate.find('img').attr('src', data[i].picture);
        claimTemplate.find('.claim-name').text(data[i].name);
        claimTemplate.find('.claim-validity').text(data[i].validity);
        claimTemplate.find('.claim-format').text(data[i].format);
        claimTemplate.find('.btn-claim').attr('data-id', data[i].id);

        claimsRow.append(claimTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });;
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Claim.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var ClaimArtifact = data;
      App.contracts.Claim = TruffleContract(ClaimArtifact);
    
      // Set the provider for our contract
      App.contracts.Claim.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the made claims
      return App.markClaimed();
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-claim', App.handleClaim);
  },

  markClaimed: function() {
    var ClaimInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      App.contracts.Claim.deployed().then(function(instance) {
        ClaimInstance = instance;

        return ClaimInstance.getOver18Claimers.call();
      }).then(function(claimers) {
        for (i = 0; i < claimers.length; i++) {
          if (claimers[i] == account) {
            $('.panel-claim').eq(0).find('button').text('Success').attr('disabled', true);
          }
        }
      }).catch(function(err) {
        console.log(err.message);
      });
      App.contracts.Claim.deployed().then(function(instance) {
        ClaimInstance = instance;

        return ClaimInstance.getBcnBornClaimers.call();
      }).then(function(claimers) {
        for (i = 0; i < claimers.length; i++) {
          if (claimers[i] == account) {
            $('.panel-claim').eq(1).find('button').text('Success').attr('disabled', true);
          }
        }
      }).catch(function(err) {
        console.log(err.message);
      });
      App.contracts.Claim.deployed().then(function(instance) {
        ClaimInstance = instance;

        return ClaimInstance.getEspluguesResidentClaimers.call();
      }).then(function(claimers) {
        for (i = 0; i < claimers.length; i++) {
          if (claimers[i] == account) {
            $('.panel-claim').eq(2).find('button').text('Success').attr('disabled', true);
          }
        }
      }).catch(function(err) {
        console.log(err.message);
      });
      App.contracts.Claim.deployed().then(function(instance) {
        ClaimInstance = instance;

        return ClaimInstance.getInformaticsEngineerClaimers.call();
      }).then(function(claimers) {
        for (i = 0; i < claimers.length; i++) {
          if (claimers[i] == account) {
            $('.panel-claim').eq(3).find('button').text('Success').attr('disabled', true);
          }
        }
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  handleClaim: function(event) {
    var claimId = parseInt($(event.target).data('id'));
    var claimName;
    var claimValidity;
    var claimFormat;
    var claimSignature;
    $.getJSON('../claims.json', function(data) {
        claimName = data[claimId].name;
        claimValidity = data[claimId].validity;
        claimFormat = data[claimId].format;
        claimSignature = data[claimId].signature;
    });
    var ClaimInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Claim.deployed().then(function(instance) {
        ClaimInstance = instance;

        // Execute claim as a transaction by sending account
        return ClaimInstance.claim(claimId, claimName, claimValidity, claimFormat, claimSignature, {from: account});
      }).then(function(result) {
        return App.markClaimed();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
