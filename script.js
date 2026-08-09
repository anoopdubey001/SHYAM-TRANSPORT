document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const scrollProgress = document.getElementById("scrollProgress");
  const year = document.getElementById("year");

  /* =========================
     CURRENT YEAR
  ========================= */
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =========================
     MOBILE MENU
  ========================= */
  menuToggle?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(open)
    );

    menuToggle.setAttribute(
      "aria-label",
      open ? "Close menu" : "Open menu"
    );
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      menuToggle?.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle?.setAttribute(
        "aria-label",
        "Open menu"
      );
    });
  });

  /* =========================
     SCROLL PROGRESS
  ========================= */
  const updateScrollProgress = () => {

    const scrollable =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      scrollable > 0
        ? (window.scrollY / scrollable) * 100
        : 0;

    if (scrollProgress) {
      scrollProgress.style.width =
        `${progress}%`;
    }
  };

  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );

  updateScrollProgress();

  /* =========================
     REVEAL ANIMATION
  ========================= */
  const revealItems =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );
            }

          });

        },
        {
          threshold: 0.12
        }
      );

    revealItems.forEach(item => {
      observer.observe(item);
    });

  } else {

    revealItems.forEach(item => {
      item.classList.add("visible");
    });

  }

  /* =========================
     FLEET / SERVICE CARD TILT
  ========================= */
  if (
    window.matchMedia("(pointer:fine)").matches
  ) {

    document
      .querySelectorAll(
        ".fleet-card, .service-card"
      )
      .forEach(card => {

        card.addEventListener(
          "pointermove",
          event => {

            const rect =
              card.getBoundingClientRect();

            const x =
              (event.clientX - rect.left) /
              rect.width -
              0.5;

            const y =
              (event.clientY - rect.top) /
              rect.height -
              0.5;

            card.style.transform =
              `perspective(900px)
               rotateX(${(-y * 2).toFixed(2)}deg)
               rotateY(${(x * 2).toFixed(2)}deg)
               translateY(-5px)`;
          }
        );

        card.addEventListener(
          "pointerleave",
          () => {
            card.style.transform = "";
          }
        );

      });

  }

  /* =========================
     QUOTE FORM
     ========================= */

  const quoteButtons =
    document.querySelectorAll(
      "button, input[type='submit']"
    );

  quoteButtons.forEach(button => {

    const buttonText =
      (
        button.textContent ||
        button.value ||
        ""
      ).trim().toLowerCase();

    if (
      !buttonText.includes(
        "submit quote request"
      )
    ) {
      return;
    }

    const form =
      button.closest("form");

    if (!form) {
      return;
    }

    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        /* Check required fields */
        if (!form.checkValidity()) {

          form.reportValidity();

          return;
        }

        /* Existing success message */
        let successMessage =
          document.getElementById(
            "quoteSuccessMessage"
          );

        /* Create message if it doesn't exist */
        if (!successMessage) {

          successMessage =
            document.createElement("div");

          successMessage.id =
            "quoteSuccessMessage";

          successMessage.setAttribute(
            "role",
            "status"
          );

          successMessage.style.cssText = `
            margin:20px 0;
            padding:16px 20px;
            border-radius:14px;
            background:#ecfdf3;
            border:1px solid #86efac;
            color:#166534;
            font-weight:700;
            text-align:center;
          `;

          form.prepend(
            successMessage
          );
        }

        successMessage.textContent =
          "✓ Quote request submitted successfully! We will contact you shortly.";

        successMessage.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }
    );

  });

});
