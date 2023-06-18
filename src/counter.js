function countTo() {
  let counts = setInterval(updated);
        let upto = 0;
        function updated() {
            let count = document.getElementById("counter");
            count.innerHTML = ++upto;
            if (upto === 1150) {
                clearInterval(counts);
            }
        }
}
countTo();

function users() {
  let userCount = setInterval(updated);
  let upto = 0;
  function updated() {
    let count = document.getElementById("users");
    count.innerHTML = ++upto;
    if (upto === 1120) {
      clearInterval(userCount);
    }
  }
}
users();

function git() {
  let gitCount = setInterval(updated);
  let upto = 0;
  function updated() {
    let count = document.getElementById("git");
    count.innerHTML = ++upto;
    if (upto === 1140) {
      clearInterval(gitCount);
    }
  }
}
git();

function con() {
  let conCount = setInterval(updated);
  let upto = 0;
  function updated() {
    let count = document.getElementById("con");
    count.innerHTML = ++upto;
    if (upto === 1100) {
      clearInterval(conCount);
    }
  }
}
con();

