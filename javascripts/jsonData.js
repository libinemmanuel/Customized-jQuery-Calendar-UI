var dummyJson = "";
$(function () {

	function getTimestamp(dayDiff)
	{
		var myDate = new Date();
		return myDate.setDate(myDate.getDate() + dayDiff);
	}
	
	dummyJson = [{
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(0)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(1)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(2)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 1,
        "Date": "/Date("+getTimestamp(3)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "CasualBooking",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(4)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": false,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(5)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": false,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(6)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": true,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(7)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(8)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(9)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(10)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(11)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": false,
        "DayStatus": "NoProgram",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(12)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": false,
        "DayStatus": "NoProgram",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(13)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": true,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(14)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": true,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(15)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": true,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(16)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": true,
        "IsRoomOpen": true,
        "DayStatus": "Full",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(17)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(18)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": false,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(19)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": false,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(20)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(21)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(22)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(23)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(24)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "PermanentBooking",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
       "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(25)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": false,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(26)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": false,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }, {
        "CasualBooking_id": 0,
        "Date": "/Date("+getTimestamp(27)+")/",
        "PlaceLimit": 25,
        "AvailSpaces": 17,
        "IsFull": false,
        "IsRoomOpen": true,
        "DayStatus": "Available",
        "DisplayNote": "Test Values",
        "RefundDayLimit": 2,
        "IsOffered": false,
        "SecurityModel": 5,
        "ParentSecurityModel": 5
    }];
});	