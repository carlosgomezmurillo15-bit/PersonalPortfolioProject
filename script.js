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
   DARK / LIGHT MODE
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

    // The site still works
    // without local storage.

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


if (themeButton) {

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

}


if (
  currentPage ===
  "about.html"
) {

  navKey =
    "about";

}


if (
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
   COMING SOON BUTTONS
========================= */

document
  .querySelectorAll(
    "[data-coming-soon]"
  )
  .forEach(
    function (button) {

      button.addEventListener(
        "click",
        function (event) {

          event.preventDefault();

        }
      );

    }
  );


/* =========================
   PROJECT FILTERING
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
      categoryName +
      " projects";

  }

}


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
          Clicking the selected
          category again returns
          to every project.
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
          Add ?skill= to the URL.
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
  This lets links from the
  homepage open a specific
  project category.

  Example:

  projects.html?skill=it

  projects.html?skill=security

  projects.html?skill=intelligence
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
