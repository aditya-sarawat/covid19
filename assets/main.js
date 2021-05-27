let covid = {
	getstateData: function() {
		fetch("https://api.covid19india.org/v4/min/data.min.json")
		.then(response => {
			return response.json();
		})
		.then(data => this.setstateData(data));
	},

	setstateData: function(data) {
		const { confirmed } = data.TT.total;
		const { deceased } = data.TT.total;
		const { recovered } = data.TT.total;
		const { tested } = data.TT.total;
		const { vaccinated } = data.TT.total;
		const { last_updated } = data.TT.meta.vaccinated;
		document.getElementById("test").innerText = tested.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		document.getElementById("Confirmed").innerText = confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		document.getElementById("Decreased").innerText = deceased.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		document.getElementById("Recovered").innerText = recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		document.getElementById("Vaccinated").innerText = vaccinated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		let active = (confirmed - recovered - deceased);
		document.getElementById("Active").innerText = active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		let date = this.formatDate(last_updated);
		document.getElementById("last_updated").innerText = "As of " + date;
		addTableData.createAndAdd(data, last_updated);
	},

	formatDate: function(last_updated) {
		var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        let date;
        if (last_updated[last_updated.length - 2] == 0) {
        	date = last_updated[last_updated.length - 1];
        }
        else {
        	date = last_updated[last_updated.length - 2] + last_updated[last_updated.length - 1];
        }
        let m;
        if (last_updated[last_updated.length - 5] == 0) {
        	m = last_updated[last_updated.length - 4];
        }
        else {
        	m = last_updated[last_updated.length - 5] + last_updated[last_updated.length - 4];
        }

        let mth = month[m - 1];
        
        return (date + " " + mth); 
	},

	searchInputData: function() {
		fetch("https://api.covid19india.org/v4/min/data.min.json")
		.then(response => {
			return response.json();
		})
		.then(data => this.displayHeadSearch(data));
	},

	displayHeadSearch: function(data) {
		const value = document.querySelector(".text").value;
		let codes = {
			"AN":"Andaman and Nicobar Islands",
		    "AP":"Andhra Pradesh",
		    "AR":"Arunachal Pradesh",
		    "AS":"Assam",
		    "BR":"Bihar",
		    "CG":"Chandigarh",
		    "CH":"Chhattisgarh",
		    "DN":"Dadra and Nagar Haveli",
		    "DD":"Daman and Diu",
		    "DL":"Delhi",
		    "GA":"Goa",
		    "GJ":"Gujarat",
		    "HR":"Haryana",
		    "HP":"Himachal Pradesh",
		    "JK":"Jammu and Kashmir",
		    "JH":"Jharkhand",
		    "KA":"Karnataka",
		    "KL":"Kerala",
		    "LA":"Ladakh",
		    "LD":"Lakshadweep",
		    "MP":"Madhya Pradesh",
		    "MH":"Maharashtra",
		    "MN":"Manipur",
		    "ML":"Meghalaya",
		    "MZ":"Mizoram",
		    "NL":"Nagaland",
		    "OR":"Odisha",
		    "PY":"Puducherry",
		    "PB":"Punjab",
		    "RJ":"Rajasthan",
		    "SK":"Sikkim",
		    "TN":"Tamil Nadu",
		    "TS":"Telangana",
		    "TR":"Tripura",
		    "UP":"Uttar Pradesh",
		    "UK":"Uttarakhand",
		    "WB":"West Bengal"
		};

		let check = 0;
		
		if (value === "India" || value === "india") {
			check = 999;
			const { confirmed } = data.TT.total;
			const { deceased } = data.TT.total;
			const { recovered } = data.TT.total;
			const { vaccinated } = data.TT.total;
			const { last_updated } = data.TT.meta.vaccinated;
			document.querySelector(".Place").innerHTML =  `<i class="fas fa-map-marker-alt"></i>` + `India`;
			document.getElementById("Confirmed").innerText = confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			document.getElementById("Decreased").innerText = deceased.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			document.getElementById("Recovered").innerText = recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			document.getElementById("Vaccinated").innerText = vaccinated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			
			let active = (confirmed - recovered - deceased);
			document.getElementById("Active").innerText = active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			document.querySelector(".text").value = "";
		}
		else {
			for (let key in codes) {
				if (codes[key].toLowerCase() == value.toLowerCase()) {
					check = 999;
					document.querySelector(".Place").innerHTML =  `<i class="fas fa-map-marker-alt"></i>` + codes[key].toString();
					const { confirmed } = data[key].total;
					const { deceased } = data[key].total;
					const { recovered } = data[key].total;
					const { vaccinated } = data[key].total;
					const { last_updated } = data[key].total;
					document.getElementById("Confirmed").innerText = confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					document.getElementById("Decreased").innerText = deceased.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					document.getElementById("Recovered").innerText = recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					document.getElementById("Vaccinated").innerText = vaccinated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					
					let active = (confirmed - recovered - deceased);
					document.getElementById("Active").innerText = active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					document.querySelector(".text").value = "";
				}
			}
		}

		if (check === 0) {
			document.querySelector(".text").value = "";
			alert(`Please enter name of state!`);
		}
	}
}


