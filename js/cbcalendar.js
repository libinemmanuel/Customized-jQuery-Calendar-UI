/* Author : Libin Emmanuel */

cbcalendar = {
    userRole: "parent", //values:staff,parent 
    dayLimit: 2, //Number of days where canceling is allowed.
    datesArray: "", //initial data.
    selectedDates: [], //temporary storage of selected dates.
    selectedDatesStorage: [], //contains all modified date details.
    startDate: "", //selected month starting date 
    endDate: "", //selected month ending date
    calMaxDate: "+48M", //maximum number of months allowed
    calDateFormat: "mm/dd/yy", // calendar date format 
    isSaved: true,
    availableSpot: "#cx_available_spot",
    roomCapacity: "#cx_room_capacity",
    DisplayNote: "#cx_display_note",
    flagOpen: "Open",
    flagClosed: "Closed",
    messageSelected: "Selected",
    messageAvailable: "Available",
    messageNoprogram: "No program",
    messageSceduled: "Scheduled",
    messageFull: "Full",
    initializeCalendar: function () {
        cbcalendar.createCalendar();

        if (cbcalendar.userRole == "staff") {
            $(".onlyfor_staff").show();
        } else if (cbcalendar.userRole == "parent") {
            $(".only_for_parent").show();
            $("#cx_display_note").attr('readonly', 'readonly');
        }
    },
    updateHeader: function () {
        $('.cbcalendar_header .ui-datepicker-header').remove();
        $('.ui-datepicker-header').insertAfter('.cbcalendar_header_inner');
    },
    createCalendar: function () {
        $("#cbcalendar").datepicker({
            dateFormat: cbcalendar.calDateFormat,
            minDate: 0,
            maxDate: cbcalendar.calMaxDate,
            firstDay: 1,
            onChangeMonthYear: function (year, month, obj) {
                cbcalendar.startDate = cbcalendar.formatDate(new Date(year, (month - 1), 1));
                cbcalendar.endDate = cbcalendar.formatDate(new Date(year, month, 0));
                console.log(cbcalendar.startDate + " : " + cbcalendar.endDate)
                cbcalendar.clearChanges();
                setTimeout(function () {
                    cbcalendar.updateHeader();
                }, 50);
            },
            onSelect: function (date, object) {
                cbcalendar.addToSelectedArray(object);
                cbcalendar.populateContextMenu();

                if (cbcalendar.userRole == "parent") {
                	
                	
                    
                    
                    if (cbcalendar.selectedDates.length > 0) {
                    	
                    	var buttonText = "",
                        buttonClass = "",
                        dayDifference = cbcalendar.daysBetween(new Date(), new Date(date)),
                    	dayDifferenceAd = dayDifference+1,
                    	RefundDayLimit = cbcalendar.selectedDates[0].RefundDayLimit,
                    	bookingId = cbcalendar.selectedDates[0].CasualBooking_id;
                    	console.log(bookingId);
                    	
                    	
                        if (cbcalendar.selectedDates[0].DayStatus == "Available") {
                            buttonText = "Book";
                            buttonClass = "book";
                        }
                        if (cbcalendar.selectedDates[0].DayStatus == "CasualBooking" && (RefundDayLimit < dayDifferenceAd)) {
                            buttonText = "Cancel booking";
                            buttonClass = "cancel";
                        }
                        
                        if (cbcalendar.selectedDates[0].DayStatus == "CasualBooking" && (RefundDayLimit >= dayDifferenceAd)) 
                        {
                        	if(bookingId == 0)
                        	{
                        		buttonText = "Cancel booking";
                                buttonClass = "cancel";
                        	}
                        	else
                        	{
	                            buttonText = "Absent";
	                            buttonClass = "absent";
                        	}	
                        }
                        if (cbcalendar.selectedDates[0].DayStatus == "Absence") {
                            buttonText = "Book";
                            buttonClass = "book";
                        }

                        $("#calendar_action").removeClass();
                        $("#calendar_action").html(buttonText).addClass(buttonClass).show();
                        $(".is_offered_message").hide();

                        if (cbcalendar.selectedDates[0].IsOffered) {
                            $("#calendar_action").hide();
                            $(".is_offered_message").show();
                        }
                    }
                }
            },
            beforeShowDay: function (date) {
            	
                return cbcalendar.highlightDays(date);
            }
        });
    },
    highlightDays: function (date) {
        var m = (date.getMonth() + 1),
            d = date.getDate(),
            y = date.getFullYear(),
            isEnabled = true,
            classAddedd = "",
        	dayMessage = "";

        $.each(cbcalendar.selectedDates, function (index) {
            $.each(this, function (k, v) {
                if (v == m + '/' + d + '/' + y) {
                    isEnabled = true;
                    classAddedd += " selectedDate";
                    dayMessage = cbcalendar.messageSelected;
                    return [isEnabled, classAddedd, dayMessage];
                }
            });
        });

        var jsonData = cbcalendar.getJsonData((m + '/' + (d) + '/' + y));


        if (jsonData) {
            if (jsonData.DayStatus == "Available") {
                isEnabled = true;
                classAddedd += " openDay";
                dayMessage = cbcalendar.messageAvailable;
            }
            if (jsonData.IsOffered && cbcalendar.userRole == "parent") {
                isEnabled = true;
                classAddedd += " offeredDay";
                //dayMessage = cbcalendar.messageAvailable;
            }

            if (jsonData.DayStatus == "CasualBooking") {
                isEnabled = true;
                classAddedd += " bookedDay";
                dayMessage = "Booked";
            }
            if (jsonData.DayStatus == "Absence") {
                isEnabled = true;
                classAddedd += " absenceDay";
                dayMessage = "Absent";
            }
            if (jsonData.DayStatus == "Full") {
                if (cbcalendar.userRole == "staff") {
                    isEnabled = true;
                } else if (cbcalendar.userRole == "parent") {
                    isEnabled = false;
                }

                classAddedd += " full";
                dayMessage = cbcalendar.messageFull;
            }
            if (jsonData.DayStatus == "NoProgram") {
                isEnabled = false;
                classAddedd += " noProgram";
                dayMessage = cbcalendar.messageNoprogram;
            }
            if (jsonData.DayStatus == "PermanentBooking") {
                isEnabled = false;
                classAddedd += " scheduled";
                dayMessage = "Scheduled days";
            }
        }



        return [isEnabled, classAddedd, dayMessage];
    },
    addToSelectedArray: function (object) {

        try {
            var duplicate = false;
            var newDate = (object.currentMonth + 1) + "/" + object.currentDay + "/" + object.currentYear;
            var jsonData = cbcalendar.getJsonData(newDate);
            var id = jsonData.Id;
            var CasualBookingId = jsonData.CasualBooking_id;
            var dayStatus = jsonData.DayStatus;
            var displayNote = jsonData.DisplayNote;
            var totalCapacity = jsonData.PlaceLimit;
            var RefundDayLimit = jsonData.RefundDayLimit;
            var IsOffered = jsonData.IsOffered;

            $.each(cbcalendar.selectedDates, function (index) {
                if (cbcalendar.selectedDates[index]) {
                    if (cbcalendar.selectedDates[index].Date == newDate) {
                        cbcalendar.selectedDates.splice(index, 1);
                        duplicate = true;
                    }
                }

            });

            if (cbcalendar.userRole == "parent" && duplicate == false) {
                cbcalendar.selectedDates = [];
                cbcalendar.selectedDates.push({
                    Id: id,
                    CasualBooking_id: CasualBookingId,
                    Date: newDate,
                    DayStatus: dayStatus,
                    DisplayNote: displayNote,
                    PlaceLimit: totalCapacity,
                    RefundDayLimit: RefundDayLimit,
                    IsOffered: IsOffered
                });

            } else if (duplicate == false) {
                cbcalendar.selectedDates.push({
                    Id: id,
                    CasualBooking_id: CasualBookingId,
                    Date: newDate,
                    DayStatus: dayStatus,
                    DisplayNote: displayNote,
                    PlaceLimit: totalCapacity,
                    RefundDayLimit: RefundDayLimit,
                    IsOffered: IsOffered
                });
            }

            //console.log(cbcalendar.selectedDates);
        } catch (ex) {
            console.log(ex);
        }

    },
    populateContextMenu: function () {
    	
    	var dayinfo = cbcalendar.userRole == "parent" ? "" : "Editing ";
    	
        if (cbcalendar.selectedDates.length < 1 && cbcalendar.userRole == "parent") {
            $("#calendar_action").hide();
            $(".is_offered_message").hide();
        }

        var counter = 0;

        if (cbcalendar.selectedDates.length > 0) {
            var baseVal = cbcalendar.selectedDates[0].DisplayNote.toUpperCase();
            $(cbcalendar.selectedDates).each(function (index) {
                if (cbcalendar.selectedDates[index].DisplayNote.toUpperCase() == baseVal) {
                    counter++;
                }
            })
        }

        if (cbcalendar.selectedDates.length == 1) {
            var jsonData = cbcalendar.getJsonData(cbcalendar.selectedDates[0].Date);
            $(cbcalendar.availableSpot).html(jsonData.AvailSpaces);
            $(cbcalendar.roomCapacity).html(jsonData.PlaceLimit);
            $(cbcalendar.DisplayNote).val(jsonData.DisplayNote);
            var dateSpl = cbcalendar.selectedDates[0].Date.split("/");

            $(".cbcalendar_context_title").html(dayinfo+"Day info for " + dateSpl[1] + "/" + dateSpl[0] + "/" + dateSpl[2]);
            $(".cbcalendar_context_inner").show();
            $(".empty_title").hide();
        } else if (counter == cbcalendar.selectedDates.length && cbcalendar.selectedDates.length > 1) {
            var jsonData = cbcalendar.getJsonData(cbcalendar.selectedDates[0].Date);
            $(cbcalendar.availableSpot).html("");
            $(cbcalendar.roomCapacity).html("");
            $(cbcalendar.DisplayNote).val(jsonData.DisplayNote);
            var dateSpl = cbcalendar.selectedDates[0].Date.split("/");
            $(".cbcalendar_context_title").html(dayinfo+"Day info for multiple days");
            $(".cbcalendar_context_inner").show();
            $(".empty_title").hide();
        } else {
            $(cbcalendar.availableSpot).html("");
            $(cbcalendar.roomCapacity).html("");
            $(cbcalendar.DisplayNote).val("");
            $(".cbcalendar_context_title").html(dayinfo+"Day info for multiple days");
            $(".cbcalendar_context_inner").show();
            $(".empty_title").hide();
        }

        if (cbcalendar.selectedDates.length < 1) {
            $(".cbcalendar_context_inner").hide();
            $(".empty_title").show();
        }
    },
    getJsonData: function (posDate) {
        for (var i = 0; i < cbcalendar.datesArray.length; i++) {
            var jsonData = cbcalendar.datesArray[i];
            var jsonDate = jsonData.Date;
            var jsonFormattedDate = new Date(parseInt(jsonDate.substr(6)));
            var m1 = jsonFormattedDate.getMonth(),
                d1 = jsonFormattedDate.getDate(),
                y1 = jsonFormattedDate.getFullYear();

            if (((m1 + 1) + '/' + (d1) + '/' + y1) == posDate) {
                return jsonData;
            }
        }
    },
    update: function (acButton) {
        var responseMessage = "";

        if (acButton.hasClass("book")) {
            var jsonData = cbcalendar.getJsonData(cbcalendar.selectedDates[0].Date);
            cbcalendar.selectedDates[0].DayStatus = "CasualBooking";
            jsonData.DayStatus = "CasualBooking";
            responseMessage = "Booking successfull";
        }
        if (acButton.hasClass("cancel")) {
            var jsonData = cbcalendar.getJsonData(cbcalendar.selectedDates[0].Date);
            cbcalendar.selectedDates[0].DayStatus = "Available";
            jsonData.DayStatus = "Available";
            responseMessage = "Booking cancelled";
        }
        if (acButton.hasClass("absent")) {
            var jsonData = cbcalendar.getJsonData(cbcalendar.selectedDates[0].Date);
            cbcalendar.selectedDates[0].DayStatus = "Absence";
            jsonData.DayStatus = "Absence";
            responseMessage = "Absence marked";
        }


        var updatedMessage = $("#cx_display_note").val();

        if (updatedMessage == "" && cbcalendar.userRole == "staff" && cbcalendar.selectedDates.length > 0) {
            responseMessage = "Please enter display note";
        } else if (cbcalendar.selectedDates.length > 0) {
            for (var i = 0; i < cbcalendar.selectedDates.length; i++) {
                if (cbcalendar.userRole == "staff") {
                    var jsonData = cbcalendar.getJsonData(cbcalendar.selectedDates[i].Date);
                    cbcalendar.selectedDates[i].DisplayNote = updatedMessage;
                    jsonData.DisplayNote = updatedMessage;
                }
            }

            if (cbcalendar.selectedDates.length > 0) {
                if (cbcalendar.userRole == "staff") {
                    responseMessage = "Display note successfully updated";
                }
                $("#cx_display_note").val("");
                $(".is_offered_message").hide();
                $(cbcalendar.availableSpot).html("");
                $(cbcalendar.roomCapacity).html("");
                $(cbcalendar.DisplayNote).val("");
                $(".cbcalendar_context_inner").hide();
                $(".empty_title").show();

                $(cbcalendar.selectedDates).each(function (i) {

                    var isNew = true;
                    $(cbcalendar.selectedDatesStorage).each(function (j) {

                        if (cbcalendar.selectedDates[i].Date == cbcalendar.selectedDatesStorage[j].Date) {
                            isNew = false;
                            cbcalendar.selectedDatesStorage[j].DisplayNote = cbcalendar.selectedDates[i].DisplayNote;
                            cbcalendar.selectedDatesStorage[j].DayStatus = cbcalendar.selectedDates[i].DayStatus;
                        }
                    })

                    if (isNew) {
                        cbcalendar.selectedDatesStorage.push(cbcalendar.selectedDates[i]);
                    }

                })

                cbcalendar.selectedDates = [];
                $("#cbcalendar").datepicker("refresh");
            }
        }

        cbcalendar.isSaved = false;

        if (responseMessage != "") {
            //.alert(responseMessage);
        }

        $("#calendar_action").hide();

        console.log(cbcalendar.selectedDatesStorage);
    },
    jsonCallback: function (jsonResponse) {
        cbcalendar.datesArray = jsonResponse;
        cbcalendar.initializeCalendar();
        $("#cbcalendar").datepicker("refresh");
    },
    validateSave: function (direction) {
        if (!cbcalendar.isSaved) {
            $("#dialog-confirm").html("Do you want to save the unsaved changes?");
            $("#dialog-confirm").dialog({
                resizable: false,
                height: 140,
                modal: true,
                buttons: {
                    "YES": function () {
                        $(this).dialog("close");
                        cbcalendar.saveChanges(direction);
                    },
                    "NO": function () {
                        $(this).dialog("close");
                        cbcalendar.clearChanges();
                        cbcalendar.monthChange(direction);
                    }
                }
            });
        } else {
            return true;
        }

    },
    formatDate: function (date) {
        var month = date.getMonth(),
            day = date.getDate(),
            year = date.getFullYear();

        return (month + 1) + '/' + day + '/' + year;
    },
    monthChange: function (direction) {
        if (direction == "forward") {
            $.datepicker._adjustDate('#cbcalendar', +1, 'M');
        } else if (direction == "backward") {
            $.datepicker._adjustDate('#cbcalendar', -1, 'M');
        }
    },
    startLoader: function () {
        $("body").append('<div class="loader_components"><div id="loading_dialog">Loading</div> <div class="ui-widget-overlay ui-front"></div></div>');
    },
    stopLoader: function () {
        $(".loader_components").remove();
    },
    saveChanges: function (direction) {
        cbcalendar.startLoader();

        setTimeout(function () {
            cbcalendar.stopLoader();
            cbcalendar.isSaved = true;
            cbcalendar.monthChange(direction);
        }, 1000)
    },
    daysBetween : function( date1, date2 ) {
    	  //Get 1 day in milliseconds
    	  var one_day=1000*60*60*24;

    	  // Convert both dates to milliseconds
    	  var date1_ms = date1.getTime();
    	  var date2_ms = date2.getTime();

    	  // Calculate the difference in milliseconds
    	  var difference_ms = date2_ms - date1_ms;
    	    
    	  // Convert back to days and return
    	  return Math.round(difference_ms/one_day); 
    	},
    clearChanges: function () {
        //cbcalendar.datesArray = "";
        cbcalendar.selectedDates = [];
        cbcalendar.selectedDatesStorage = [];
        cbcalendar.initializeCalendar();
        cbcalendar.isSaved = true;
        $(".is_offered_message").hide();
        $(cbcalendar.availableSpot).html("");
        $(cbcalendar.roomCapacity).html("");
        $(cbcalendar.DisplayNote).val("");
        $(".cbcalendar_context_inner").hide();
        $(".empty_title").show();
        $("#calendar_action").hide();
        $("#cbcalendar").datepicker("refresh");

    }
};


