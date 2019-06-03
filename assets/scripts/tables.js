document.addEventListener("DOMContentLoaded", () => {

    //Tlocrt-kalup
    const allTables=document.querySelectorAll(".tablesClass tr td img");
    for(aT of allTables){
        aT.src="./assets/images/tlocrti/invisibletable.png"; }
    
    fetch('/timeReservation', {method: 'GET'})
        .then(function(response) {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(function(restaurant) {
            var tlocrt = document.querySelector(".tablesClass");
            for(t of restaurant[0].tables){
                console.log(t);
                let table= tlocrt.querySelector("."+t+" img");
                table.src="./assets/images/tlocrti/freetable.png";
                table.classList.add("freeTable");
                table.style.cursor="pointer";
                table.name=t;
                table.addEventListener("click", handleTableReservationClick);
            }
            var r;
            var start = parseInt(restaurant[1].startTime);
            var end = parseInt(restaurant[1].endTime);
            for(r in restaurant){
                console.log(restaurant[r]);
                if(r!=0 && r!=1){
                    var startR = parseInt(restaurant[r].startTime);
                    var endR = parseInt(restaurant[r].endTime);
                    console.log("Provjera: "+startR+" "+endR);
                    if((startR<=start && endR>=start) || (startR<=end && endR>=end) || (startR>=start && endR<=end))
                    {
                        var start = parseInt(restaurant[1].startTime);
                        var end = parseInt(restaurant[1].endTime);

                        let table=tlocrt.querySelector("."+restaurant[r].table+" img");
                        console.log(restaurant[r].table+" "+table);
                        table.src="./assets/images/tlocrti/reservedtable.png";
                        table.classList.add("reservedTable");
                        table.style.cursor="auto";
                        table.removeEventListener("click", handleTableReservationClick);
                    }
                }
            }
        })
        .catch(function(error) {
            console.log(error);
        });


    function handleTableReservationClick(e){
        const table=e.currentTarget;
        const free="./assets/images/tlocrti/freetable.png";
        const clicked="./assets/images/tlocrti/clickedtable.png";
        if(table.classList.contains("freeTable")){
            var clickedTabel=document.querySelector('.clickedTable');
            if(clickedTabel) {
                clickedTabel.classList.remove("clickedTable");
                clickedTabel.classList.add("freeTable");
                clickedTabel.src=free;
            }
            table.classList.add("clickedTable");
            table.classList.remove("freeTable");
            table.src=clicked;
            document.cookie="table="+table.name;
        }
        else if(table.classList.contains("clickedTable")){
            table.classList.remove("clickedTable");
            table.classList.add("freeTable");
            table.src=free;
            
        }

    }    

    
});
