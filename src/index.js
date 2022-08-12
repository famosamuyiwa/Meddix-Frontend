import dashl from '../icons/dashboard_light.png';
import dashd from '../icons/dashboard_dark.svg';
import mrl from '../icons/medrecord_light.svg';
import mrd from '../icons/medrecord_dark.svg';
import rxl from '../icons/drugs_light.svg';
import rxd from '../icons/drugs_dark.svg';
import apptl from '../icons/calendar_light.svg';
import apptd from '../icons/calendar_dark.svg';
import billd from '../icons/billing_dark.svg';
import billl from '../icons/billing_light.svg';
import * as bootstrap from 'bootstrap';


//STYLING***************************************************** 
var util = {
	f: {
		addStyle: function (elem, prop, val, vendors) {
			var i, ii, property, value
			if (!util.f.isElem(elem)) {
				elem = document.getElementById(elem)
			}
			if (!util.f.isArray(prop)) {
				prop = [prop]
				val = [val]
			}
			for (i = 0; i < prop.length; i += 1) {
				var thisProp = String(prop[i]),
					thisVal = String(val[i])
				if (typeof vendors !== "undefined") {
					if (!util.f.isArray(vendors)) {
						vendors.toLowerCase() == "all" ? vendors = ["webkit", "moz", "ms", "o"] : vendors = [vendors]
					}
					for (ii = 0; ii < vendors.length; ii += 1) {
						elem.style[vendors[i] + thisProp] = thisVal
					}
				}
				thisProp = thisProp.charAt(0).toLowerCase() + thisProp.slice(1)
				elem.style[thisProp] = thisVal
			}
		},
		cssLoaded: function (event) {
			var child = util.f.getTrg(event)
			child.setAttribute("media", "all")
		},
		events: {
			cancel: function (event) {
				util.f.events.prevent(event)
				util.f.events.stop(event)
			},
			prevent: function (event) {
				event = event || window.event
				event.preventDefault()
			},
			stop: function (event) {
				event = event || window.event
				event.stopPropagation()
			}
		},
		getSize: function (elem, prop) {
			return parseInt(elem.getBoundingClientRect()[prop], 10)
		},
		getTrg: function (event) {
			event = event || window.event
			if (event.srcElement) {
				return event.srcElement
			} else {
				return event.target
			}
		},
		isElem: function (elem) {
			return (util.f.isNode(elem) && elem.nodeType == 1)
		},
		isArray: function(v) {
			return (v.constructor === Array)
		},
		isNode: function(elem) {
			return (typeof Node === "object" ? elem instanceof Node : elem && typeof elem === "object" && typeof elem.nodeType === "number" && typeof elem.nodeName==="string" && elem.nodeType !== 3)
		},
		isObj: function (v) {
			return (typeof v == "object")
		},
		replaceAt: function(str, index, char) {
			return str.substr(0, index) + char + str.substr(index + char.length);
		}
	}
},
   
form = {
f: {
	init: {
		register: function () {
			console.clear()// just cuz codepen
			var child, children = document.getElementsByClassName("field"), i
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				util.f.addStyle(child, "Opacity", 1)
			}
			children = document.getElementsByClassName("psuedo_select")
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				child.addEventListener("click", form.f.select.toggle)
			}
		},
		unregister: function () {
			//just here as a formallity
			//call this to stop all ongoing timeouts are ready the page for some sort of json re-route
		}
	},
	select: {
		blur: function (field) {
			field.classList.remove("focused")
			var child, children = field.childNodes, i, ii, nested_child, nested_children
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				if (util.f.isElem(child)) {
					if (child.classList.contains("deselect")) {
						child.parentNode.removeChild(child)
					} else if (child.tagName == "SPAN") {
						if (!field.dataset.value) {
							util.f.addStyle(child, ["FontSize", "Top"], ["16px", "32px"])
						}
					} else if (child.classList.contains("psuedo_select")) {
						nested_children = child.childNodes
						for (ii = 0; ii < nested_children.length; ii += 1) {
							nested_child = nested_children[ii]
							if (util.f.isElem(nested_child)) {
								if (nested_child.tagName == "SPAN") {
									if (!field.dataset.value) {
										util.f.addStyle(nested_child, ["Opacity", "Transform"], [0, "translateY(24px)"])
									}
								} else if (nested_child.tagName == "UL") {
										util.f.addStyle(nested_child, ["Height", "Opacity"], [0, 0])
								}
							}
						}
					}
				}
			}
		},
		focus: function (field) {
			field.classList.add("focused")
			var bool = false, child, children = field.childNodes, i, ii, iii, nested_child, nested_children, nested_nested_child, nested_nested_children, size = 0
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				util.f.isElem(child) && child.classList.contains("deselect") ? bool = true : null
			}
			if (!bool) {
				child = document.createElement("div")
				child.className = "deselect"
				child.addEventListener("click", form.f.select.toggle)
				field.insertBefore(child, children[0])
			}
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				if (util.f.isElem(child) && child.classList.contains("psuedo_select")) {
					nested_children = child.childNodes
					for (ii = 0; ii < nested_children.length; ii += 1) {
						nested_child = nested_children[ii]
						if (util.f.isElem(nested_child) && nested_child.tagName == "UL") {
							size = 0
							nested_nested_children = nested_child.childNodes
							for (iii = 0; iii < nested_nested_children.length; iii += 1) {
								nested_nested_child = nested_nested_children[iii]
								if (util.f.isElem(nested_nested_child) && nested_nested_child.tagName == "LI") {
									size += util.f.getSize(nested_nested_child, "height")
									console.log("size: " + size)
								}
							}
							util.f.addStyle(nested_child, ["Height", "Opacity"], [size + "px", 1])
						}
					}
				}
			}
		},
		selection: function (child, parent) {
			var children = parent.childNodes, i, ii, nested_child, nested_children, time = 0, value
			if (util.f.isElem(child) && util.f.isElem(parent)) {
				parent.dataset.value = child.dataset.value
				value = child.innerHTML
			}
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				if (util.f.isElem(child)) {
					if (child.classList.contains("psuedo_select")) {
						nested_children = child.childNodes
						for (ii = 0; ii < nested_children.length; ii += 1) {
							nested_child = nested_children[ii]
							if (util.f.isElem(nested_child) && nested_child.classList.contains("selected")) {
								if (nested_child.innerHTML)  {
									time = 1E2
									util.f.addStyle(nested_child, ["Opacity", "Transform"], [0, "translateY(24px)"], "all")
								}
								setTimeout(function (c, v) {
									c.innerHTML = v
									util.f.addStyle(c, ["Opacity", "Transform", "TransitionDuration"], [1, "translateY(0px)", ".1s"], "all")
								}, time, nested_child, value)
							}
						}
					} else if (child.tagName == "SPAN") {
						util.f.addStyle(child, ["FontSize", "Top"], ["12px", "8px"])
				   }
			   }
			}
		},
		toggle: function (event) {
			util.f.events.stop(event)
			var child = util.f.getTrg(event), children, i, parent
			switch (true) {
				case (child.classList.contains("psuedo_select")):
				case (child.classList.contains("deselect")):
					parent = child.parentNode
					break
				case (child.classList.contains("options")):
					parent = child.parentNode.parentNode
					break
				case (child.classList.contains("option")):
					parent = child.parentNode.parentNode.parentNode
					form.f.select.selection(child, parent)
					break
			}
			parent.classList.contains("focused") ? form.f.select.blur(parent) : form.f.select.focus(parent)
		}
	}
}}
window.onload = form.f.init.register

