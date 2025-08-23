gsap.registerPlugin(ScrollTrigger)

const article = document.querySelectorAll("article")
const hiragana = document.querySelectorAll(".gyou > li")

let isHoverChars;
checkEventType()
function checkEventType() {
    if(window.matchMedia("(min-width: 600px)").matches) {
        isHoverChars = true
    }
}

function resetDataContents() {
    const largeChars = document.querySelectorAll("h4")

    article.forEach(article => {
        if(article.dataset.current) {
            delete article.dataset.current
        }
    })

    largeChars.forEach(char => {
        if(char.dataset.current) {
            delete char.dataset.current
        }
    })
}

hiragana.forEach(char => {
    char.addEventListener("mouseover", toggleTwoDisplay)
    char.addEventListener("mouseleave", toggleTwoDisplay)
    char.addEventListener("touchstart", toggleTwoDisplay)
    char.addEventListener("touchend", toggleTwoDisplay)
})

hiragana.forEach(char => {
    gsapScrollChar(char)
})

// handleByScroll()
// function handleByScroll() {
//     hiragana.forEach(char => {
//         const charId = char.dataset.charId
    
//         const mm = gsap.matchMedia()

//         mm.add("(max-width: 599px)", () => {
//             ScrollTrigger.create({
//                 trigger: char,
//                 start: "top 60%",
//                 onEnter: () => {
//                     console.log("gsap")
//                     if(charId) toggleCharContent(charId)

//                 },
//                 onLeaveBack: () => {
//                     if(charId) {
//                         toggleCharContent(charId)
//                     }
//                 },
//             })
//         })
//     })
// }

function gsapScrollChar(char) {
    const charId = char.dataset.charId
    const mm = gsap.matchMedia()

    mm.add("(max-width: 599px)", () => {
        ScrollTrigger.create({
            trigger: char,
            start: "top 50%",
            onEnter: () => toggleCharContent(charId),
            onLeaveBack: () => toggleCharContent(charId)
        })
    })
}



function toggleTwoDisplay(e) {
    const checkForHover = window.matchMedia("(min-width: 600px)").matches
    if(!checkForHover) return;

    const target = e.target
    const charId = target.dataset.charId

    toggleCharContent(charId)
    toggleLargeChar(charId)

}

function toggleCharContent(charId) {
    const content = document.getElementById(charId)

    if(content.dataset.current) {
        delete content.dataset.current
    } else {
        content.dataset.current = true
    }
}

function toggleLargeChar(charId) {
    const data = `large-${charId}`
    const largeChar = document.getElementById(data)

    if(largeChar.dataset.current) {
        delete largeChar.dataset.current
    } else {
        largeChar.dataset.current = true
    }
}


const siteWidth = document.querySelector(".site-width")
window.addEventListener("resize", e => {
    const w = window.innerWidth
    siteWidth.textContent = w

    resetDataContents()
    checkEventType()
    // handleByScroll()
})

