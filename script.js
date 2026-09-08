const root =
  document.documentElement;

const themeButton =
  document.getElementById(
    "theme-button"
  );

const themeLabel =
  document.getElementById(
    "theme-label"
  );


/* =========================
   THEME
========================= */

function readSavedTheme() {

  try {

    return localStorage.getItem(
      "portfolio-theme"
    );

  } catch (error) {

    return null;

  }

}


function saveTheme(theme) {

  try {

    localStorage.setItem(
      "portfolio-theme",
      theme
    );

  } catch (error) {

    // Site still works if
    // local storage is unavailable.

  }

}


const savedTheme =
  readSavedTheme();


if (
  savedTheme === "dark" ||
  savedTheme === "light"
) {

  root.dataset.theme =
    savedTheme;

}


function updateThemeText() {

  if (!themeLabel) {
    return;
  }


  themeLabel.textContent =
    root.dataset.theme === "dark"
      ? "Light view"
      : "Dark view";

}


updateThemeText();


if (themeButton) {

  themeButton.addEventListener(
    "click",
    function () {

      root.dataset.theme =
        root.dataset.theme === "dark"
          ? "light"
          : "dark";


      saveTheme(
        root.dataset.theme
      );


      updateThemeText();

    }
  );

}


/* =========================
   ACTIVE NAVIGATION
========================= */

const currentPage =
  window.location.pathname
    .split("/")
    .pop() ||
  "index.html";


let navKey =
  "home";


if (
  currentPage ===
  "projects.html"
) {

  navKey =
    "projects";

} else if (
  currentPage ===
  "about.html"
) {

  navKey =
    "about";

} else if (
  currentPage ===
  "resume.html"
) {

  navKey =
    "resume";

}


document
  .querySelectorAll(
    "[data-nav]"
  )
  .forEach(
    function (link) {

      if (
        link.dataset.nav ===
        navKey
      ) {

        link.classList.add(
          "active"
        );

      }

    }
  );


/* =========================
   COMING SOON
========================= */

document
  .querySelectorAll(
    "[data-coming-soon]"
  )
  .forEach(
    function (link) {

      link.addEventListener(
        "click",
        function (event) {

          event.preventDefault();

        }
      );

    }
  );


/* =========================
   PROJECT FILTERS
========================= */

const categoryButtons =
  document.querySelectorAll(
    ".category-button"
  );


const categorySections =
  document.querySelectorAll(
    "[data-category-section]"
  );


const filterStatus =
  document.getElementById(
    "filter-status"
  );


function showAllCategories() {

  categorySections.forEach(
    function (section) {

      section.hidden =
        false;

    }
  );


  categoryButtons.forEach(
    function (button) {

      button.classList.remove(
        "active"
      );

    }
  );


  if (filterStatus) {

    filterStatus.textContent =
      "Showing the full project library";

  }

}


function showCategory(
  category
) {

  let categoryName =
    "";


  categoryButtons.forEach(
    function (button) {

      const isActive =
        button.dataset.filter ===
        category;


      button.classList.toggle(
        "active",
        isActive
      );


      if (isActive) {

        categoryName =
          button.textContent
            .replace(
              /^\d+\s*/,
              ""
            )
            .trim();

      }

    }
  );


  categorySections.forEach(
    function (section) {

      section.hidden =
        section.dataset
          .categorySection !==
        category;

    }
  );


  if (filterStatus) {

    filterStatus.textContent =
      "Showing " +
      categoryName;

  }

}


/* FILTER BUTTON CLICKS */

categoryButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        const category =
          button.dataset.filter;


        const alreadyActive =
          button.classList.contains(
            "active"
          );


        /*
          Click selected filter again
          to show everything.
        */

        if (alreadyActive) {

          showAllCategories();


          history.replaceState(
            {},
            "",
            "projects.html"
          );


          return;

        }


        showCategory(
          category
        );


        /*
          Update URL.

          Example:
          projects.html?skill=security
        */

        const url =
          new URL(
            window.location.href
          );


        url.searchParams.set(
          "skill",
          category
        );


        history.replaceState(
          {},
          "",
          url.pathname +
          "?" +
          url.searchParams
            .toString()
        );

      }
    );

  }
);


/* =========================
   DIRECT CATEGORY LINKS
========================= */

/*
  Allows links such as:

  projects.html?skill=security

  projects.html?skill=intelligence

  projects.html?skill=coursework
*/


if (
  categoryButtons.length > 0
) {

  const params =
    new URLSearchParams(
      window.location.search
    );


  const requestedSkill =
    params.get(
      "skill"
    );


  const validSkills =
    Array.from(
      categoryButtons
    ).map(
      function (button) {

        return button
          .dataset
          .filter;

      }
    );


  if (
    requestedSkill &&
    validSkills.includes(
      requestedSkill
    )
  ) {

    showCategory(
      requestedSkill
    );

  }

}
