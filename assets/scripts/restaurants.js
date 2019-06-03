document.addEventListener("DOMContentLoaded", () => {
    
    const restaurants=[{
        id: "r1",
        title: "More",
        thumb: "./assets/images/1.jpeg",
        description: "#INFO ABOUT RESTAURANT",
        menu: ["meso 50kn","pizza 50kn", "piletina 30kn"],
        tables: ["A1","A2","A3","A4","A5","B1","C1","B5","C5","E5"]
        },{
        id: "r2",
        title: "Split",
        thumb: "./assets/images/2.jpg",
        description: "#INFO ABOUT RESTAURANT",
        menu: ["palacinke 20kn","pizza 50kn", "piletina 30kn"],
        tables: ['A1','A2','B1','B2','C2','C3','A4','A5','B5','D5']
        },{
        id: "r3",
        title: "Dalmacija",
        thumb: "./assets/images/3.jpeg",
        description: "#INFO ABOUT RESTAURANT",
        menu: ["pomfri 10kn","pizza 50kn", "piletina 30kn"],
        tables: ['A1','A2','A3','A4','A5','E3','E4','E5','D5','E5']
        },{
        id: "r4",
        title: "Jadran",
        thumb: "./assets/images/4.jpg",
        description: "#INFO ABOUT RESTAURANT",
        menu: ["meso 50kn","pizza 50kn", "piletina 30kn"],
        tables: ['A1','A2','B1','B2','C3','C4','D3','D4','D5','E5']
        },{
        id: "r5",
        title: "Beach",
        thumb: "./assets/images/5.jpg",
        description: "#INFO ABOUT RESTAURANT",
        menu: ["meso 50kn","pizza 50kn", "piletina 30kn"],
        tables: ['A1','A2','B1','B2','C3','C4','D3','D4','D5','E5']
        },{
        id: "r6",
        title: "Sea",
        thumb: "./assets/images/6.jpg",
        description: "#INFO ABOUT RESTAURANT",
        menu: ["meso 50kn","pizza 50kn", "piletina 30kn"],
        tables: ['A1','A2','B1','B2','C3','C4','D3','D4','D5','E5']
    }];
    

    const restaurantTemplate=document.querySelector("#restaurant-template");
    const listContainer=document.querySelector("#restaurantList");    

    for(const r of restaurants)
    {
        createAndAddCard(r);       
    };

    function createAndAddCard(r){
        const rElement = document.importNode(restaurantTemplate.content, true); 

        
        //Stavljamo ime restorana
		rElement.querySelector(".card-title").textContent=r.title;    
        rElement.querySelector(".card-text").textContent=r.description;
        rElement.querySelector("img").src=r.thumb;

        //Unos jelovnika restorana i odredivanje modala za jelovnik
        const menuBtn = rElement.querySelector('.menuBtn');
        menuBtn.dataset.target="."+r.id;

        const modal=rElement.querySelector(".menuModal");
        modal.classList.add(r.id);
        modal.querySelector(".modal-title").textContent="Jelovnik restorana "+r.title;
        for(m of r.menu){
            var para = document.createElement("p");
            var node = document.createTextNode(m);
            para.appendChild(node);
            var element = modal.querySelector(".modal-body");
            element.appendChild(para);
        }

        //Ulazak u modal za 1.dio rezervacije
        rElement.querySelector(".reservationBtn").id=r.id;
        rElement.querySelector(".reservationBtn").dataset.target="."+r.id+"R";
        const modal2=rElement.querySelector(".resModal");
        modal2.classList.add(r.id+"R");
        modal2.querySelector(".modal-title").textContent="Rezerviraj u restoranu "+r.title;

        //1.dio rezervacije
        rElement.querySelector(".reservationBtn").addEventListener("click", handleReservationClick);
        rElement.querySelector(".calendarClass").id="datepicker"+r.id;        
        rElement.querySelector(".timeClass").id="timepicker"+r.id;


        rElement.querySelector(".nextButton").value=r.title;       

        listContainer.appendChild(rElement);     
    }
    
    function handleReservationClick(e){
	
        const calendarId = e.currentTarget.id;
        const timepicker = document.querySelector("#timepicker"+e.currentTarget.id);
        var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        $("#datepicker"+calendarId).datepicker({
                uiLibrary: 'bootstrap4',
                format: 'dd/mm/yyyy',
                minDate: today
        });
    }

    function makeCookies(e){
        console.log("NextButton clicked");

            fetch('/timeReservation', {method: 'POST'})
            .then(function(response) {
            if(response.ok) {
                console.log('isa je dalje');
                return;
            }
            throw new Error('Request failed.');
            })
            .catch(function(error) {
            console.log(error);
            });
     }
    
    
});
