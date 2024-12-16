// Check If There Is Local Storage Color Option
let mainColors = localStorage.getItem("color_option")
if(mainColors !== null){
    document.documentElement.style.setProperty('--main-color' , mainColors)
    // Remove Active Class From All Color List Items With ForEach Loop
    document.querySelectorAll(".colors-list li").forEach(element => {
    element.classList.remove("active");
    // Add Active Class On Element With Data-Color === Local Storage Item
    if(element.dataset.color === mainColors){
        //Add Active Class
        element.classList.add("active")
    }
})
}

//********************************************************************************/

// Random Background Option
let backgroundOptions = true;

// Variable To Control Background setInterval
let backgroundInterval;

// Check In Local Storage If There Is Background Item
let backgroundLocalItem = localStorage.getItem("background_option")

//Check If Random Background Local Storage Is Not Empty
if(backgroundLocalItem !== null){
    if(backgroundLocalItem === 'true'){
        backgroundLocalItem = true
    }else{
        backgroundLocalItem = false
    }
    // Remove Active Class From All Span Using ForEach Loop
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove(".active")
    })
    if(backgroundLocalItem === 'true'){
        document.querySelector(".random-backgrounds .btn-yes").classList.add(".active")
    }else{
        document.querySelector(".random-backgrounds .btn-no").classList.add(".active")
    }
}


//********************************************************************************/

// Show Bullets Option
let bulletsSpan =  document.querySelectorAll(".show-bullets span")
let bulletsContainer = document.querySelector(".nav-bullets")
let bulletLocalItem = localStorage.getItem("bullets_option")

    if(bulletLocalItem !== null){
        bulletsSpan.forEach(span => {
            span.classList.remove("active")
        })

        if(bulletLocalItem === 'block'){
            bulletsContainer.style.display = 'block'
            document.querySelector(".show-bullets .btn-yes").classList.add("active")
            document.querySelector(".show-bullets .btn-no").classList.add("active")
        }
    }

bulletsSpan.forEach(span => {
    span.addEventListener("click" , (e) => {

        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block'
            localStorage.setItem("bullets_option" , "block")
        }else{
            bulletsContainer.style.display = 'none'
            localStorage.setItem("bullets_option" , "none")
        }
        handleActive(e)
    })
})

//********************************************************************************/

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    //Toggle Class fa-spin
    this.classList.toggle("fa-spin")
    //Toggle Class Open On Settings Box
    document.querySelector(".settings-box").classList.toggle("open")
}

//********************************************************************************/

// Switch Website Colors
const colorsLi = document.querySelectorAll(".colors-list li")

// Loop On List Items (li)
colorsLi.forEach(li => {
    // Click On Every List Items (li)
    li.addEventListener("click" , (e) => {
        // Set Color On Root As A Main Color Of Website
        document.documentElement.style.setProperty('--main-color' , e.target.dataset.color)
        // Set Colors In Local Storage
        localStorage.setItem("color_option" , e.target.dataset.color )
        handleActive(e)
    })
})

//********************************************************************************/

// Switch Website Backgrounds
const randomBackgroundsElement = document.querySelectorAll(".random-backgrounds")

// Loop On Spans
randomBackgroundsElement.forEach(span => {
    // Click On Every Span
    span.addEventListener("click" , (e) => {

        handleActive(e)

        if(e.target.dataset.background === "yes"){
            backgroundOptions = true
            randomizeImgs()
            localStorage.setItem("background_option" , true)
        }else{
            backgroundOptions = false
            clearInterval(backgroundInterval)
            localStorage.setItem("background_option" , false)
        }
    })
})

//********************************************************************************/

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page")
// Get Array Of Imgs
let imgsArray = ["burger.jpg" ,"Croissant.jpg" , "fries.jpg" , "resturant.jpg" , "resturant2.jpg" , "steak.jpg"]

//********************************************************************************/

// Function To Randomize Imgs
function randomizeImgs(){
    if(backgroundOptions === true){
// Change Background Timer
backgroundInterval = setInterval(() => {
    // Get Random Number 
let randomNumber = Math.floor(Math.random() * imgsArray.length)
// Change Background Image URl
landingPage.style.backgroundImage = 'url("../IMAGES/' + imgsArray[randomNumber] + '")';
}, 1000);
    }
}