let addTableData = {
	createAndAdd: function(data, date) {
		let codes = {
			"AN":"Andaman and Nicobar Islands",
		    "AP":"Andhra Pradesh",
		    "AR":"Arunachal Pradesh",
		    "AS":"Assam",
		    "BR":"Bihar",
		    "CG":"Chandigarh",
		    "CH":"Chhattisgarh",
		    "DN":"Dadra and Nagar Haveli",
		    "DD":"Daman and Diu",
		    "DL":"Delhi",
		    "GA":"Goa",
		    "GJ":"Gujarat",
		    "HR":"Haryana",
		    "HP":"Himachal Pradesh",
		    "JK":"Jammu and Kashmir",
		    "JH":"Jharkhand",
		    "KA":"Karnataka",
		    "KL":"Kerala",
		    "LA":"Ladakh",
		    "LD":"Lakshadweep",
		    "MP":"Madhya Pradesh",
		    "MH":"Maharashtra",
		    "MN":"Manipur",
		    "ML":"Meghalaya",
		    "MZ":"Mizoram",
		    "NL":"Nagaland",
		    "OR":"Odisha",
		    "PY":"Puducherry",
		    "PB":"Punjab",
		    "RJ":"Rajasthan",
		    "SK":"Sikkim",
		    "TN":"Tamil Nadu",
		    "TS":"Telangana",
		    "TR":"Tripura",
		    "UP":"Uttar Pradesh",
		    "UK":"Uttarakhand",
		    "WB":"West Bengal"
		};

		let shadow = false;

		for (let key in data) {
			if (codes[key] === undefined) { continue; }

			const tableVal = document.createElement("div");
			tableVal.classList.add("tableValues");
			if(shadow == true) {
				tableVal.classList.add("shadow");
			}

			const state = document.createElement("div");
			state.classList.add("tableHeadName");
			state.innerText = codes[key];
			const confirmed = document.createElement("div");
			confirmed.classList.add("tableHeadName");
			confirmed.innerText = data[key].total.confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			const active = document.createElement("div");
			active.classList.add("tableHeadName");
			let Avalue = data[key].total.confirmed - data[key].total.recovered - data[key].total.deceased;
			active.innerText = Avalue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			const recovered = document.createElement("div");
			recovered.classList.add("tableHeadName");
			recovered.innerText = data[key].total.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			const decreased = document.createElement("div");
			decreased.classList.add("tableHeadName");
			decreased.innerText = data[key].total.deceased.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			const vaccinated = document.createElement("div");
			vaccinated.classList.add("tableHeadName");
			vaccinated.innerText = data[key].total.vaccinated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			const tested = document.createElement("div");			
			tested.classList.add("tableHeadName");
			tested.innerText = data[key].total.tested.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

			tableVal.appendChild(state);
			tableVal.appendChild(confirmed);
			tableVal.appendChild(active);
			tableVal.appendChild(recovered);
			tableVal.appendChild(decreased);
			tableVal.appendChild(vaccinated);
			tableVal.appendChild(tested);

			document.querySelector(".table").appendChild(tableVal);

			if (shadow == true) { shadow = false }
			else { shadow = true}
		}
		return;
	},
}

covid.getstateData();