$(function () {



	var dummyJson = [{
        "CasualBooking_id": 0,
        "Date": "/Date(1401777810219)/",
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
        "Date": "/Date(1401864210219)/",
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
        "Date": "/Date(1401950610219)/",
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
        "Date": "/Date(1402037010219)/",
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
        "Date": "/Date(1402123410219)/",
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
        "Date": "/Date(1402208830000)/",
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
        "Date": "/Date(1402295230000)/",
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
        "Date": "/Date(1402381630000)/",
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
        "Date": "/Date(1402468030000)/",
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
        "Date": "/Date(1402554430000)/",
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
        "Date": "/Date(1402640830000)/",
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
        "Date": "/Date(1402727230000)/",
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
        "Date": "/Date(1402813630000)/",
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
        "Date": "/Date(1402900030000)/",
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
        "Date": "/Date(1402986430000)/",
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
        "Date": "/Date(1403072830000)/",
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
        "Date": "/Date(1403159230000)/",
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
        "Date": "/Date(1403245630000)/",
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
        "Date": "/Date(1403332030000)/",
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
        "Date": "/Date(1403418430000)/",
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
        "Date": "/Date(1403504830000)/",
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
        "Date": "/Date(1403591230000)/",
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
        "Date": "/Date(1403677630000)/",
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
        "Date": "/Date(1403764030000)/",
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
        "Date": "/Date(1403850430000)/",
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
        "Date": "/Date(1403936830000)/",
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
        "Date": "/Date(1404023230000)/",
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
        "Date": "/Date(1404109630000)/",
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


    var today = new Date();
    var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    cbcalendar.startDate = cbcalendar.formatDate(today);
    cbcalendar.endDate = cbcalendar.formatDate(lastDay);
    cbcalendar.calMaxDate = "+4M";

    cbcalendar.jsonCallback(dummyJson);
    cbcalendar.updateHeader();

    $(".cbcalendar_context_action button").click(function () {
        cbcalendar.update($(this));
    });

    $("#cx_display_note").blur(function () {
        if (cbcalendar.userRole == "staff") {
            cbcalendar.update($(this));
        }
    });

});

$(document).mouseup(function (e)
{
	var container = $(".cbcalendar_container, .cbcalendar_context");

	if (container.has(e.target).length === 0)
	{
		cbcalendar.selectedDates = [];
		$(".cbcalendar_context_inner").hide();
        $(".empty_title").show();
		$("#cbcalendar").datepicker("refresh");
	}
	
});


$(window).on('beforeunload', function () {
    if (!cbcalendar.isSaved) {
        return 'All your unsaved changes will be lost';
    }
});
