export const FUNDRAISER_CONTRACT_ADDRESS = "0x700663B92515B32F4CCE819BE40607ED691Bcb54"
export const abi =[
	{
		"inputs": [],
		"name": "Campaign__AlreadyFunded",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Campaign__CouldntRefund",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Campaign__NotEnoughFunds",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Campaign__NotSlickEnough",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Campaign__TransactionFailed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Campaign__ZeroWei",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "fundCampaign",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "fundPublicFund",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_fundsRequiredInWei",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_imageUrl",
				"type": "string"
			}
		],
		"name": "newCampaign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "publicFundActivator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "runPublicFund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "campaignCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "idToCampaign",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "fundsRequiredInWei",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fundsReceivedInWei",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fundsWithdrawnInWei",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "campaignCreatorAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isRunPublicFundActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "publicFundBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]