randomizeImgs()

//********************************************************************************/

// Select Skills Selector 
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop
    // Skills Outer Height 
    let skillsOuterHeight = ourSkills.offsetHeight
    // Window Height
    let windowHeight = this.innerHeight
    // Window Scroll Top
    let windowScrollTop = this.pageYOffset

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    }
}
//********************************************************************************/

// Create Pop Up With The Image 
let ourGallery = document.querySelectorAll(".gallery img")
// Loop On Gallery
ourGallery.forEach(img => {
    img.addEventListener('click' , (e) => {
        // Create Overlay Element
        let overlay =  document.createElement("div")
        // Add Class To Overlay
        overlay.className = 'popup-overlay'
        // Append Overlay TO The Body 
        document.body.appendChild(overlay)
        // Create The Popup
        let popupBox = document.createElement("div")
        // Add Class To Popup Box
        popupBox.className = 'popup-box'

                // Adding alt"" Text
                if(img.alt !== null){
                    // Create Heading
                    let imgHeading =  document.createElement("h3")
                    // Create Text For Heading
                    let imgText = document.createTextNode(img.alt)
                    // Append The Text To The Heading
                    imgHeading.appendChild(imgText)
                    // Append Heading To Popup Box
                    popupBox.appendChild(imgHeading)
                }

        // Create The Image
        let popupImage = document.createElement("img")
        // Set Img Source
        popupImage.src = img.src
        // Add Img To Popup Box
        popupBox.appendChild(popupImage)
        // Append Popup Box To Body
        document.body.appendChild(popupBox)
        // Create The Close Span 
        let closeBtn = document.createElement("span")
        // Create The Close Button Text
        let closeBtnText = document.createTextNode("X")
        // Append Text To Close Button
        closeBtn.appendChild(closeBtnText)
        // Add Class To Close Button
        closeBtn.className = 'close-button'
        // Add Close Button To Popup Box
        popupBox.appendChild(closeBtn)
    })
})

// Close Popup
document.addEventListener("click" , function(e){
    if(e.target.className == 'close-button'){
        // Remove Current Popup
        e.target.parentNode.remove()
        // Remove Overlay 
        document.querySelector(".popup-overlay").remove()
    }
})

//********************************************************************************/

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet")

// Select All Links
const allLinks = document.querySelectorAll(".links a")

function scrollToSpecSection(elements) {
elements.forEach(element => {
    element.addEventListener("click" , e => {
        e.preventDefault()
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        })
    })
})
}

scrollToSpecSection(allBullets)
scrollToSpecSection(allLinks)

//********************************************************************************/

// Handle Active State 
function handleActive(event){
    // Remove Active Class From All Childrens
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active")
    })
    // Add Active Class On Self
    event.target.classList.add("active")
}

//********************************************************************************/

// Button Reset Options
document.querySelector(".reset-options").onclick = function (){
    localStorage.removeItem("color_option")
    localStorage.removeItem("background_option")    
    localStorage.removeItem("bullets_option")
    // Reload WebPage
    window.location.reload()
}

//********************************************************************************/

// Toggle Menu
let toggleMenuBtn = document.querySelector(".toggle-menu")
let tLinks =  document.querySelector(".links")
toggleMenuBtn.onclick = function (e){
    // Stop Propagation
    e.stopPropagation();
    // Toggle Class "menu-active" On Button 
    toggleMenuBtn.classList.toggle("menu-active")
    // Toggle Class "open" On Links 
    tLinks.classList.toggle("open")
}
//********************************************************************************/

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click" , (e) => {
    if(e.target !== toggleMenuBtn && e.target !== tLinks){
        // Check If Menu Is Opened 
        if(tLinks.classList.contains("open")){
                // Toggle Class "menu-active" On Button 
                    toggleMenuBtn.classList.toggle("menu-active")
                // Toggle Class "open" On Links 
                    tLinks.classList.toggle("open")
        }
    }
})

// Stop Propagation On Menu
tLinks.onclick = function (e){
    e.stopPropagation();
}

//********************************************************************************/



//********************************************************************************/



