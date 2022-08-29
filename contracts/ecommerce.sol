// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0 <0.9.0;


contract ecommerce{
    struct product{
        string title;
        string desc;
        uint price;
        address buyer;
        address payable seller;
        uint  productId;
        bool delivered;
    }

    product[] public allProducts;
    uint public count = 1;

    event registered(string title, address seller, uint productId);
    event bought(uint productId, address buyer);
    event delivered(uint productId);

    function registerProduct(string memory _title, string memory _desc, uint _price) public {
        require(_price > 0, "Product price greater than 0");
        product memory tempProduct;
        tempProduct.title = _title;
        tempProduct.desc = _desc;
        tempProduct.price = _price * 10**18;
        tempProduct.seller = payable(msg.sender);
        tempProduct.productId = count;
        allProducts.push(tempProduct);
        count++;
        emit registered(_title, msg.sender, tempProduct.productId);

    }

    function buy(uint _productId) public payable {
        require(allProducts[_productId - 1].price == msg.value, "Please send Exact Price");
        require(allProducts[_productId - 1].seller != msg.sender, "Seller are not buy Product");
        emit bought(_productId,msg.sender);

    }

    function delivery(uint _productId) public {
        require(allProducts[_productId - 1].seller == msg.sender, "Only Seller Confirm It.");
        allProducts[_productId - 1].delivered = true;
        allProducts[_productId - 1].seller.transfer(allProducts[_productId - 1].price);
        emit delivered(_productId);

    }
}