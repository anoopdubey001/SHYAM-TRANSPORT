document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     SHYAM TRANSPORT - MAIN SETTINGS
  ========================================== */

  const WHATSAPP_NUMBER = "917678269027";


  /* ==========================================
     CURRENT YEAR
  ========================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* ==========================================
     MOBILE MENU
  ========================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close menu"
          : "Open menu"
      );

    });


    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open menu"
        );

      });

    });

  }


  /* ==========================================
     SCROLL PROGRESS
  ========================================== */

  const scrollProgress =
    document.getElementById("scrollProgress");

  const updateScrollProgress = () => {

    if (!scrollProgress) return;

    const scrollable =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      scrollable > 0
        ? (window.scrollY / scrollable) * 100
        : 0;

    scrollProgress.style.width =
      `${progress}%`;

  };

  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );

  updateScrollProgress();


  /* ==========================================
     REVEAL ANIMATION
  ========================================== */

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


  /* ==========================================
     CARD TILT EFFECT
  ========================================== */

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


  /* ==========================================
     HELPER:
     GET FIELD VALUE
  ========================================== */

  function getField(form, selectors) {

    for (const selector of selectors) {

      const field =
        form.querySelector(selector);

      if (field) {

        const value =
          field.value?.trim();

        if (value) {
          return value;
        }

      }

    }

    return "";

  }


  /* ==========================================
     HELPER:
     CREATE WHATSAPP URL
  ========================================== */

  function openWhatsApp(message) {

    const encodedMessage =
      encodeURIComponent(message);

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.location.href =
      whatsappURL;

  }


  /* ==========================================
     HELPER:
     SHOW SUCCESS MESSAGE
  ========================================== */

  function showSuccess(form, messageText) {

    let message =
      form.querySelector(
        ".form-success-message"
      );

    if (!message) {

      message =
        document.createElement("div");

      message.className =
        "form-success-message";

      message.style.cssText = `
        margin: 18px 0;
        padding: 15px 18px;
        border-radius: 14px;
        background: #ecfdf3;
        border: 1px solid #86efac;
        color: #166534;
        font-weight: 700;
        text-align: center;
      `;

      form.prepend(message);

    }

    message.textContent =
      messageText;

  }


  /* ==========================================
     BOOKING FORM → WHATSAPP
  ========================================== */

  const bookingForms =
    document.querySelectorAll(
      "form"
    );


  bookingForms.forEach(form => {

    const formText =
      form.textContent
        .toLowerCase();

    const isBookingForm =
      formText.includes("pickup") &&
      formText.includes("delivery") &&
      (
        formText.includes("booking") ||
        formText.includes("truck capacity")
      );


    if (!isBookingForm) {
      return;
    }


    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        /* Validate required fields */

        if (!form.checkValidity()) {

          form.reportValidity();

          return;

        }


        /* Get booking details */

        const name =
          getField(form, [
            '[name="name"]',
            '[name="customerName"]',
            '[name="customer_name"]',
            '#name',
            '#customerName'
          ]);


        const phone =
          getField(form, [
            '[name="phone"]',
            '[name="mobile"]',
            '[name="phoneNumber"]',
            '#phone',
            '#mobile'
          ]);


        const pickup =
          getField(form, [
            '[name="pickup"]',
            '[name="pickupLocation"]',
            '[name="pickup_location"]',
            '#pickup',
            '#pickupLocation'
          ]);


        const delivery =
          getField(form, [
            '[name="delivery"]',
            '[name="deliveryLocation"]',
            '[name="delivery_location"]',
            '#delivery',
            '#deliveryLocation'
          ]);


        const truck =
          getField(form, [
            '[name="truckCapacity"]',
            '[name="truck_capacity"]',
            '[name="capacity"]',
            '[name="load"]',
            '#truckCapacity',
            '#capacity'
          ]);


        const material =
          getField(form, [
            '[name="material"]',
            '[name="materialType"]',
            '[name="material_type"]',
            '#material',
            '#materialType'
          ]);


        const date =
          getField(form, [
            '[name="pickupDate"]',
            '[name="pickup_date"]',
            '[name="date"]',
            '#pickupDate',
            '#date'
          ]);


        const requirements =
          getField(form, [
            '[name="requirements"]',
            '[name="additionalRequirements"]',
            '[name="additional_requirements"]',
            '[name="message"]',
            '#requirements',
            '#message'
          ]);


        /* Create WhatsApp booking message */

        const message =
`🚚 *NEW BOOKING REQUEST - SHYAM TRANSPORT*

👤 *Customer Name:* ${name || "Not provided"}

📞 *Phone:* ${phone || "Not provided"}

📍 *Pickup Location:* ${pickup || "Not provided"}

🏁 *Delivery Location:* ${delivery || "Not provided"}

🚛 *Truck / Load:* ${truck || "Not provided"}

📦 *Material:* ${material || "Not provided"}

📅 *Pickup Date:* ${date || "Not provided"}

📝 *Additional Requirements:* ${requirements || "None"}

━━━━━━━━━━━━━━━━━━
*Shyam Transport*
📞 +91 7678269027
🇮🇳 All India Service`;


        showSuccess(
          form,
          "Opening WhatsApp with your booking details..."
        );


        setTimeout(() => {

          openWhatsApp(message);

        }, 500);

      }
    );

  });


  /* ==========================================
     QUOTE FORM → WHATSAPP
  ========================================== */

  bookingForms.forEach(form => {

    const formText =
      form.textContent
        .toLowerCase();


    const isQuoteForm =
      formText.includes("quote") &&
      (
        formText.includes("pickup") ||
        formText.includes("delivery")
      );


    if (!isQuoteForm) {
      return;
    }


    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        /* Validate required fields */

        if (!form.checkValidity()) {

          form.reportValidity();

          return;

        }


        /* Get quote details */

        const name =
          getField(form, [
            '[name="name"]',
            '[name="customerName"]',
            '[name="customer_name"]',
            '#name',
            '#customerName'
          ]);


        const phone =
          getField(form, [
            '[name="phone"]',
            '[name="mobile"]',
            '[name="phoneNumber"]',
            '#phone',
            '#mobile'
          ]);


        const pickup =
          getField(form, [
            '[name="pickup"]',
            '[name="pickupLocation"]',
            '[name="pickup_location"]',
            '#pickup',
            '#pickupLocation'
          ]);


        const delivery =
          getField(form, [
            '[name="delivery"]',
            '[name="deliveryLocation"]',
            '[name="delivery_location"]',
            '#delivery',
            '#deliveryLocation'
          ]);


        const truck =
          getField(form, [
            '[name="truckCapacity"]',
            '[name="truck_capacity"]',
            '[name="capacity"]',
            '[name="load"]',
            '#truckCapacity',
            '#capacity'
          ]);


        const material =
          getField(form, [
            '[name="material"]',
            '[name="materialType"]',
            '[name="material_type"]',
            '#material',
            '#materialType'
          ]);


        const date =
          getField(form, [
            '[name="pickupDate"]',
            '[name="pickup_date"]',
            '[name="date"]',
            '#pickupDate',
            '#date'
          ]);


        const requirements =
          getField(form, [
            '[name="requirements"]',
            '[name="additionalRequirements"]',
            '[name="additional_requirements"]',
            '[name="message"]',
            '#requirements',
            '#message'
          ]);


        /* Create WhatsApp quote message */

        const message =
`💰 *NEW QUOTE REQUEST - SHYAM TRANSPORT*

👤 *Customer Name:* ${name || "Not provided"}

📞 *Phone:* ${phone || "Not provided"}

📍 *Pickup Location:* ${pickup || "Not provided"}

🏁 *Delivery Location:* ${delivery || "Not provided"}

🚛 *Truck / Load:* ${truck || "Not provided"}

📦 *Material:* ${material || "Not provided"}

📅 *Required Date:* ${date || "Not provided"}

📝 *Additional Requirements:* ${requirements || "None"}

━━━━━━━━━━━━━━━━━━
*Please provide the best transport rate.*

*Shyam Transport*
📞 +91 7678269027
🇮🇳 All India Service`;


        showSuccess(
          form,
          "Opening WhatsApp with your quote details..."
        );


        setTimeout(() => {

          openWhatsApp(message);

        }, 500);

      }
    );

  });


  /* ==========================================
     EXISTING "SUBMIT QUOTE REQUEST"
     BUTTON FALLBACK
  ========================================== */

  document
    .querySelectorAll(
      "button, input[type='submit']"
    )
    .forEach(button => {

      const text =
        (
          button.textContent ||
          button.value ||
          ""
        )
        .trim()
        .toLowerCase();


      if (
        !text.includes(
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


      /*
        Avoid creating duplicate submit
        handlers if the quote form above
        already handled it.
      */

      if (
        form.dataset.whatsappQuoteAttached
      ) {
        return;
      }


      form.dataset.whatsappQuoteAttached =
        "true";


      form.addEventListener(
        "submit",
        event => {

          event.preventDefault();


          if (!form.checkValidity()) {

            form.reportValidity();

            return;

          }


          const name =
            getField(form, [
              '[name="name"]',
              '[name="customerName"]',
              '[name="customer_name"]',
              '#name',
              '#customerName'
            ]);


          const phone =
            getField(form, [
              '[name="phone"]',
              '[name="mobile"]',
              '[name="phoneNumber"]',
              '#phone',
              '#mobile'
            ]);


          const pickup =
            getField(form, [
              '[name="pickup"]',
              '[name="pickupLocation"]',
              '[name="pickup_location"]',
              '#pickup',
              '#pickupLocation'
            ]);


          const delivery =
            getField(form, [
              '[name="delivery"]',
              '[name="deliveryLocation"]',
              '[name="delivery_location"]',
              '#delivery',
              '#deliveryLocation'
            ]);


          const truck =
            getField(form, [
              '[name="truckCapacity"]',
              '[name="truck_capacity"]',
              '[name="capacity"]',
              '[name="load"]',
              '#truckCapacity',
              '#capacity'
            ]);


          const material =
            getField(form, [
              '[name="material"]',
              '[name="materialType"]',
              '[name="material_type"]',
              '#material',
              '#materialType'
            ]);


          const message =
`💰 *NEW QUOTE REQUEST - SHYAM TRANSPORT*

👤 Customer: ${name || "Not provided"}
📞 Phone: ${phone || "Not provided"}
📍 Pickup: ${pickup || "Not provided"}
🏁 Delivery: ${delivery || "Not provided"}
🚛 Truck / Load: ${truck || "Not provided"}
📦 Material: ${material || "Not provided"}

Please provide your best transport rate.

*Shyam Transport*
📞 +91 7678269027`;


          openWhatsApp(message);

        }
      );

    });

});
