const themeButton = document.querySelector("#theme-button");
const currentYear = document.querySelector("#current-year");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const lightThemeIsActive =
    document.body.classList.contains("light-theme");

  themeButton.textContent =
    lightThemeIsActive ? "Dark mode" : "Light mode";
});

currentYear.textContent = new Date().getFullYear();