//************************************************************************************************************************* */




/*REQUEST HANDLING************************************************
 *
 *
 * 
 * 
*/ 

var prodUrl = "http://127.0.0.1:5000"
var login = "/auth"
var vitalsE = "/medical-record/vitals/"
var basicDataE = "/basicdata/"
var medrecordsE = "/medical-record/"
var appointmentsE = "/appointments"
var appointmentE = "/appointment/"
var consultantsE = "/consultants"
var prescriptionE = "/prescription/"
var prescriptionsE = "/prescriptions/"

// Index
$( "form" ).on( "submit", function( event ) {
	event.preventDefault();
	console.log("start")
	$.ajax({
		url: prodUrl+login,
		method: "POST",
		timeout: 0,
		headers: {
					"Content-Type": "application/json",
					"Authorization": make_base_auth($("#username").val(), $("#password").val())
					},
		data: JSON.stringify({username: $("#username").val(), password: $("#password").val()}),
		
		success: loginCallback,

		error: function(response){
			$("#error-msg").html("Invalid username/password")
		},

		})
});

function setCookie(name,value,exp_days) {
    var d = new Date();
    d.setTime(d.getTime() + (exp_days*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    var cname = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++){
        var c = ca[i];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if(c.indexOf(cname) == 0){
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}


function loginCallback(response) {
	
	
	$.ajax({
		url: prodUrl+"/activity/"+response.user_id,
		method: "POST",
		data: {
			status: "Logged in"
		}
	}).done(function(){
		setCookie("token",response.access_token,1)
		setCookie("user_id", response.user_id, 1)
		setCookie("category", $("#login-category").text().toLowerCase(), 1)
		if($("#login-category").text().toLowerCase() === "patient"){
			window.location.href = "./patient/home.html"
		}
		else if($("#login-category").text().toLowerCase() === "consultant"){
			window.location.href = "./consultant/home.html"
		}
		else if($("#login-category").text().toLowerCase() === "dispenser"){
			window.location.href = "./dispensary/home.html"
		}
		else{
			alert("404")
		}
		}).fail(function(){
		console.log("login failed")
	})
}


function make_base_auth(username, password){
	var tok = username + ':' + password;
	var hash = btoa(tok);
	return "Basic " + hash;
}






/***************************************************************************************************

--------------------EVENTS------------------------

*/


//on link click, get page content

$('.nav-link').on('click', function(e){
    
	e.preventDefault();

    var pageRef = $(this).attr('href');
	if(pageRef==$("#logout-link").attr("href")){
		setTimeout(function(){sessionStorage.clear()},500)
		setTimeout(function(){window.location.href = "../index.html"},1000)
		sessionStorage.clear()
		window.location.href = "../index.html"
}
	else{
    callPage(pageRef);
	}
})


//home

$(document).ready(function(){

	let myPromise = new Promise(function(myResolve, myReject) {
			myResolve(getBasicData(getCookie("token"),getCookie("user_id"),getCookie("category")))
	
			myReject("Failed")
		
		});
		
		// "Consuming Code" (Must wait for a fulfilled Promise)
	myPromise.then(
		function(value) {
			if(window.location.href == "http://localhost:1234/patient/home.html"){
				setTimeout(function(){callPage($('#pdashboard-link').attr('href'))},500)
			}
			else if(window.location.href == "http://localhost:1234/consultant/home.html"){
				setTimeout(function(){callPage($('#cdashboard-link').attr('href'))},500)	
			}
			else if(window.location.href == "http://localhost:1234/dispensary/home.html"){
				setTimeout(function(){callPage($('#ddashboard-link').attr('href'))},500)	
			}
			else{
				
			}
		}
	);
		
})

function parser(object){
	return JSON.parse(object)
}

//dashboard

function getBasicData(token, user_id, category){
	$.ajax({
		url : prodUrl+basicDataE+user_id,
		type : 'GET',
		dataType: 'text',
		headers: {
			"Authorization" : "JWT "+ token
		},

		data: {"category":category},
		
		success : function(response){
			sessionStorage.setItem('basicData', (response));
			console.log("basicdata set")									//set json response  
		},

		error : function(){
			console.log("failed getting basic data")
		}

	})
}

function callPDashboardReqs(){
	var basicData = parser(sessionStorage.getItem("basicData"));
	
	var title = "";
	if(basicData.patient.gender == 'M'){
		title = "mr.";
	}
	else{
		title = "mrs";
	}
	var getVitals =	{
		url : prodUrl+vitalsE+parser(sessionStorage.getItem("basicData")).patient.patient_id, // url + vitals endpoint + parser function that returns parsed JSON of js Object passed into it
		method: "GET"
	}
	
	var fullname = (title + " " + basicData.patient.last_name + " " + basicData.patient.first_name + " " +  basicData.patient.other_name).toUpperCase()
	
	$.ajax(getVitals).done(function (response) {
	  }).always(function(response){
		$(".last-chk").html(response.last_checked)
		$(".pulse").html(response.pulse)
		$(".weight").html(response.weight)
		$(".height").html(response.height)
		$(".category").html(getCookie("category").toUpperCase())
		$(".fullname").html(fullname)
		$(".pid").html("00000"+basicData.patient.patient_id)
		$(".lastname").html(basicData.patient.last_name) 
		$(".age").html(basicData.patient.age) 
		$(".gender").html(function(){if(basicData.patient.gender==="M"){return "MALE"}else{return "FEMALE"}}) 
	});

	//////////////////////////////////	///////////////////////////////////////////////
	
	var parsed = parser(sessionStorage.getItem("basicData"))
	if(getCookie("category")==="patient"){
		var getAppointment= {
			url : prodUrl + appointmentsE,
			method : "GET",
			data: {category: getCookie("category"), id: parsed.patient.patient_id}
		}
	}
	else{
		alert(404)
	}


	$.ajax(getAppointment).done(function(response){
		var s = ""
		var i = 0
		for(var appointment of Object.keys(response.appointments)){
			var c = response.appointments[appointment].consultant_name
			var d = response.appointments[appointment].schedule_date
			var t = response.appointments[appointment].schedule_time
			var v = response.appointments[appointment].schedule_venue
			var r = response.appointments[appointment].schedule_reason
			var st = response.appointments[appointment].status

			if(st == "SCHEDULED"){
				s += "<tr><td>Dr. "+c+"</td><td>"+d+"</td><td>"+t+"</td><td>"+v+"</td><td>"+r+"</td></tr>"
				i++
				$(".upappt-no").css("display", "none");
				$(".upappt-yes").css("display", "block");
				if(i===2){
					break;
				}
			}
		}
		$(".dash-tbody").html(s);

	})

	var getActivities = {
		url: prodUrl +"/activities/"+getCookie("user_id"),
		method: "GET"
	}

	$.ajax(getActivities).done(function(response){
		var s= ""
		var h =   "<h4>Activities</h4>"
		for(var activity of Object.keys(response.activity)){
			var a = response.activity[activity].activity
			var d = response.activity[activity].create_date
			var t = response.activity[activity].time_stamp

			s+="<p class='activities'>"+d+" "+t+" : "+a+"</p>"

		}
		$(".right-column").html(h+s)
	})
}

//medical records

function callMedrecordsReqs(){
	var getMedrecords = {
		url : prodUrl+medrecordsE+parser(sessionStorage.getItem("basicData")).patient.patient_id,
		method : "GET"
	}
	$.ajax(getMedrecords).done(function (response){
		$(".mr-height").html(response.vitals.height);
		$(".mr-weight").html(response.vitals.weight);
		$(".mr-bmi").html(response.vitals.bmi);
		$(".mr-temp").html(response.vitals.temperature);
		$(".mr-pulse").html(response.vitals.pulse);
		$(".mr-resp-rate").html(response.vitals.respiratory_rate);
		$(".mr-bp").html(response.vitals.blood_pressure);
		$(".mr-bos").html(response.vitals.blood_oxygen_saturation);
	})

	$.ajax(getMedrecords).done(function(response){
		
		var s = ""
		for(var diagnosis of Object.keys(response.diagnosis)){       //get key of response["diagnosis"]
			var d = response.diagnosis[diagnosis].diagnosis			//use the key returned to get diagnosis from response e.g response["d"][0]["d"]	
			s += '<li class="list-group-item"><span>'+d+'</span></li>'
		}
		$("#l-g-d").html(s)
	})

	$.ajax(getMedrecords).done(function(response){
		var s=""
		for(var visits of Object.keys(response.visits)){
			var v = response.visits[visits].visits
			s += '<li class="list-group-item"><span>'+v+'</span></li>'
				}
		$("#l-g-v").html(s)
	})

	$.ajax(getMedrecords).done(function(response){
		var s=""
		for(var allergy of Object.keys(response.allergies)){
			var a = response.allergies[allergy].allergy
			var r = response.allergies[allergy].reaction
			s += '<li class="list-group-item"><span>'+a+'</span>    | reaction - '+ r + '</li>'
		}
		$("#l-g-a").html(s)

	})


}

//appointments
const appts = {}

function callPAppointmentReqs(){
	var parsed = parser(sessionStorage.getItem("basicData"))
	if(getCookie("category")==="patient"){
		var getAppointment= {
			url : prodUrl + appointmentsE,
			method : "GET",
			data: {category: getCookie("category"), id: parsed.patient.patient_id}
		}
	}
	else{
		alert(404)
	}


	let Pappt_promise = new Promise(function(myResolve, myReject) {		
		myResolve($.ajax(getAppointment).done(function(response){
			var s = ""
			var i = 1
			for(var appointment of Object.keys(response.appointments)){
				var c = response.appointments[appointment].consultant_name
				var d = response.appointments[appointment].schedule_date
				var t = response.appointments[appointment].schedule_time
				var v = response.appointments[appointment].schedule_venue
				var r = response.appointments[appointment].schedule_reason
				var st = response.appointments[appointment].status
				var aid = response.appointments[appointment].appointment_id
				
				if(st != "DONE"){
					var resch= ""

					if(st=="SCHEDULED"){
						resch = "<div id='redo' class='redo'></div>"
					}

					s += "<tr class='warning '><th scope='row'>"+ i +"</th><td>Dr. "+c+"</td><td>"+d+"</td><td>"+t+"</td><td>"+v+"</td><td>"+r+"</td><td class='"+st.toLowerCase()+"'>"+st+"</td><td>"+resch+"</td></tr>"
					$(".no-appt").css("display", "none");
					$(".yes-appt").css("display", "block");
					var appt = {
						"consultant_name" : c,
						"schedule_date": d,
						"schedule_time": t,
						"schedule_venue": v,
						"schedule_reason": r,
						"status": st,
						"appointment_id": aid
					}
					appts[i++] = appt
					
				}

				
			}

			$(".appt-tbody").html(s);
	}))
	myReject("pAppt promise reject")
})

	var myModal = new bootstrap.Modal(document.getElementById('appt-modal'), {
		keyboard: false
	  })

	var reschedule = new bootstrap.Modal(document.getElementById('rescheduleModal'), {
	keyboard: false
	})

	var modalToggle = document.getElementById('add-appt-icon')
	var modalToggle2 = document.getElementById('add-appt-icon2')
	var modalToggle3 = document.getElementById('redo')

	$("#add-appt-icon").on('click', function(){
		myModal.show(modalToggle)
	})

	$("#add-appt-icon2").on('click', function(){
		$(".no-appt").css("display", "none")
		$(".yes-appt").css("display", "block")
		myModal.show(modalToggle2)
	})

	Pappt_promise.then(
		function(value){

			$(function(){
				$("#pdatepicker").datepicker();
		});

			$(".redo").on('click', function(){
				reschedule.show(modalToggle3)
				var appt_no = ($(this).closest("tr").find("th").text())
				
				$("#consultant-field").val("Dr. "+appts[appt_no].consultant_name)
				$("#pdescription-field").val(appts[appt_no].schedule_reason)

				$("#submit-resch").on("click", function(){
					var rescheduleReq = {
						url: prodUrl+appointmentE+appts[appt_no].appointment_id,
						method: "PUT",
						data: {
							status: "RESCHEDULED",
							date: $("#pdatepicker").val(),
							time: $("#ptime-field").val()
						}
					}
						
					$.ajax(rescheduleReq).done(function(){
						
						$("#resch-modal-body").html("<div id='submit-success'><div id='checked-icon'></div><p>Appointment Reschedule Request has been submitted successfully</p><p>Pending approval from consultant.</p>")
						$("#ok-resch").css("visibility", "visible")
						$("#submit-resch").css("visibility", "hidden")
						$("#close-resch").css("visibility", "hidden")


				})

				})
					
					$("#ok-resch").on("click", function(){
						reschedule.hide()
						callPage($('#appt-link').attr('href'))
					})
			
			})
		}
	)


	$("#check-symptoms").on("click", function(){
		var submitSymptoms = {
			url : prodUrl+"/symptom-checker",
			method: "GET",
			data: {
				symptoms : $("#symptom").val()
			}
		}

		$.ajax(submitSymptoms).done(function(response){
			var prognosis = response.prognosis
			var specialist = response.specialist

			$("#prog-box").css("display", "block")
			$("#prognosis").html(prognosis)

			$("#specialist-sugg").on("click", function(){
				$("#sugg-p").css("display","block")
				$("#sugg").html(specialist)
				$("#symptom").clear()
				$("#prog-box").css("display", "none")
			})
		})


	})

	///////////// ON SPECIALIST SELECTED
$('#specialist').on('change', function (e) {
	
	var selected = $(this).find('option:selected').text();

	var getConsultants ={
		url: prodUrl+consultantsE,
		method: "GET",
		data: {specialty:selected}
	}

	let appt_promise = new Promise(function(myResolve, myReject) {
		myResolve($.ajax(getConsultants).done(function(response){
			var s = "<option selected>--Select Consultant--</option>"
			var i = 0
	
			for(var consultant of Object.keys(response.consultants)){
				var c = response.consultants[consultant]
				s += "<option value = " + i++ + " id = "+ c.consultant_id +"> Dr. "+c.last_name+" "+c.first_name+"</option>"
			}
			$("#consultant").html(s)
			$("#consultant").removeAttr("disabled", "false")	
			
			$('#consultant').on('change', function (e) {
			var cid = $(this).find('option:selected').attr("id");
			sessionStorage.setItem("cid", cid)
			})
		}))
		myReject("Failed")
	})

	
		// "Consuming Code" (Must wait for a fulfilled Promise)
	appt_promise.then(
		function(value) {
	

			$("#submit-btn").on("click", function(e){	
				var submitApptRequest = {
					url :prodUrl+appointmentE+"0",
					method: "POST",
					data: {
						patient_id : parser(sessionStorage.getItem("basicData")).patient.patient_id,
						date : "None",
						time : "None",
						venue :"None",
						reason : $("#desc-field").val(),
						consultant_id : parser(sessionStorage.getItem("cid"))
					}
				}
							
				$.ajax(submitApptRequest).done(function(response){
				$("#modal-body").html("<div id='submit-success'><div id='checked-icon'></div><p>Appointment Request has been submitted successfully</p><p>Pending approval from consultant.</p>")
				$("#ok-btn").css("visibility", "visible")
				$("#close-btn").css("visibility", "hidden")
				$("#submit-btn").css("visibility", "hidden")
			})

			e.stopImmediatePropagation();
			return false;
		})
			
			
			$("#ok-btn").on('click', function(){
				myModal.hide()
				callPage($('#appt-link').attr('href'))
			})
		}
	);

	
});

}

//////////// Billing 


function payWithPaystack(email, amount) {


  let handler = PaystackPop.setup({

    key: 'pk_test_221bf4c9d9c08acd6b3f178eff3324338e817c8a', // Replace with your public key

    email: email,

    amount: amount * 100,

    ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you

    // label: "Optional string that replaces customer email"

    onClose: function(){

      alert('Window closed. Payment has been interrupted');

    },

    callback: paystackCallback

  });

  handler.openIframe();

}


//****************************************************************************** */
const arr = []
const rxArr =[]
const aidArr=[]
const drugs=[]
var orderIndex  



function callPRxReqs(){
	var getRx = {
		url : prodUrl+prescriptionsE+parser(sessionStorage.getItem("basicData")).patient.patient_id,
		method : "GET"
	}
	

	
	
	$.ajax(getRx).done(function(response){
		var str = ""
		var i = 0

		for(var rx of Object.keys(response.prescriptions)){
			var a = response.prescriptions[rx].appointment_id
			var d = response.prescriptions[rx].drug_name
			var s = response.prescriptions[rx].serving
			var p = response.prescriptions[rx].price
			var rX = response.prescriptions[rx].prescription_id
			var status = response.prescriptions[rx].status

			if(d!="" && status!="CONFIRMED"){
				str += '<div class="card-group"><div class="card text-dark bg-warning" style="width: 18rem;"><div class="card-body"><h5 class="card-header text-light" id="aid">'+a+'</h5><p class="card-text" id="drug-name">Drug Name: '+d+'</p><p class="card-text" id="serving">Serving: '+s+'</p><p class="card-text" id="price">Price: &#8358;'+p+'</p><p class="card-text" id="rx-id">Rx-ID: '+rX+'</p></div><div class="card-footer text-center"><div ><a id="order-btn-'+ i +'" class="donate-with-crypto btn btn-primary order-btn">Order</a></div></div></div></div>'
				arr[i] = p
				rxArr[i] = rX
				aidArr[i] = a
				drugs[i] = d
				i += 1
			}
		}
		$(".pr-main").html(str)

		var billModal = new bootstrap.Modal(document.getElementById('billModal'), {
			keyboard: false
		  })

		$(".order-btn").on("click", function(){
			orderIndex = getOrderNumber($(this).attr("id"))
			var price = arr[orderIndex]
			
			billModal.show()	
			
			$("#card-payment").on("click",function(){
				billModal.hide()
				payWithPaystack(parser(sessionStorage.getItem("basicData")).patient.email, price)	
			})

			$("#crypto-payment").on("click", function(){
				billModal.hide()
				switch(drugs[orderIndex]){
					case "Ampiclox":
						window.open('https://commerce.coinbase.com/checkout/15e01905-1ed6-4d78-bd86-1d50db8e960e')
						break
					case "Ibuprofen":
						window.open('https://commerce.coinbase.com/checkout/a749a27a-9162-4ec4-8721-fcbbf01accf2')
						break
					case "Lonart":
						window.open('https://commerce.coinbase.com/checkout/3d40b8d9-e9fc-4701-832c-8e2b186324c1')
						break
					case "Paracetamol":
						window.open('https://commerce.coinbase.com/checkout/1d5cc0fd-83a2-429a-838c-7869fad41528')
						break
					case "Panadol":
						window.open('https://commerce.coinbase.com/checkout/1d5cc0fd-83a2-429a-838c-7869fad41528')
						break
					default:
						alert("Error making payment")
				}
			})
		})
	})


}

function paystackCallback(response){
	let message = 'Payment for #'+ rxArr[orderIndex]+' complete! Reference: ' + response.reference;
	alert(message)

	var confirmPayment = {
		url : prodUrl+prescriptionE+aidArr[orderIndex],
		method: "PUT",
		data: {
			payment_status : "CONFIRMED"
		}
	}

	$.ajax(confirmPayment).done(function(){
		callPage($('#rx-link').attr('href'))
	})

}




// Fill .main-content div depending on link clicked.

function callPage(pageRefInput){
    $.ajax({
        url: pageRefInput,

        method: 'GET',

        dataType: 'text',

        success: function(response){
		    
			$(".main-content").html(response)

			try{
				getPageDetails(pageRefInput)									// make page's request calls						
				}
				catch{
					console.log("error getting page details")
				}
		
	},

        error: function(){
            console.log('the page failed to load');
        } ,

		complete: function(){
			console.log("page is ready")
		}
    })
}



function callCDashboardReqs(){
	var basicData = parser(sessionStorage.getItem("basicData"));
	
	var title = "Dr.";
	
	var fullname = (title + " " + basicData.consultant.last_name + " " + basicData.consultant.first_name + " " +  basicData.consultant.other_name).toUpperCase()
	
	$(".category").html(getCookie("category").toUpperCase())
	$(".fullname").html(fullname)
	$(".cid").html("00000"+basicData.consultant.consultant_id)
	$("#total_appts").html(basicData.consultant.appointments_completed)
	$("#total_rx").html(basicData.consultant.total_prescriptions)

		if(getCookie("category")==="consultant"){
		var getAppointment= {
			url : prodUrl + appointmentsE,
			method : "GET",
			data: {category: getCookie("category"), id: basicData.consultant.consultant_id}
		}
	}
	else{
		alert(404)
	}


	$.ajax(getAppointment).done(function(response){
		var s = ""
		var i = 0
		for(var appointment of Object.keys(response.appointments)){
			var c = response.appointments[appointment].patient_name
			var d = response.appointments[appointment].schedule_date
			var t = response.appointments[appointment].schedule_time
			var v = response.appointments[appointment].schedule_venue
			var r = response.appointments[appointment].schedule_reason
			var st = response.appointments[appointment].status

			if(st == "SCHEDULED"){
				s += "<tr><td>"+c+"</td><td>"+d+"</td><td>"+t+"</td><td>"+v+"</td><td>"+r+"</td></tr>"
				i++
				$(".upappt-no").css("display", "none");
				$(".upappt-yes").css("display", "block");
				if(i===2){
					break;
				}
			}
		}

		$(".dash-tbody").html(s);
	})
	var getActivities = {
		url: prodUrl +"/activities/"+getCookie("user_id"),
		method: "GET"
	}

	$.ajax(getActivities).done(function(response){
		var s= ""
		var h =   "<h4>Activities</h4>"
		for(var activity of Object.keys(response.activity)){
			var a = response.activity[activity].activity
			var d = response.activity[activity].create_date
			var t = response.activity[activity].time_stamp

			s+="<p class='activities'>"+d+" "+t+" : "+a+"</p>"

		}
		$(".right-column").html(h+s)
	})
}

function callCAppointmentReqs(){
	var parsed = parser(sessionStorage.getItem("basicData"))
	if(getCookie("category")==="consultant"){
		var getAppointment= {
			url : prodUrl + appointmentsE,
			method : "GET",
			data: {category: getCookie("category"), id: parsed.consultant.consultant_id}
		}
	}
	else{
		alert(404)
	}

	let CApptPromise = new Promise(function(myResolve,myReject){
		
		myResolve($.ajax(getAppointment).done(function(response){
		var s = ""
		var i = 1
		var string = "<td><div class = 'mark-as-complete-btn'>Mark as Completed</div></td>"
		for(var appointment of Object.keys(response.appointments)){
			var p = response.appointments[appointment].patient_name
			var d = response.appointments[appointment].schedule_date
			var t = response.appointments[appointment].schedule_time
			var v = response.appointments[appointment].schedule_venue
			var r = response.appointments[appointment].schedule_reason
			var st = response.appointments[appointment].status
			var aId = response.appointments[appointment].appointment_id

			if(st === "PENDING"){
				string = "<td><div id = 'approve' class = 'approve-toggle'></div></td>"
			}
		
			if(st === "SCHEDULED"){
				string = "<td><div class = 'mark-as-complete-btn'>MARK AS COMPLETED</div></td>"
			}
		
			if(st === "COMPLETED"){
				string = "<td><div class = 'marked-as-complete-btn'>MARK AS COMPLETED</div></td>"
			}
		
			if(st != "DONE"){
			s += "<tr class='warning '><th scope='row' id = '"+aId+"'>"+ i++ +"</th><td class='patienttd'>"+p+"</td><td class='datetd'>"+d+"</td><td class='timetd'>"+t+"</td><td class='venuetd'>"+v+"</td><td class='desctd'>"+r+"</td><td class='"+st.toLowerCase()+" statustd'>"+st+"</td>"+"<td><div class='emr'></div></td>"+string+"</tr>"			
			$(".no-appt").css("display", "none");
			$(".yes-appt").css("display", "block");
			}
			
		}

		$(".appt-tbody").html(s);
	}))

	myReject("Error 500")
})
	var myModal2 = new bootstrap.Modal(document.getElementById('c-appt-modal'), {
		keyboard: false
	  })
	var modalToggle2 = document.getElementsByClassName('approve-toggle')

	var myModal3 = new bootstrap.Modal(document.getElementById('confirmation-modal'), {
		keyboard: false
	})

	var modalToggle3 = document.getElementsByClassName('mark-as-complete-btn')

	var myModal4 = new bootstrap.Modal(document.getElementById('emr-modal'), {
		keyboard: false
	})

	var modalToggle4 = document.getElementsByClassName('emr')

	


	CApptPromise.then(
		function(value){
			var rx_option = false
			$(".emr").on("click", function(){
				myModal4.show(modalToggle4)
				var appt_id = ($(this).closest("tr").find("th").attr("id"))
				var getMedrecords = {
					url : prodUrl+medrecordsE+getPid(appt_id),
					method : "GET"
				}
				$.ajax(getMedrecords).done(function (response){
					$(".mr-height").html(response.vitals.height);
					$(".mr-weight").html(response.vitals.weight);
					$(".mr-bmi").html(response.vitals.bmi);
					$(".mr-temp").html(response.vitals.temperature);
					$(".mr-pulse").html(response.vitals.pulse);
					$(".mr-resp-rate").html(response.vitals.respiratory_rate);
					$(".mr-bp").html(response.vitals.blood_pressure);
					$(".mr-bos").html(response.vitals.blood_oxygen_saturation);
				})
			
				$.ajax(getMedrecords).done(function(response){
					
					var s = ""
					for(var diagnosis of Object.keys(response.diagnosis)){       //get key of response["diagnosis"]
						var d = response.diagnosis[diagnosis].diagnosis			//use the key returned to get diagnosis from response e.g response["d"][0]["d"]	
						s += '<li class="list-group-item"><span>'+d+'</span></li>'
					}
					$("#l-g-d").html(s)
				})
			
				$.ajax(getMedrecords).done(function(response){
					var s=""
					for(var visits of Object.keys(response.visits)){
						var v = response.visits[visits].visits
						s += '<li class="list-group-item"><span>'+v+'</span></li>'
							}
					$("#l-g-v").html(s)
				})
			
				$.ajax(getMedrecords).done(function(response){
					var s=""
					for(var allergy of Object.keys(response.allergies)){
						var a = response.allergies[allergy].allergy
						var r = response.allergies[allergy].reaction
						s += '<li class="list-group-item"><span>'+a+'</span>    | reaction - '+ r + '</li>'
					}
					$("#l-g-a").html(s)
			
				})
			
			})

			$(".mark-as-complete-btn").on("click", function(){
				myModal3.show(modalToggle3)
				var appt_id = ($(this).closest("tr").find("th").attr("id"))

				$("#yes-chk").on("click", function(){
					if($(this).is(':checked')){
						$("#rx").css("display","block")
						$("#no-chk").attr("disabled", "true")
						rx_option = true
					}
					else{
						$("#rx").css("display","none")
						$("#no-chk").removeAttr("disabled", "false")
					}
				})

				$("#no-chk").on("click",function(){
					if($(this).is(':checked')){
						$("#yes-chk").attr("disabled", "true")
						rx_option = false
					}
					else{
						$("#yes-chk").removeAttr("disabled", "false")
					}
				})

				var selected; 

				$("#drug-name").on("change", function(){
					selected = $(this).find('option:selected').text();
				})


				$("#submit-btn").on("click", function(){
					var diagnosis = $("#diagnosis").val()
					var drug_name = selected
					var drug_price;
					var drug_serving = $("#drug-serving").val()

					if(drug_name === "Ampiclox"){
						drug_price = 2000
					}
					else if(drug_name === "Ibuprofen"){
						drug_price = 5000
					}
					
					else if(drug_name === "Lonart"){
						drug_price = 5000
					}
					
					else if(drug_name === "Paracetamol"){
						drug_price = 5000
					}
					
					else if(drug_name === "Panadol"){
						drug_price = 5000
					}

					else{
						drug_price= -1
					}



					var completed = {
						url : prodUrl+appointmentE+appt_id,
						method : "PUT",
						data : {
							diagnosis: diagnosis,
							status:"COMPLETED"
						}
					}
					if(rx_option){
						var rx = {
							url : prodUrl+prescriptionE+appt_id,
							method : "POST",
							data : {
								patient_id : parseInt(getPid(appt_id)),
								consultant_id: parseInt(getCid(appt_id)), 
								drug_name : drug_name,
								serving : drug_serving,
								price : drug_price
							}
						}
					}
					
					sessionStorage.clear()
					getBasicData(getCookie("token"),getCookie("user_id"),getCookie("category"))
					$.ajax(completed).done(function(){
						$.ajax(rx).done(function(){
							callPage($('#cappt-link').attr('href'))
						})
			 		})
		 	})
			
		})
		
	
			$(".approve-toggle").on("click", function(){
				myModal2.show(modalToggle2)
				var patient = ($(this).closest("tr").find(".patienttd").html())
				var desc = ($(this).closest("tr").find(".desctd").html())
				var appt_id = ($(this).closest("tr").find("th").attr("id"))
				var status = ($(this).closest("tr").find(".statustd").html())
				var date =  ($(this).closest("tr").find(".datetd").html())
				var time =	 ($(this).closest("tr").find(".timetd").html())

				$("#patient-field").val(patient)
				$("#description-field").val(desc)
				
				if(date != "None" && time != "None"){
					$("#datepicker").val(date)
					$("#time-field").val(time)
				}
				

				$(function(){
				    $("#datepicker").datepicker();
				});

				$("#approve-btn").on("click", function(){
					var date = $("#datepicker").val()
					var time = $("#time-field").val()
					var venue = $("#venue-field").val()

					console.log(date + " " + status)

					var approveReq = {
						url : prodUrl+appointmentE+appt_id,
						method : "PUT",
						data : {date:date, time:time, venue:venue, status:status}
					}
					
					$.ajax(approveReq).done(function(){
						$("#modal-body").html("<div id='submit-success'><div id='checked-icon'></div><p>Appointment Request has been approved successfully</p><p>Appointment has been scheduled for "+date+".</p>")
						$("#ok-btn").css("visibility", "visible")
						$("#close-btn").css("visibility", "hidden")
						$("#approve-btn").css("visibility", "hidden")
					})

					$("#ok-btn").on("click", function(){
						myModal2.hide()
						callPage($('#cappt-link').attr('href'))
					})
				})
			})

		}
	)
	
}


//***********************------------Dispensary-----------*********************************//

function callDDashboardReqs(){
	var basicData = parser(sessionStorage.getItem("basicData"));
	
	var fullname = (basicData.dispensary.last_name + " " + basicData.dispensary.first_name).toUpperCase()
	
	$(".category").html(getCookie("category").toUpperCase())
	$(".fullname").html(fullname)
	$(".did").html("00000"+basicData.dispensary.dispensary_id)

	var getOrders = {
		url: prodUrl+"/prescriptions",
		method: "GET",
	}

	$.ajax(getOrders).done(function(response){
		var str = ""
		var i = 1
		for(var order of Object.keys(response.prescriptions)){
			var p = response.prescriptions[order].prescription_id
			var a = response.prescriptions[order].appointment_id
			var d = response.prescriptions[order].drug_name
			var s = response.prescriptions[order].serving
			var st = response.prescriptions[order].status
			
			str += "<tr class='warning '><th scope='row'>"+ i++ +"</th><td>"+p+"</td><td>"+a+"</td><td>"+d+"</td><td>"+s+"</td><td>"+st+"</td></tr>"

		//	if(st != "DONE"){
		//		s += "<tr class='warning '><th scope='row'>"+ i++ +"</th><td>"+p+"</td><td>"+a+"</td><td>"+d+"</td><td>"+s+"</td></tr>"
		//	}
		}

		$(".order-tbody").html(str);
	})

}


/*******************************************************************************
 * 
 * UTILITIES
 * 
 * 
 * ****************************************************************************
 */

function getCid(aId){
	var splittedAId = aId.split("-")
	return splittedAId[1]
}

function getPid(aId){
	var splittedAId = aId.split("-")
	return splittedAId[2]
}

function getOrderNumber(OrderBtn){
	var splitted = OrderBtn.split("-")
	return splitted[2]
}

function navCss(id){
	$("#pdashboard-link").removeClass("active")
	$("#cdashboard-link").removeClass("active")
	$("#ddashboard-link").removeClass("active")
	$("#medrecords-link").removeClass("active")
	$("#rx-link").removeClass("active")
	$("#appt-link").removeClass("active")
	$("#cappt-link").removeClass("active")
	$("#billing-link").removeClass("active")

	$(id).addClass("active")

	$("#dash-icon").attr("src", dashd)
	$("#mr-icon").attr("src", mrd)
	$("#rx-icon").attr("src", rxd)
	$("#appt-icon").attr("src", apptd)
	$("#bill-icon").attr("src", billd)


	if(id==="#pdashboard-link" || id === "#cdashboard-link" || id === "#ddashboard-link"){
		$("#dash-icon").attr("src", dashl)
	}
	else if(id==="#medrecords-link"){
		$("#mr-icon").attr("src", mrl)
	}
	else if(id==="#rx-link"){
		$("#rx-icon").attr("src", rxl)
	}
	else if(id==="#appt-link" || id === "#cappt-link" ){
		$("#appt-icon").attr("src", apptl)
	}
	else if(id==="#billing-link"){
		$("#bill-icon").attr("src", billl)
	}
	else{
		alert("404")
	}
}

function getPageDetails(url){
	if(url=== $('#pdashboard-link').attr('href')){   //here the path isnt specified cos it would return dashboard eitherway if none of this link conditios are met
		navCss('#pdashboard-link')
		callPDashboardReqs();
	}
	else if(url === $("#cdashboard-link").attr('href')){
		getBasicData(getCookie("token"),getCookie("user_id"),getCookie("category"))
		navCss('#cdashboard-link')
		callCDashboardReqs();
	}
	else if(url === $("#ddashboard-link").attr('href')){
		navCss('#ddashboard-link')
		callDDashboardReqs();
	}
	else if(url === $('#medrecords-link').attr('href')){       // url is returned by  href attribute of anchor tag so we explicitly specified the link to it here
		navCss('#medrecords-link')
		callMedrecordsReqs();		
	}	
	else if(url === $('#rx-link').attr('href')){
		navCss('#rx-link')
		callPRxReqs();
	
	}
	
	else if(url === $('#billing-link').attr('href')){
		navCss('#billing-link')
		return "billing"
	}
	else if(url === $('#appt-link').attr('href')){
		navCss('#appt-link')
		callPAppointmentReqs();
	}
	else if(url === $('#cappt-link').attr('href')){
		navCss('#cappt-link')
		callCAppointmentReqs();
	}

	else{
		alert(404)
	}
}
