var fs = require("fs");
const axios = require('axios'); //npm install axios

var text = fs.readFileSync("./categories.txt");
var textByLine = text.toString().split("\n")
const url='http://localhost:3000/categories/';
var array = [];

var config = {
    headers: {'Content-Type': 'application/xml'}
};
var send = '<Items>
' + '<Item>
' + '    <Name>Precious Moments Fig-ANGEL OF MERCY- NURSE</Name>
' + '    <Category>Collectibles</Category>
' + '    <Category>Decorative &amp; Holiday</Category>
' + '    <Category>Decorative by Brand</Category>
' + '    <Category>Enesco</Category>
' + '    <Category>Precious Moments</Category>
' + '    <Currently>28.00</Currently>
' + '    <First_Bid>9.99</First_Bid>
' + '    <Number_of_Bids>6</Number_of_Bids>
' + '    <Bids>
' + '      <Bid>
' + '<Bidder><UserID>nobody138</UserID>
' + '<Rating>427</Rating>
' + '          <Location>GOD BLESS AMERICA, FROM SOUTH, MS</Location>
' + '          <Country>USA</Country>
' + '        </Bidder>
' + '    <Time>2019-9-25T10:10:18.652Z</Time>
' + '        <Amount>12.99</Amount>
' + '      </Bid>
' + '      <Bid>
' + '<Bidder><UserID>danielhb2000</UserID>
' + '<Rating>1</Rating>
' + '          <Location>Huntington Beach, Ca.</Location>
' + '          <Country>USA</Country>
' + '        </Bidder>
' + '    <Time>2019-9-25T10:10:18.652Z</Time>
' + '        <Amount>15.99</Amount>
' + '      </Bid>
' + '      <Bid>
' + '<Bidder><UserID>boncon123</UserID>
' + '<Rating>106</Rating>
' + '          <Location>Northern Ireland</Location>
' + '          <Country>United Kingdom</Country>
' + '        </Bidder>
' + '    <Time>2019-9-25T10:10:18.652Z</Time>
' + '        <Amount>18.99</Amount>
' + '      </Bid>
' + '      <Bid>
' + '<Bidder><UserID>watchdenmark</UserID>
' + '<Rating>37</Rating>
' + '          <Location>Munich</Location>
' + '          <Country>Germany</Country>
' + '        </Bidder>
' + '    <Time>2019-9-25T10:10:18.652Z</Time>
' + '        <Amount>22.00</Amount>
' + '      </Bid>
' + '      <Bid>
' + '<Bidder><UserID>mrwvh</UserID>
' + '<Rating>92</Rating>
' + '          <Location>Bryan, TX</Location>
' + '          <Country>USA</Country>
' + '        </Bidder>
' + '    <Time>2019-9-25T10:10:18.652Z</Time>
' + '        <Amount>25.00</Amount>
' + '      </Bid>
' + '      <Bid>
' + '<Bidder><UserID>allyw1</UserID>
' + '<Rating>15</Rating>
' + '          <Location>New York</Location>
' + '          <Country>USA</Country>
' + '        </Bidder>
' + '    <Time>2019-9-25T10:10:18.652Z</Time>
' + '        <Amount>28.00</Amount>
' + '      </Bid>
' + '    </Bids>
' + '<Location>Missouri The Show Me State</Location>
' + '<Latitude>38.638318</Latitude>
' + '<Longitude>-90.427118</Longitude>
' + '    <Country>USA</Country>
' + '    <Started>2019-08-25T10:10:18.652Z</Started>
' + '    <Ends>2019-11-25T10:10:18.652Z</Ends>
' + '<Seller><UserID>lwm123</UserID>
' + '<Rating>813</Rating>
' + '</Seller>
' + '    <Description>Precious Moments Fig-ANGEL OF MERCY- NURSE Click picture to enlarge Makes a great gift for Collectors Description Up for bids is this great figurine from Precious Moments. It is #102482, ANGEL OF MERCY. It is a 5 1/2 inch figurine of an angel nurse. She is carrying a plant. It is really cute, just look at the pictures. It was released in 1986. This figurine bears the FIRST production mark of the Olive Branch. It is in EXCELLENT condition. It has only been displayed in a glass case and comes in its original box with all production tags included. The bidding starts at 9.99 with NO RESERVE!!! THANK YOU FOR LOOKING AND HAPPY BIDDING!!!!!!!!!!!!!! US Shipping is 5.60 for Priority Mail with tracking. International shipping, including Canada, is different depending on destination. International bidders, including Canada, must pay through Pay Pal or in US Cash. Email with any questions. Insurance, if desired, is extra. 0-50.=1.10 - 51.-100.=2.00 -101.-200.=3.00 - 201 - 250.=4.00. Winning bidder must make contact within 3 days and payment must be received witin 10 days (21 days for international winners) or Ebay will be contacted and item relisted. If you don't intend to complete the transaction, Please Don't Bid. Details Click picture to enlarge Condition Excellent This item is in EXCELLENT condition it has only been displayed in a glass case. It comes in its original box with all production tags included!!!!! Payment and Shipping Info Payment Options Money Order/Cashier's Check or Personal Check _ _ _ Shipping Fixed Shipping Charges.5.60 (Domestic) Will Ship Internationally Quantity Available 1 Special! PLEASE CLICK THE LINK BELOW TO VIEW MY OTHER ITEMS. It Shows ALL My Auctions!!!...I have many quality Precious Moments Figurines and Dolls up for bids with values up to 250.00....ALL with starting bids of 9.99 or less and ALL with NO RESERVE!!!...CHECK THEM OUT!!!!!.... Combine auctions and SAVE on shipping!!!...I accept Pay Pal, Money Orders and Personal Checks. Please note there is 10 day hold on shipping till Personal Checks clear. Click picture to enlarge _ Click picture to enlarge _ Click picture to enlarge _ Click picture to enlarge _ Click picture to enlarge _ Use the REAL selling tools a million sellers do - Andale!</Description>
' + '  </Item>
' + '</Items>
';
axios.post(url, send, config)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
return;
var lines = textByLine;
    for(var line = 0; line < lines.length; line++){
        //console.log(lines[line]);
        if (!array.includes(lines[line]))
        {
            axios.post(url, lines[line], config)
            .then(res => {
                console.log(lines[line]);
                //console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
            array.push(lines[line]);
        }
    }