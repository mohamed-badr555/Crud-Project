
// crud 
var pn = document.getElementById("pn");
var pp = document.getElementById("pp");
var pc = document.getElementById("pc");
var pd = document.getElementById("pd");
var add = document.getElementById("add");
var error1 = document.querySelector(".error1")
var error2 = document.querySelector(".error2")
var error3 = document.querySelector(".error3")
var error4 = document.querySelector(".error4")
var regexprice =/^([5-9]|[1-9][0-9]{1,5}|1000000)$/m;
var regex = /^[A-Z][a-z]{3,10}$/;
var allProducts = [];
var myIndex;
if (localStorage.getItem("allProducts") != null) {
    allProducts = JSON.parse(localStorage.getItem("allProducts"))
    display()

}

pp.addEventListener("keyup",function(){
    if (regexprice.test( pp.value) == false) {
        console.log("error", pp.value);
        error2.classList.add( "d-block");
        error2.classList.remove( "d-none");
        error2.innerHTML = "Price Product must be from 5 to 1000000";
    }else{
        console.log("right");

        error2.classList.remove( "d-block");
        error2.classList.add( "d-none");
    }
})
function addProduct() {
    if (productNameValidation() || productNameEmpty()||priceValidation()||priceEmpty()||categoryEmpty()||disEmpty()) {
        if (productNameValidation()) {
            error1.classList.replace("d-none", "d-block")
            error1.innerHTML = "the first letter is Capitalize and at least four characrater ";
        }
        if (productNameEmpty()) {
            error1.classList.replace("d-none", "d-block")
            error1.innerHTML = "You Must Fill Field";
        }
       
        if (productNameEmpty() == false && productNameValidation()==false) {
            error1.classList.replace("d-block", "d-none");
        }

        if (priceValidation()) {
            error2.classList.replace("d-none", "d-block")
            error2.innerHTML = "Price Product must be from 5 to 1000000";
        }

        if (priceEmpty()) {
            error2.classList.replace("d-none", "d-block")
            error2.innerHTML = "You Must Fill Field";
        }
        if (priceValidation()==false) {
            error2.classList.replace("d-block","d-none")
        }
        if (categoryEmpty()) {
            error3.classList.replace("d-none", "d-block")
            error3.innerHTML = "You Must Fill Field";
        }
        if (categoryEmpty()==false) {
            error3.classList.replace("d-block","d-none")
        }
        if (disEmpty()) {
            error4.classList.replace("d-none", "d-block")
            error4.innerHTML = "You Must Fill Field";
        }
        if (disEmpty()==false) {
            error4.classList.replace("d-block", "d-none")
      
        }
    } else {
        error1.classList.replace("d-block", "d-none")
        error2.classList.replace("d-block", "d-none")
        error3.classList.replace("d-block", "d-none")
        error4.classList.replace("d-block", "d-none")
        if (document.getElementById("add").innerHTML == "Add") {
            var product = {
                pnValue: pn.value,
                ppValue: Number(pp.value),
                pcValue: pc.value,
                pdValue: pd.value
            }

            allProducts.push(product);
            localStorage.setItem("allProducts", JSON.stringify(allProducts))
            clearForm();
            display();
        } else {
            allProducts[myIndex].pnValue = pn.value;
            allProducts[myIndex].ppValue = Number(pp.value);
            allProducts[myIndex].pcValue = pc.value;
            allProducts[myIndex].pdValue = pd.value;
            localStorage.setItem("allProducts", JSON.stringify(allProducts))
            display();
            clearForm();
            add.innerHTML = "Add";
        }
    }
}
function clearForm() {
    pn.value = "";
    pp.value = "";
    pc.value = "";
    pd.value = "";
}
function display() {

    var cartoona = "";
    for (var i = 0; i < allProducts.length; ++i) {
        cartoona += `    <tr>
    <td>${i + 1}</td>
    <td>${allProducts[i].pnValue}</td>
    <td>${allProducts[i].ppValue}</td>
    <td>${allProducts[i].pcValue}</td>
    <td>${allProducts[i].pdValue}</td>
    <td>
        <button onclick="updateElement(${i})" class="btn btn-warning">Update</button>
    </td>
    <td>
        <button onclick="deleteElement(${i})" class="btn btn-danger">Delete</button>
    </td>
    </tr>`

    }

    document.getElementById('tbody').innerHTML = cartoona;
}

function deleteElement(index) {
    allProducts.splice(index, 1);
    localStorage.setItem("allProducts", JSON.stringify(allProducts))
    display()
}
function updateElement(index) {
    myIndex = index;
    add.innerHTML = "Update";
    pn.value = allProducts[index].pnValue;
    pp.value = allProducts[index].ppValue;
    pc.value = allProducts[index].pcValue;
    pd.value = allProducts[index].pdValue;


}

function search(term) {
    var cartoona = "", count = 1;
    for (var i = 0; i < allProducts.length; ++i) {
        if (allProducts[i].pnValue.toLowerCase().includes(term.toLocaleLowerCase())) {
            cartoona += `    <tr>
            <td>${count++}</td>
            <td>${allProducts[i].pnValue}</td>
            <td>${allProducts[i].ppValue}</td>
            <td>${allProducts[i].pcValue}</td>
            <td>${allProducts[i].pdValue}</td>
            <td>
                <button onclick="updateElement(${i})" class="btn btn-warning">Update</button>
            </td>
            <td>
                <button onclick="deleteElement(${i})" class="btn btn-danger">Delete</button>
            </td>
            </tr>`
        }
    }
    document.getElementById('tbody').innerHTML = cartoona;
}
function productNameEmpty() {
    if (pn.value.trim() == "") {
        return true;
    }
    return false;
}
function productNameValidation() {
    
    return !regex.test(pn.value);
}
function priceEmpty() {
    if (pp.value.trim() == "") {
        return true;
    }
    return false;
}
function priceValidation() {
  
    return !regexprice.test(Number(pp.value));
    
}
function categoryEmpty() {
    if (pc.value.trim() == "") {
        return true;
    }
    return false;
}
function disEmpty() {
    if (pd.value.trim() == "") {
        return true;
    }
    return false;
}
