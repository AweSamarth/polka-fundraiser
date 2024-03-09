// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Fundraiser {
    error Campaign__ZeroWei();
    error Campaign__AlreadyFunded();
    error Campaign__NotSlickEnough();
    error Campaign__CouldntRefund();
    error Campaign__TransactionFailed();
    error Campaign__NotEnoughFunds();

    uint public campaignCounter;
    uint fundCounter;
    uint public publicFundBalance;
    bool public isRunPublicFundActive;

    struct Campaign {
        uint id;
        string imageUrl;
        string title;
        string description;
        uint fundsRequiredInWei;
        uint fundsReceivedInWei;
        uint fundsWithdrawnInWei;
        address campaignCreatorAddress;
    }

    mapping(uint => Campaign) public  idToCampaign;

    function newCampaign(
        string memory _title,
        string memory _description,
        uint _fundsRequiredInWei,
        string memory _imageUrl
    ) public {
        campaignCounter++;

        if (_fundsRequiredInWei <= 0) {
            revert Campaign__ZeroWei();
        }

        idToCampaign[campaignCounter] = Campaign({
            id: campaignCounter,
            imageUrl: _imageUrl,
            title: _title,
            description: _description,
            fundsRequiredInWei: _fundsRequiredInWei,
            fundsReceivedInWei: 0,
            fundsWithdrawnInWei: 0,
            campaignCreatorAddress: msg.sender
        });
    }

    function runPublicFund(uint _id) public  {
        if(publicFundBalance<100){
            revert Campaign__NotEnoughFunds();
        }
        idToCampaign[_id].fundsReceivedInWei += ((90 * publicFundBalance) /100);
        (bool success, ) = payable(msg.sender).call{value: (10 * publicFundBalance) / 100}("");
        if (!success) {
            revert Campaign__TransactionFailed();
        }
        publicFundBalance = 0;
        isRunPublicFundActive = false;

    }

    function publicFundActivator() public {
        if (fundCounter % 2 == 0) {
            isRunPublicFundActive = true;
        }
    }

    function fundCampaign(uint _id) external payable {
        Campaign memory temp = idToCampaign[_id];

        if (msg.sender == temp.campaignCreatorAddress) {
            revert Campaign__NotSlickEnough();
        }

        if (temp.fundsReceivedInWei >= temp.fundsRequiredInWei) {
            revert Campaign__AlreadyFunded();
        }

        idToCampaign[_id].fundsReceivedInWei += msg.value;
        temp.fundsReceivedInWei += msg.value;

        if (temp.fundsReceivedInWei > temp.fundsRequiredInWei) {
            (bool success, ) = payable(msg.sender).call{
                value: temp.fundsReceivedInWei - temp.fundsRequiredInWei
            }("");
            if (!success) {
                revert Campaign__CouldntRefund();
            }
            idToCampaign[_id].fundsReceivedInWei =temp.fundsRequiredInWei;

        }

        fundCounter++;
        publicFundActivator();
    }

    function fundPublicFund() external payable {
        publicFundBalance += msg.value;
        fundCounter++;
        publicFundActivator();
    }

    function withdrawFunds(uint _id) public {
        Campaign memory temp = idToCampaign[_id];
        if (temp.campaignCreatorAddress != msg.sender){
            revert Campaign__NotSlickEnough();
        }
        else{

            if(temp.fundsReceivedInWei < temp.fundsWithdrawnInWei){
                revert Campaign__NotSlickEnough();
            }
            else{
            (bool success, ) = payable(msg.sender).call{value:temp.fundsReceivedInWei-temp.fundsWithdrawnInWei}("");
            if (!success) {
                revert Campaign__TransactionFailed();
            }
        idToCampaign[_id].fundsWithdrawnInWei = temp.fundsReceivedInWei - temp.fundsWithdrawnInWei;
        } 

    }

    }


    receive() external payable {}

    fallback() external payable {}
}
