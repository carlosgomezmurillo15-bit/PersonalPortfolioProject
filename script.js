const root = document.documentElement;

const themeButton =
  document.getElementById("theme-button");

const themeLabel =
  document.getElementById("theme-label");

const filterButtons =
  document.querySelectorAll(".filter-button");

const projectRows =
  document.querySelectorAll(".project-row");

const filterStatus =
  document.getElementById("filter-status");

const comingSoonButtons =
  document.querySelectorAll("[data-coming-soon]");



/* DARK / LIGHT MODE */

const savedTheme =
  localStorage.getItem("portfolio-theme");

if (
  savedTheme === "dark" ||
  savedTheme === "light"
) {

  root.dataset.theme =
    savedTheme;

}



function updateThemeText() {

  if (
    root.dataset.theme === "dark"
  ) {

    themeLabel.textContent =
      "Light view";

  } else {

    themeLabel.textContent =
      "Dark view";

  }

}



updateThemeText();



themeButton.addEventListener(
  "click",
  function () {

    if (
      root.dataset.theme === "dark"
    ) {

      root.dataset.theme =
        "light";

    } else {

      root.dataset.theme =
        "dark";

    }


    localStorage.setItem(
      "portfolio-theme",
      root.dataset.theme
    );


    updateThemeText();

  }
);



/* PROJECT FILTERS */

function showAllProjects() {

  projectRows.forEach(
    function (project) {

      project.style.display =
        "grid";

    }
  );


  filterButtons.forEach(
    function (button) {

      button.classList.remove(
        "active"
      );

    }
  );


  filterStatus.textContent =
    "Showing all 4 projects";

}



filterButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        const filter =
          button.dataset.filter;


        const alreadyActive =
          button.classList.contains(
            "active"
          );


        if (alreadyActive) {

          showAllProjects();

          return;

        }


        filterButtons.forEach(
          function (otherButton) {

            otherButton.classList.remove(
              "active"
            );

          }
        );


        button.classList.add(
          "active"
        );


        let visibleCount =
          0;


        projectRows.forEach(
          function (project) {

            if (
              project.dataset.category ===
              filter
            ) {

              project.style.display =
                "grid";

              visibleCount++;

            } else {

              project.style.display =
                "none";

            }

          }
        );


        filterStatus.textContent =
          "Showing " +
          visibleCount +
          " project" +
          (
            visibleCount === 1
              ? ""
              : "s"
          );

      }
    );

  }
);



/* COMING SOON BUTTONS */

comingSoonButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

      }
    );

  }
);
