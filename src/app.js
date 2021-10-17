App = {
    loading: false,
    contracts: {},
    

    load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
    },
  
    loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
        var web3 = require("web3");
        App.web3Provider = Web3.currentProvider
        web3 = new Web3(Web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        web3 = new Web3(Web3.currentProvider)
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },
  
    loadAccount: async () => {
      // Set the current blockchain account
      App.account = web3.eth.accounts[0]
      console.log(App.account)
    },
  
    loadContract: async () => {
      // Create a JavaScript version of the smart contract
      const over18Claim = await $.getJSON('Over18Claim.json')
      App.contracts.Over18Claim = TruffleContract(over18Claim)
      App.contracts.Over18Claim.setProvider(App.web3Provider)
  
      // Hydrate the smart contract with values from the blockchain
      App.over18Claim = await App.contracts.Over18Claim.deployed()
    },
  
    render: async () => {
      // Prevent double render
      if (App.loading) {
        return
      }
  
      // Update app loading state
      App.setLoading(true)
  
      // Render Account
      $('#account').html(App.account)
  
      // Render Claims
      await App.renderClaims()
  
      // Update loading state
      App.setLoading(false)
    },
  
    renderClaims: async () => {
      // Load the total claim count from the blockchain
      const claimCount = await App.over18Claim.claimCount()
      const $claimTemplate = $('.claimTemplate')
  
      // Render out each claim with a new claim template
      for (var i = 1; i <= claimCount; i++) {
        // Fetch the claim data from the blockchain
        const claim = await App.over18Claim.claims(i)
        const claimId = claim[0].toNumber()
        const claimName = claim[1]
        const claimValidity = claim[2].toNumber()
        const claimProofFormat = claim[3]
  
        // Create the html for the claim
        const $newClaimTemplate = $claimTemplate.clone()
        $newClaimTemplate.find('.content').html(claimContent)
        $newClaimTemplate.find('input')
                        .prop('id', claimId)
                        .prop('name', claimName)
                        .prop('validity', claimValidity)
                        .prop('proof_format', claimProofFormat)
                        // .on('click', App.toggleCompleted)
  
        // Show the claim
        $newClaimTemplate.show()
      }
    },
  
    setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#loader')
      const content = $('#content')
      if (boolean) {
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    }
  }
  
  $(() => {
    $(window).load(() => {
      App.load()
    })
  })