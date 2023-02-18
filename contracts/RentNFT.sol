// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.7;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// contract RentNFT {
//     using Counters for Counters.Counter;
//     Counters.Counter private rentIds;

//     struct Payment {
//         uint256 rentId;
//         uint256 amount;
//         uint256 date;
//     }

//     struct RentAggrement {
//         uint256 plotId;
//         uint256 renterId;
//         uint256 startDate;
//         uint256 endDate;
//         uint256 rentAmount;
//         string description;
//         string cid;
//     }

//     uint256 paymentCount;

//     mapping(uint256 => RentAggrement) rentAggrements;
//     mapping(uint256 => Payment) private payments;

//     constructor() ERC721("fdjkls", "jlks") {}

//     function mint(
//         uint256 plotId,
//         uint256 renterId,
//         uint256 months,
//         uint256 rentAmount,
//         string memory description,
//         string memory cid
//     ) pubilc {
//         rentIds.increment();
//         uint256 newRentId = rentIds.current();

//         _mint(msg.sender, newRentId);
//         _setTokenURI(newRentId, cid);

//         rentAggrements[newRentId] = RentAggrement({
//             plotId: plotId,
//             renterId: userAddressToIdMapping[msg.sender],
//             startDate: block.timestamp,
//             endDate: block.timestamp + months * 30 days,
//             description: description,
//             cid: cid
//         });
//     }

//     function fetchAllRentAggrements(
//         uint256 userId
//     ) public view returns (RentAggrement[] memory) {
//         uint256 count = 0;
//         uint256 totalCount = rentIds.current();
//         for (uint256 i = 1; i <= totalCount; i++) {
//             if (rentAggrements[i].renterId == userId) {
//                 count += 1;
//             }
//         }

//         RentAggrement[] memory result = new RentAggrement[](count);
//         count = 0;
//         for (uint256 i = 1; i <= totalCount; i++) {
//             if (rentAggrements[i].renterId == userId) {
//                 RentAggrement storage curr = rentAggrements[i];
//                 result[count] = curr;
//                 count += 1;
//             }
//         }

//         return result;
//     }

//     function fetchAllUserPayments(
//         uint256 userId
//     ) public view returns (Payment[] memory) {
//         uint256 count = 0;
//         for (uint256 i = 1; i <= paymentCount; i++) {
//             if (rentAggrements[paymentCount[i].rentId].renterId == userId) {
//                 count += 1;
//             }
//         }

//         Payment[] memory result = new Payment[](count);
//         count = 0;
//         for (uint256 i = 1; i <= totalCount; i++) {
//             if (rentAggrements[paymentCount[i].rentId].renterId == userId) {
//                 Payment storage curr = payments[i];
//                 result[count] = curr;
//                 count += 1;
//             }
//         }

//         return result;
//     }

//     function payRent(uint256 rentId) public payable {
//         require(
//             msg.value >= rentAggrements[rentId].rentAmount,
//             "Please give the minimum amount needed!"
//         );
//         uint256 i = paymentCount - 1;
//         for (; i >= 0; i--) {
//             if (
//                 rentId == payments[i].rentId &&
//                 userAddressToIdMapping[msg.sender] ==
//                 rent[payments[i].rentId].renterId
//             ) {
//                 break;
//             }
//         }

//         if (block.timestamp - payments[i].date < 30) {
//             revert();
//         }

//         // TODO: pay individual owner their rent share
//         for (uint256 i = 0; i < stockCount; i++) {
//             if (stocks[i].plotId == rentAggrements[rentId].plotId) {
//                 payable(address(this)).transfer(
//                     (stocks[i].quantity /
//                         plots[stocks[i].plotId].totalQuantity) * msg.value
//                 );
//                 payable(users[stocks[i].userId].userAdd).transfer(
//                     (stocks[i].quantity /
//                         plots[stocks[i].plotId].totalQuantity) * msg.value
//                 );
//             }
//         }

//         payments[paymentCount++] = Payment({
//             rentId: rentId,
//             date: block.timeStamp,
//             amount: msg.value
//         });
//     }

//     function fetchRentAggrementById(
//         uint256 rentId
//     ) public view returns (RentAggrement memory) {
//         return rentAggrements[rentId];
//     }

//     function fetchAllPaymentByRentID(
//         uint256 rentId
//     ) public view returns (Payment[] memory) {
//         uint256 count = 0;
//         for (uint256 i = 1; i <= paymentCount; i++) {
//             if (paymentCount[i].rentId == rentId) {
//                 count += 1;
//             }
//         }

//         Payment[] memory result = new Payment[](count);
//         count = 0;
//         for (uint256 i = 1; i <= totalCount; i++) {
//             if (paymentCount[i].rentId == rentId) {
//                 Payment storage curr = payments[i];
//                 result[count] = curr;
//                 count += 1;
//             }
//         }

//         return result;
//     }
// }
