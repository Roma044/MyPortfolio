const index = {};

index.$menu = $("#sideMenu");
index.$navItem = $(".navItem");
index.$navItemName = $(".navItemName");
index.$home = $("#home");
index.$about = $("#about");
index.$skills = $("#skills");
index.$works = $("#works");
index.$contact = $("#contact");
index.$menuButton = $("#menuButton");
index.$scrollDown = $("#scrollDown");
index.isOpen = false;

// Scroll function
index.scroll = function (target) {
  $("html,body").animate({ scrollTop: $(target).offset().top }, 500);
};

// Menu button function
index.showHideMenu = function () {
  index.$menu.toggleClass("sideMenuHide sideMenuShow");
  index.isOpen = !index.isOpen;
};

// Mobile class changes on initial load
if ($(window).width() <= 990) {
  index.$menu.addClass("sideMenuHide").removeClass("sideMenuShow");
  index.$scrollDown.hide();
}

index.eventListeners = function () {
  // when windox resizes between large and small displayes
  $(window).on("resize", function () {
    if ($(window).width() > 990) {
      index.$menu.removeClass("sideMenuHide").addClass("sideMenuShow");
      index.$scrollDown.show();
      index.isOpen = false;
    } else {
      index.$menu.removeClass("sideMenuShow").addClass("sideMenuHide");
      index.isOpen = false;
      index.$scrollDown.hide();
    }
  });

  // Nav menu click events for scroll function
  $("a[href*=\\#]").on("click", function () {
    index.scroll(this.hash);
  });

  // Menu button click event
  index.$menuButton.on("click", index.showHideMenu);

  // Hide menu when clicking a link
  index.$navItem.on("click", function () {
    if (index.isOpen) {
      // Hide menu when clicking a link
      index.showHideMenu();
    }
  });

  // Menu button ENTER key event
  index.$menuButton.on("keypress", function (e) {
    if (e.which === 13) {
      $(this).trigger("click");
    }
  });
};

// init method
index.init = function () {
  index.eventListeners();
};

// Document Ready
$(function () {
  index.init();
});

// Clock
const daysOfWeek = ["sun", "mon", "tus", "wed", "thu", "fri", "sat"];
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const $ = (id) => document.getElementById(id);
const zeroPadding = (num) => String(num).padStart(2, "0");

function clock() {
  const today = new Date();
  const h = today.getHours();
  const m = today.getMinutes();
  const s = today.getSeconds();
  const ampm = h < 11 ? "AM" : "PM";
  const day = today.getDay();
  const date = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  $("hours").innerHTML = zeroPadding(h);
  $("min").innerHTML = zeroPadding(m);
  $("sec").innerHTML = zeroPadding(s);
  $("ampm").innerHTML = ampm;
  $(daysOfWeek.at(day - 1) % 7).classList.remove("active");
  $(daysOfWeek[day]).classList.add("active");
  $("year").innerHTML = year;
  $("month").innerHTML = months[month];
  $("day").innerHTML = zeroPadding(date);
}

setInterval(clock, 400);
