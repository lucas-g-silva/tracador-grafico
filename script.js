const canvas = document.getElementById("graphic");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * dpr;
canvas.height = canvas.clientHeight * dpr;
ctx.scale(dpr, dpr);

var zoom = 20;
var click = false;
var org = {
    x: canvas.clientWidth / 2,
    y: canvas.clientHeight / 2
}

var shPoints = false;
var shGrid = true;

var gridStep = 5;

draw();

function draw() {

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgb(25, 25, 25)"
    ctx.fillRect(0, 0, width, height);

    graphic(ctx, width, height);
    parabol(ctx, width, height);
    calc();
};

function graphic(ctx, width, height) {
    ctx.lineWidth = 1;
    ctx.font = "10px Inter";
    ctx.fillStyle = "rgb(100, 100, 100)";

    for (let i = org.x + zoom; i <= width; i += zoom) {
        if (shGrid) {
            ctx.strokeStyle = (i - org.x) % (gridStep * zoom) == 0 ? "rgb(35, 35, 35)" : "rgb(30, 30, 30)";
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }

        if ((i - org.x) % (gridStep * zoom) == 0) {
            ctx.fillText((i - org.x) / zoom, i - ctx.measureText((i - org.x) / zoom).width / 2, org.y + 15);
        }
    }
    for (let i = org.x - zoom; i >= 0; i -= zoom) {
        if (shGrid) {
            ctx.strokeStyle = (i - org.x) % (gridStep * zoom) == 0 ? "rgb(35, 35, 35)" : "rgb(30, 30, 30)";
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }

        if ((i - org.x) % (gridStep * zoom) == 0) {
            ctx.fillText((i - org.x) / zoom, i - ctx.measureText((i - org.x) / zoom).width / 2, org.y + 15);
        }
    }
    for (let i = org.y + zoom; i <= height; i += zoom) {
        if (shGrid) {
            ctx.strokeStyle = (i - org.y) % (gridStep * zoom) == 0 ? "rgb(35, 35, 35)" : "rgb(30, 30, 30)";
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }
        if ((i - org.y) % (gridStep * zoom) == 0) {
            ctx.fillText((i - org.y) / -zoom, org.x - ctx.measureText((i - org.y) / -zoom).width - 5, i + 5);
        }
    }
    for (let i = org.y - zoom; i >= 0; i -= zoom) {
        if (shGrid) {
            ctx.strokeStyle = (i - org.y) % (gridStep * zoom) == 0 ? "rgb(35, 35, 35)" : "rgb(30, 30, 30)";
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }

        if ((i - org.y) % (gridStep * zoom) == 0) {
            ctx.fillText((i - org.y) / -zoom, org.x - ctx.measureText((i - org.y) / -zoom).width - 5, i + 5);
        }
    }
    ctx.fillText("0", org.x - ctx.measureText("0").width - 5, org.y + 15)
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(40, 40, 40)";
    ctx.beginPath();
    ctx.moveTo(org.x, 0);
    ctx.lineTo(org.x, height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, org.y);
    ctx.lineTo(width, org.y);
    ctx.stroke();
}

