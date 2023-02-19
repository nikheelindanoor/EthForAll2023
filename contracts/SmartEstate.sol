// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SmartEstate is ERC721URIStorage {
    address owner;
    using Counters for Counters.Counter;
    Counters.Counter private rentIds;

    struct Payment {
        uint256 rentId;
        uint256 amount;
        uint256 date;
    }

    struct RentAggrement {
        uint256 plotId;
        uint256 renterId;
        uint256 startDate;
        uint256 endDate;
        uint256 rentAmount;
        string description;
        string cid;
    }

    struct User {
        uint256 userId;
        address userAdd;
        string name;
        string mobileNo;
        string aadhaar;
        string aadhaarCID;
    }

    struct Plot {
        uint256 id;
        uint256 creatorId;
        string name;
        string realAdd;
        string xCor;
        string yCor;
        uint256 totalQuantity;
        uint256 availableStocks;
        uint256 price;
        bool rented;
        uint256 rentAmount;
    }

    struct Transaction {
        uint256 source;
        uint256 target;
        uint256 quantity;
        uint256 price;
        uint256 timestamp;
        uint256 plotId;
        int8 state; // 0:PENDING / 1:VALIDATED / 2:REJECTED
    }

    struct Stocks {
        uint256 userId;
        uint256 plotId;
        uint256 quantity;
        uint256 sellable;
        uint256 price;
    }

    uint256 transactionCount;
    uint256 plotCount;
    uint256 plotRequestCount;
    uint256 userCount;
    uint256 userRequestCount;
    uint256 stockCount;
    uint256 paymentCount;

    mapping(uint256 => RentAggrement) rentAggrements;
    mapping(uint256 => Payment) private payments;

    mapping(uint256 => User) users;
    mapping(uint256 => User) userRequests;
    mapping(uint256 => Transaction) transactions;
    mapping(uint256 => Plot) plots;
    mapping(uint256 => Plot) plotRequests;
    mapping(uint256 => Stocks) stocks;

    mapping(address => uint256) userAddressToIdMapping;

    constructor() ERC721("fdjkls", "jlks") {
        owner = msg.sender;
    }

    function isOwner() public view returns (bool) {
        return owner == msg.sender;
    }

    function checkAvailableStocksForSeller(
        uint256 stockId,
        uint256 sellable
    ) public view returns (bool) {
        if (stocks[stockId].sellable + sellable <= stocks[stockId].quantity)
            return true;
        else return false;
    }

    function checkAvailableStocksForBuyer(
        uint256 stockId,
        uint256 buyable
    ) public view returns (bool) {
        if (stocks[stockId].sellable - buyable >= 0) return true;
        else return false;
    }

    function compareStrings(
        string memory _string1,
        string memory _string2
    ) public pure returns (bool) {
        return (keccak256(abi.encodePacked((_string1))) ==
            keccak256(abi.encodePacked((_string2))));
    }

    function registerUser(
        address userAdd,
        string memory name,
        string memory mobileNo,
        string memory aadhaar,
        string memory aadhaarCID
    ) public {
        userRequests[userRequestCount] = User({
            userId: userRequestCount,
            userAdd: userAdd,
            name: name,
            mobileNo: mobileNo,
            aadhaar: aadhaar,
            aadhaarCID: aadhaarCID
        });

        userRequestCount += 1;
    }

    // FETCH USER FUCNTIONS

    function fetchUserByAddress(
        address addr
    ) public view returns (User memory) {
        for (uint256 i = 0; i < userCount; i++) {
            if (users[i].userAdd == addr) {
                return users[i];
            }
        }
        revert();
    }

    function fetchAllUsers() public view returns (User[] memory) {
        User[] memory userList = new User[](userCount);

        for (uint256 i = 0; i < userCount; i++) {
            User storage tempUser = users[i];
            userList[i] = tempUser;
        }

        return userList;
    }

    // FETCH USER REQUESTS FUNCTIONS

    // function fetchUserRequestByAddress(
    //     address addr
    // ) public view returns (User memory) {
    //     for (uint256 i = 0; i < userRequestCount; i++) {
    //         if (userRequests[i].userAdd == addr) {
    //             return userRequests[i];
    //         }
    //     }
    //     revert();
    // }

    function fetchAllUserRequests() public view returns (User[] memory) {
        User[] memory userRequestList = new User[](userRequestCount);

        for (uint256 i = 0; i < userRequestCount; i++) {
            User storage tempUserRequest = userRequests[i];
            userRequestList[i] = tempUserRequest;
        }

        return userRequestList;
    }

    //  FETCH FOR PLOTS & REQUESTS

    function fetchAllPlotRequests() public view returns (Plot[] memory) {
        Plot[] memory plotRequestList = new Plot[](plotRequestCount);

        for (uint256 i = 0; i < plotRequestCount; i++) {
            Plot storage tempPlotRequest = plotRequests[i];
            plotRequestList[i] = tempPlotRequest;
        }

        return plotRequestList;
    }

    function fetchUserPlots(
        address userAdd
    ) public view returns (Plot[] memory) {
        uint256 count;

        for (uint256 i = 0; i < plotCount; i++) {
            if (plots[i].creatorId == userAddressToIdMapping[userAdd]) {
                count += 1;
            }
        }

        Plot[] memory plotList = new Plot[](count);
        count = 0;

        for (uint256 i = 0; i < plotCount; i++) {
            if (plots[i].creatorId == userAddressToIdMapping[userAdd]) {
                Plot storage tempPlot = plots[i];
                plotList[count] = tempPlot;
                count += 1;
            }
        }

        return plotList;
    }

    function fetchAllPlots() public view returns (Plot[] memory) {
        Plot[] memory plotList = new Plot[](plotCount);

        for (uint256 i = 0; i < plotCount; i++) {
            Plot storage tempPlot = plots[i];
            plotList[i] = tempPlot;
        }

        return plotList;
    }

    function fetchPlotById(uint256 plotId) public view returns (Plot memory) {
        require(plotId < plotCount, "No plot exists");
        return plots[plotId];
    }

    // FETCH FOR TRANSACTION & REQUESTS

    function fetchAllTransactions() public view returns (Transaction[] memory) {
        Transaction[] memory transactionList = new Transaction[](
            transactionCount
        );

        for (uint256 i = 0; i < plotCount; i++) {
            Transaction storage tempTransaction = transactions[i];
            transactionList[i] = tempTransaction;
        }

        return transactionList;
    }

    function addPlot(
        string memory name,
        string memory realAdd,
        string memory xCor,
        string memory yCor,
        uint256 totalQuantity,
        uint256 availableStocks,
        uint256 price,
        uint256 rentAmount
    ) public {
        plotRequests[plotRequestCount] = Plot({
            id: plotRequestCount,
            creatorId: userAddressToIdMapping[msg.sender],
            name: name,
            realAdd: realAdd,
            xCor: xCor,
            yCor: yCor,
            totalQuantity: totalQuantity,
            availableStocks: availableStocks,
            price: price,
            rented: false,
            rentAmount: rentAmount
        });
        plotRequestCount += 1;
    }

    function verifyUser(address userAdd) public {
        users[userCount] = userRequests[userAddressToIdMapping[userAdd]];
        users[userCount].userId = userCount;

        userRequests[userAddressToIdMapping[userAdd]] = userRequests[
            userRequestCount - 1
        ];
        userAddressToIdMapping[
            userRequests[userRequestCount - 1].userAdd
        ] = userAddressToIdMapping[userAdd];

        userAddressToIdMapping[userAdd] = userCount;
        userCount += 1;

        delete userRequests[userRequestCount - 1];
        userRequestCount -= 1;
    }

    function rejectUser(address userAdd) public {
        userRequests[userAddressToIdMapping[userAdd]] = userRequests[
            userRequestCount - 1
        ];
        userAddressToIdMapping[
            userRequests[userRequestCount - 1].userAdd
        ] = userAddressToIdMapping[userAdd];

        delete userRequests[userRequestCount - 1];
        userRequestCount -= 1;
    }

    function rejectPlot(uint256 plotId) public {
        plotRequests[plotId] = plotRequests[plotRequestCount - 1];

        delete plotRequests[plotRequestCount - 1];
        plotRequestCount -= 1;
    }

    function acceptPlot(uint256 plotId) public {
        plots[plotCount] = plotRequests[plotId];
        plots[plotCount].id = plotCount;

        stocks[stockCount] = Stocks({
            userId: userAddressToIdMapping[msg.sender],
            plotId: plotCount,
            quantity: plots[plotCount].totalQuantity,
            sellable: plots[plotCount].availableStocks,
            price: plots[plotCount].price
        });
        // 1- 100, 80

        stockCount += 1;
        plotCount += 1;

        plotRequests[plotId] = plotRequests[plotRequestCount - 1];

        delete plotRequests[plotRequestCount - 1];
        plotRequestCount -= 1;
    }

    function updateSellableStocks(uint256 stockId, uint256 sellable) public {
        stocks[stockId].sellable += sellable;
    }

    function updateStockPrice(uint256 stockId, uint256 price) public {
        stocks[stockId].price = price;
    }

    function updateBuyableStocks(uint256 stockId, uint256 buyable) public {
        stocks[stockId].sellable -= buyable;
        stocks[stockId].quantity -= buyable;
        // 1 100 80-30=50
    }

    function createTransaction(
        uint256 source,
        uint256 target,
        uint256 quantity,
        uint256 price,
        uint256 timestamp,
        uint256 plotId
    ) public returns (uint256) {
        transactions[transactionCount] = Transaction({
            source: source,
            target: target,
            quantity: quantity,
            price: price,
            timestamp: timestamp,
            plotId: plotId,
            state: 0
        });

        transactionCount += 1;
        return transactionCount - 1;
    }

    function validateTransaction(uint256 transacId) public {
        if (transactions[transacId].state == 0)
            transactions[transacId].state = 1;
    }

    function rejectTransaction(uint256 transacId) public {
        if (transactions[transacId].state == 0)
            transactions[transacId].state = 2;
    }

    // REQUEST TO BUY
    function requestToBuyStocks(
        address target,
        uint256 quantityToBuy,
        uint256 price,
        uint256 plotId,
        uint256 sellQuantity
    ) public {}

    function buyStocks(
        uint256 stockId,
        address target,
        uint256 quantityToBuy,
        uint256 price,
        uint256 plotId,
        uint256 sellQuantity
    ) public {
        uint256 transacId = createTransaction(
            userAddressToIdMapping[msg.sender],
            userAddressToIdMapping[target],
            quantityToBuy,
            price,
            block.timestamp,
            plotId
        );
        if (!checkAvailableStocksForBuyer(stockId, quantityToBuy))
            rejectTransaction(transacId);
        else {
            uint256 i = 0;
            for (i = 0; i < stockCount; i++) {
                if (stocks[i].userId == userAddressToIdMapping[msg.sender]) {
                    if (stocks[i].quantity + quantityToBuy > sellQuantity) {
                        stocks[i].quantity += quantityToBuy;
                        stocks[i].sellable += quantityToBuy;
                        updateBuyableStocks(stockId, quantityToBuy);
                        validateTransaction(transacId);
                    } else {
                        rejectTransaction(transacId);
                    }
                }
            }
            if (i == stockCount) {
                if (quantityToBuy > sellQuantity) {
                    updateBuyableStocks(stockId, quantityToBuy);
                    stocks[stockCount] = Stocks({
                        userId: userAddressToIdMapping[msg.sender],
                        plotId: plotId,
                        quantity: quantityToBuy,
                        sellable: sellQuantity,
                        price: plots[plotId].price
                    });
                    stockCount += 1;
                    validateTransaction(transacId);
                } else {
                    rejectTransaction(transacId);
                }
            }
        }
    }

    // Owner of plot transfers ownership in the form of some stocks

    function transferOwnershipOfStocks(
        uint256 stockId,
        address target,
        uint256 quantityToSell,
        uint256 price,
        uint256 plotId,
        uint256 sellQuantity
    ) public {
        uint256 transacId = createTransaction(
            userAddressToIdMapping[msg.sender],
            userAddressToIdMapping[target],
            quantityToSell,
            price,
            block.timestamp,
            plotId
        );
        if (!checkAvailableStocksForBuyer(stockId, quantityToSell))
            rejectTransaction(transacId);
        else {
            uint256 i = 0;
            for (i = 0; i < stockCount; i++) {
                if (stocks[i].userId == userAddressToIdMapping[msg.sender]) {
                    if (stocks[i].quantity + quantityToSell > sellQuantity) {
                        stocks[i].quantity += quantityToSell;
                        stocks[i].sellable += quantityToSell;
                        updateBuyableStocks(stockId, quantityToSell);
                        validateTransaction(transacId);
                    } else {
                        rejectTransaction(transacId);
                    }
                }
            }
            if (i == stockCount) {
                if (quantityToSell > sellQuantity) {
                    updateBuyableStocks(stockId, quantityToSell);
                    stocks[stockCount] = Stocks({
                        userId: userAddressToIdMapping[msg.sender],
                        plotId: plotId,
                        quantity: quantityToSell,
                        sellable: sellQuantity,
                        price: plots[plotId].price
                    });
                    stockCount += 1;
                    validateTransaction(transacId);
                } else {
                    rejectTransaction(transacId);
                }
            }
        }
    }

    function fetchAllStocksForPlot(
        uint256 plotId
    ) public view returns (Stocks[] memory) {
        uint256 count;

        for (uint256 i = 0; i < stockCount; i++) {
            if (stocks[i].plotId == plotId) {
                count += 1;
            }
        }

        Stocks[] memory stockList = new Stocks[](count);
        count = 0;

        for (uint256 i = 0; i < stockCount; i++) {
            if (stocks[i].plotId == plotId) {
                Stocks storage tempStock = stocks[i];
                stockList[count] = tempStock;
                count += 1;
            }
        }
        return stockList;
    }

    function fetchAllStocksForUser(
        address userAdd
    ) public view returns (Stocks[] memory) {
        uint256 count;
        for (uint256 i = 0; i < stockCount; i++) {
            if (stocks[i].userId == userAddressToIdMapping[userAdd]) {
                count += 1;
            }
        }
        Stocks[] memory stockList = new Stocks[](count);
        count = 0;

        for (uint256 i = 0; i < stockCount; i++) {
            if (stocks[i].userId == userAddressToIdMapping[userAdd]) {
                Stocks storage tempStock = stocks[i];
                stockList[count] = tempStock;
                count += 1;
            }
        }
        return stockList;
    }

    function mint(
        uint256 plotId,
        uint256 months,
        uint256 rentAmount,
        string memory description,
        string memory cid
    ) public {
        rentIds.increment();
        uint256 newRentId = rentIds.current();

        _mint(msg.sender, newRentId);
        _setTokenURI(newRentId, cid);

        rentAggrements[newRentId] = RentAggrement({
            plotId: plotId,
            renterId: userAddressToIdMapping[msg.sender],
            startDate: block.timestamp,
            endDate: block.timestamp + months * 30 days,
            rentAmount: rentAmount,
            description: description,
            cid: cid
        });

        plots[plotId].rented = true;
    }

    function updateRentPrice(uint256 plotId, uint256 rentAmount) public {
        plots[plotId].rentAmount = rentAmount;
    }

    function fetchAllRentAggrements(
        uint256 userId
    ) public view returns (RentAggrement[] memory) {
        uint256 count = 0;
        uint256 totalCount = rentIds.current();
        for (uint256 i = 1; i <= totalCount; i++) {
            if (rentAggrements[i].renterId == userId) {
                count += 1;
            }
        }

        RentAggrement[] memory result = new RentAggrement[](count);
        count = 0;
        for (uint256 i = 1; i <= totalCount; i++) {
            if (rentAggrements[i].renterId == userId) {
                RentAggrement storage curr = rentAggrements[i];
                result[count] = curr;
                count += 1;
            }
        }

        return result;
    }

    function fetchAllUserPayments(
        uint256 userId
    ) public view returns (Payment[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= paymentCount; i++) {
            if (rentAggrements[payments[i].rentId].renterId == userId) {
                count += 1;
            }
        }

        Payment[] memory result = new Payment[](count);
        count = 0;
        for (uint256 i = 1; i <= paymentCount; i++) {
            if (rentAggrements[payments[i].rentId].renterId == userId) {
                Payment storage curr = payments[i];
                result[count] = curr;
                count += 1;
            }
        }

        return result;
    }

    function payRent(uint256 rentId) public payable {
        require(
            msg.value >= rentAggrements[rentId].rentAmount,
            "Please give the minimum amount needed!"
        );
        uint256 i = paymentCount - 1;
        for (; i >= 0; i--) {
            if (
                rentId == payments[i].rentId &&
                userAddressToIdMapping[msg.sender] ==
                rentAggrements[payments[i].rentId].renterId
            ) {
                break;
            }
        }

        if (block.timestamp - payments[i].date < 30) {
            revert();
        }

        // TODO: pay individual owner their rent share
        for (i = 0; i < stockCount; i++) {
            if (stocks[i].plotId == rentAggrements[rentId].plotId) {
                payable(address(this)).transfer(
                    (stocks[i].quantity /
                        plots[stocks[i].plotId].totalQuantity) * msg.value
                );
                payable(users[stocks[i].userId].userAdd).transfer(
                    (stocks[i].quantity /
                        plots[stocks[i].plotId].totalQuantity) * msg.value
                );
            }
        }

        payments[paymentCount++] = Payment({
            rentId: rentId,
            date: block.timestamp,
            amount: msg.value
        });
    }

    function fetchRentAggrementById(
        uint256 rentId
    ) public view returns (RentAggrement memory) {
        return rentAggrements[rentId];
    }

    function fetchAllPaymentByRentID(
        uint256 rentId
    ) public view returns (Payment[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= paymentCount; i++) {
            if (payments[i].rentId == rentId) {
                count += 1;
            }
        }

        Payment[] memory result = new Payment[](count);
        count = 0;
        for (uint256 i = 1; i <= paymentCount; i++) {
            if (payments[i].rentId == rentId) {
                Payment storage curr = payments[i];
                result[count] = curr;
                count += 1;
            }
        }

        return result;
    }
}
