function transitionTo(event, url) {
    event.preventDefault();

    if (window.location.pathname === url) return;

    document.documentElement.classList.add("page-leaving");

    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function () {
    const prefetched = new Set();
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    function setTheme(theme) {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);

        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);

        localStorage.setItem("theme", theme);

        if (typeof ui === "function") {
            ui("mode", theme);
        }

        themeToggle.checked = theme === "dark";
        themeIcon.innerText = theme === "dark" ? "dark_mode" : "light_mode";
    }

    setTheme(localStorage.getItem("theme") || "light");

    themeToggle.addEventListener("change", () => {
        const newTheme = themeToggle.checked ? "dark" : "light";
        setTheme(newTheme);
    });

    function prefetch(url) {
        if (prefetched.has(url)) return;
        prefetched.add(url);
        fetch(url, { priority: "low" }).catch(() => { });
    }

    document.querySelectorAll("nav a[onclick]").forEach((a) => {
        const url = a.getAttribute("onclick").match(/'(.*?)'/)?.[1];
        if (!url) return;

        a.addEventListener("mouseenter", () => prefetch(url), { passive: true });
        a.addEventListener("touchstart", () => prefetch(url), { passive: true });
    });
});