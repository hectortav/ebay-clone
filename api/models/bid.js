const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
	bidder: { type: mongoose.Schema.Types.ObjectId, red: 'Bidder' , required: true},
	time: {type: Date, required: true },
	amount: {type: Number, required: true },
});

module.exports = mongoose.model('Bid', productSchema);

/*
<!ELEMENT Items (Item*)>
<!ELEMENT Item (Name, Category+, Currently,
Buy_Price?,First_Bid, Number_of_Bids,Bids, Location, Country, Started, Ends,
Seller, Description)>
<!ATTLIST Item ItemID CDATA #REQUIRED>
<!ELEMENT Name (#PCDATA)>
<!ELEMENT Category (#PCDATA)>
<!ELEMENT Currently (#PCDATA)>
<!ELEMENT Buy_Price (#PCDATA)>
<!ELEMENT First_Bid (#PCDATA)>
<!ELEMENT Number_of_Bids (#PCDATA)>
<!ELEMENT Bids (Bid*)>
<!ELEMENT Bid (Bidder, Time, Amount)>
<!ATTLIST Bidder UserID CDATA #REQUIRED Rating CDATA
#REQUIRED>
<!ELEMENT Bidder (Location?, Country?)>
<!ELEMENT Time (#PCDATA)>
<!ELEMENT Amount (#PCDATA)>
<!ELEMENT Location (#PCDATA)>
<!ATTLIST Location Latitude CDATA #IMPLIED
Longitude CDATA #IMPLIED>
<!ELEMENT Country (#PCDATA)>
<!ELEMENT Started (#PCDATA)>
<!ELEMENT Ends (#PCDATA)>
<!ELEMENT Seller EMPTY>
<!ATTLIST Seller UserID CDATA #REQUIRED
Rating CDATA #REQUIRED>
<!ELEMENT Description (#PCDATA)>
*/

/*
<Item ItemID="1675506221">
<Name>Tommy Hilfiger jeans boy's 18-24 M (months)</Name>
<Category>Clothing &amp; Accessories</Category>
<Category>Infants</Category>
<Category>Clothing</Category>
<Category>12-24 Months</Category>
<Category>Bottoms</Category>
<Currently>$7.50</Currently>
<First_Bid>$7.00</First_Bid>
<Number_of_Bids>2</Number_of_Bids>
<Bids>
<Bid>
<Bidder Rating="229" UserID="danobody">
<Location>Sydney</Location>
<Country>Australia</Country>
</Bidder>
<Time>Dec-10-01 08:21:26</Time>
<Amount>$7.25</Amount>
</Bid>
<Bid>
<Bidder Rating="1006" UserID="dsage39564@aol.com">
<Location>New York</Location>
<Country>USA</Country>
</Bidder>
<Time>Dec-11-01 17:57:26</Time>
<Amount>$7.50</Amount>
</Bid>
</Bids>
<Location>JOHNNA'S QUALITY BARGAINS</Location>
<Country>USA</Country>
<Started>Dec-08-01 22:45:26</Started>
<Ends>Dec-15-01 22:45:26</Ends>
<Seller Rating="117" UserID="thewillsons-lufkin" />
<Description>This is a really nice pair of Tommy Hilfiger denim jeans
</Description>
</Item>
*/
