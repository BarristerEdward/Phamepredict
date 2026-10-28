document.addEventListener("DOMContentLoaded", () => {
  const matchGrid = document.getElementById("matchGrid");
  const searchInput = document.getElementById("matchSearch");
  const filterButtons = document.querySelectorAll("[data-league]");
  const emptyMessage = document.getElementById("emptyMessage");

  if (!matchGrid) {
    console.error("PhamePredict: matchGrid was not found.");
    return;
  }

  const matchCards = Array.from(
    matchGrid.querySelectorAll("[data-league]")
  );

  let activeLeague = "all";
  let searchTerm = "";

  // Search and filter matches
  function updateMatches() {
    let visibleMatches = 0;

    matchCards.forEach((card) => {
      const cardLeague = card.dataset.league || "";
      const cardText = card.textContent.toLowerCase();

      const matchesLeague =
        activeLeague === "all" || cardLeague === activeLeague;

      const matchesSearch = cardText.includes(searchTerm);
      const shouldShow = matchesLeague && matchesSearch;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleMatches++;
      }
    });

    // Show or hide the no-results message
    if (emptyMessage) {
      emptyMessage.hidden = visibleMatches > 0;
    }

    // Update match count if the element exists
    const matchCount = document.getElementById("matchCount");

    if (matchCount) {
      matchCount.textContent = visibleMatches;
    }
  }

  // League filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeLeague = button.dataset.league || "all";

      filterButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      updateMatches();
    });
  });

  // Match search
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = searchInput.value.trim().toLowerCase();
      updateMatches();
    });
  }

  // Prevent placeholder links from jumping to the top
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });

  // Initial setup
  filterButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      button.classList.contains("active") ? "true" : "false"
    );
  });

  updateMatches();

  console.log("PhamePredict is ready.");
});