function parabol(ctx) {
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    var c = document.getElementById("c").value;

    ctx.strokeStyle = "white";
    if (a != "" && b != "" && c != "") {
        a = Number(document.getElementById("a").value);
        b = Number(document.getElementById("b").value);
        c = Number(document.getElementById("c").value);
        ctx.beginPath();
        for (let x = -org.x; x <= org.x; x += 0.01) {
            var y = (a * x * x) + (b * x) + (c);

            const canvasX = org.x + x * zoom;
            const canvasY = org.y - y * zoom;

            if (x === -org.x) {
                ctx.moveTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        const x1 = ((-b - (Math.sqrt(b * b - 4 * a * c))) / (2 * a));
        const x2 = ((Math.sqrt(b * b - 4 * a * c) - b) / (2 * a));
        const v = {
            x: (-b) / (2 * a),
            y: (-(b * b - 4 * a * c)) / (4 * a)
        }
        ctx.stroke();
        if (shPoints) {
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(org.x + x1 * zoom, org.y, 7, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(org.x + x2 * zoom, org.y, 7, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(org.x + v.x * zoom, org.y - v.y * zoom, 7, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

function calc() {
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    var c = document.getElementById("c").value;

    const calcArea = document.getElementById("calcRaizes");
    while (calcArea.firstChild) {
        calcArea.removeChild(calcArea.firstChild);
    }
    if (a != "" && b != "" && c != "") {
        a = Number(document.getElementById("a").value);
        b = Number(document.getElementById("b").value);
        c = Number(document.getElementById("c").value);

        const xBox = document.createElement("div");
        xBox.classList.add("x-box");
        createCalcStep(xBox, "x", "-b ∓ √(b² - 4ac)", "2a");
        createCalcStep(xBox, "x", "-(" + b + ") ∓ √((" + b + ")² - 4*(" + a + ")*(" + c + "))", "2*(" + a + ")");
        createCalcStep(xBox, "x", -b + " ∓ √(" + (b * b) + " - " + (4 * a * c) + ")", (2 * a));
        createCalcStep(xBox, "x", -b + " ∓ √(" + (b * b - 4 * a * c) + ")", (2 * a));
        createCalcStep(xBox, "x", -b + " ∓ " + (Math.sqrt(b * b - 4 * a * c).toFixed(2)), (2 * a));
        calcArea.appendChild(xBox);

        const raizes = document.createElement("div");
        raizes.classList.add("raizes-box");

        const x1Box = document.createElement("div");
        x1Box.classList.add("x-box");

        createCalcStep(x1Box, "x1", -b + " - " + (Math.sqrt(b * b - 4 * a * c).toFixed(2)), (2 * a));
        createCalcStep(x1Box, "x1", (-b - (Math.sqrt(b * b - 4 * a * c).toFixed(2))).toFixed(2), (2 * a));
        createCalcStep(x1Box, "x1", ((-b - (Math.sqrt(b * b - 4 * a * c).toFixed(2))) / (2 * a)).toFixed(2));
        raizes.appendChild(x1Box);

        const x2Box = document.createElement("div");
        x2Box.classList.add("x-box");

        createCalcStep(x2Box, "x2", (-b + " + " + Math.sqrt(b * b - 4 * a * c).toFixed(2)), (2 * a));
        createCalcStep(x2Box, "x2", (Math.sqrt(b * b - 4 * a * c).toFixed(2) - b).toFixed(2), (2 * a));
        createCalcStep(x2Box, "x2", ((Math.sqrt(b * b - 4 * a * c).toFixed(2) - b).toFixed(2) / (2 * a)).toFixed(2));
        raizes.appendChild(x2Box);

        calcArea.appendChild(raizes);
    }

    function createCalcStep(parent, strx, str1, str2) {
        const step = document.createElement("div");
        step.classList.add("bask");

        const x = document.createElement("label");
        x.innerHTML = strx;
        step.appendChild(x);

        const equals = document.createElement("label");
        equals.innerHTML = "="
        step.appendChild(equals);

        if (str2 !== undefined) {
            const fraction = document.createElement("div");
            fraction.classList.add("fraction");

            const top = document.createElement("label");
            top.innerHTML = str1;
            fraction.appendChild(top);

            const bottom = document.createElement("label");
            bottom.innerHTML = str2;
            fraction.appendChild(bottom);

            step.appendChild(fraction);
        } else {
            const str = document.createElement("label");
            str.innerHTML = str1;
            step.appendChild(str);
        }
        parent.appendChild(step);
    }
}

var diference = null;

function getPosicaoMouse(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
}

canvas.addEventListener("mousemove", (event) => {
    if (click) {
        var pMouse = getPosicaoMouse(event);

        org.x = pMouse.x - diference.x
        org.y = pMouse.y - diference.y
        draw();
    }
});

canvas.addEventListener("mousedown", (evt) => {
    click = true;
    diference = { x: getPosicaoMouse(evt).x - org.x, y: getPosicaoMouse(evt).y - org.y };
});
canvas.addEventListener("mouseup", () => {
    click = false;
});
canvas.addEventListener("mouseout", () => {
    click = false;
});

function zoomIn() {
    if (zoom < 30) {
        zoom += 2;
        draw();
    }
    showZoomPercentage();
}

function zoomOut() {
    if (zoom > 10) {
        zoom -= 2;
        draw();
    }
    showZoomPercentage();
}

canvas.addEventListener('wheel', (event) => {
    if (event.deltaY < 0) {
        zoomIn()
    } else if (event.deltaY > 0) {
        zoomOut()
    }
});

function homePosition() {
    zoom = 20;
    org = {
        x: canvas.clientWidth / 2,
        y: canvas.clientHeight / 2
    };
    gridStep = 5;
    shGrid = true;
    shPoints = false
    draw();
    showZoomPercentage();
}


let timeoutId;

function showZoomPercentage() {
    const msg = document.querySelector(".zoomMsg");
    msg.innerHTML = (zoom * 5) + "%";
    msg.style.opacity = "1";
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        msg.style.opacity = "0";
    }, 2000);
}

function toggle(id) {
    document.getElementById(id).classList.toggle("active");
}

function togglePoints() {
    toggle('togglePoints');
    shPoints = !shPoints;
    draw();
}
function toggleGrid() {
    toggle('toggleGrid');
    shGrid = !shGrid;
    draw();
}

function openConf(){
    toggle('optionBox');
    const icon = document.getElementById("confBtnIcon")
    icon.innerHTML = icon.innerHTML == "close" ? "settings" : "close";
}

function changeGridStep(){
    const range = document.getElementById("inputGridStep");
    gridStep = Number(range.value);
    range.previousElementSibling.innerHTML = "Intervalo da Grade: " + gridStep;
    draw();
}