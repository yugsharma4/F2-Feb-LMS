const bookName = document.querySelector(".book_name");
const issuedTo = document.querySelector(".issue_name");
const button = document.querySelector("#input__issuedBtn");
let books = [
  //   {
  //     id: 1,
  //     book_name: "Js",
  //     issued_to: "Yug",
  //     issued_time: "18/03/2023 at 20:14PM",
  //     status: "Not Returned",
  //   },
  //   {
  //     id: 2,
  //     book_name: "Java",
  //     issued_to: "Yash",
  //     issued_time: "18/03/2023 at 19:04PM",
  //     status: "Not Returned",
  //   },
];

button.addEventListener("click", () => {
  //Date and Time
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  const minutes = min.length === 1 ? "0" + min : min;
  const amPM = hour < 12 ? "AM" : "PM";

  const issuedTime = `${day}/${month + 1}/${year} at ${hour}:${minutes}${amPM}`;

  const length = books.length;
  //Assigned these new issue to books array
  const newBookIssue = {
    id: length + 1,
    book_name: bookName.value,
    issued_to: issuedTo.value,
    issued_time: issuedTime,
    status: "Not Returned",
  };
  books.push(newBookIssue);
  //status

  createRow(
    newBookIssue.id,
    newBookIssue.book_name,
    newBookIssue.issued_to,
    newBookIssue.issued_time,
    newBookIssue.status
  );

  bookName.value = "";
  issuedTo.value = "";
});

//Display rows
function displayRows(books) {
  for (let i = 0; i < books.length; i++) {
    const id = books[i].id;

    const book_name = books[i].book_name;
    const issued_to = books[i].issued_to;
    const issued_time = books[i].issued_time;
    const status = books[i].status;
    createRow(id, book_name, issued_to, issued_time, status);
  }
}

displayRows(books);

//Create new Row
function createRow(id, book_name, issued_to, issued_time, status) {
  const tr = document.createElement("tr");
  const tdId = document.createElement("td");
  const tdBName = document.createElement("td");
  const tdIsName = document.createElement("td");
  const tdDate = document.createElement("td");
  const tdStatus = document.createElement("td");
  const spanReturned = document.createElement("span");
  const spanIcon = document.createElement("span");
  const i = document.createElement("i");

  //Create TextNodes

  //Id
  const idText = document.createTextNode(id);

  //Book name
  const bName = document.createTextNode(book_name);

  //Issued to
  const iName = document.createTextNode(issued_to);

  //Date and time
  const dateAndTime = document.createTextNode(issued_time);

  spanReturned.setAttribute("class", "redColor");
  spanReturned.setAttribute("contenteditable", "false");

  const spanText = document.createTextNode(status);
  spanReturned.appendChild(spanText);

  i.setAttribute("class", "fa-regular fa-pen-to-square");
  //   spanIcon.setAttribute("onClick", "editableText()");
  spanIcon.onclick = function (e) {
    editableText(e);
  };

  spanIcon.appendChild(i);

  //Parent node
  const nodeLists = document.querySelector("table").childNodes;

  //textNodes append to td tag
  tdId.appendChild(idText);
  tdBName.appendChild(bName);
  tdIsName.appendChild(iName);

  tdDate.appendChild(dateAndTime);
  tdStatus.appendChild(spanReturned);
  tdStatus.appendChild(spanIcon);

  tr.appendChild(tdId);

  //Book name
  tr.appendChild(tdBName);

  //Issued to
  tr.appendChild(tdIsName);

  //Date and time
  tr.appendChild(tdDate);

  //status
  tr.appendChild(tdStatus);
  nodeLists[1].appendChild(tr);
}

//Editable functionality
function editableText(e) {
  const returnSpan = e.target.parentElement.parentElement.firstElementChild;
  returnSpan.setAttribute("contenteditable", "true");
  returnSpan.innerHTML = "Editable Text";
  returnSpan.style.color = "green";

  const selectedRowId =
    returnSpan.parentElement.parentElement.firstElementChild.textContent;

  console.log(selectedRowId);

  books.forEach((book) => {
    if (book.id == selectedRowId) {
      console.log("idBook");

      book.status = "Returned";
    }
  });
}
