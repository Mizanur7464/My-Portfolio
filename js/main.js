(function () {
  const profileImg = document.querySelector(".profile-img");
  if (profileImg) {
    profileImg.addEventListener("error", function onProfileError() {
      const fb = profileImg.getAttribute("data-fallback-src");
      if (!fb || profileImg.getAttribute("data-used-fallback")) return;
      profileImg.setAttribute("data-used-fallback", "1");
      profileImg.src = fb;
    });
  }

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const links = document.querySelectorAll(".nav-link");

  function setOpen(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle?.addEventListener("click", function () {
    const open = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      links.forEach(function (l) {
        l.classList.remove("active");
      });
      link.classList.add("active");
      setOpen(false);
    });
  });

  function closePortfolioModal() {
    const modal = document.getElementById("portfolio-modal");
    if (!modal || modal.hasAttribute("hidden")) return;
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      setOpen(false);
      closePortfolioModal();
    }
  });

  var PORTFOLIO_DETAILS = {
    shop: {
      title: "Shop order alerts",
      paragraphs: [
        "Built for small online shops: when a new order hits the store, staff get an instant Telegram alert with the key details.",
        "Inline buttons can mark an order confirmed, on hold, or handed off—so the team rarely needs to open a separate admin app.",
        "Python backend, wired with webhooks or polling to your stack, with queues and retries in mind when traffic spikes.",
      ],
    },
    moderation: {
      title: "Community moderation",
      paragraphs: [
        "Helps admins handle spam and user reports in busy groups or channels. Reports land in a simple queue instead of getting lost in chat.",
        "Admin-only commands, lightweight logging, and quick actions (mute, warn, kick) without leaving Telegram.",
        "Logs can live in SQLite or a small database; async handlers (e.g. aiogram) keep responses snappy even in large groups.",
      ],
    },
    subscription: {
      title: "Subscription reminders",
      paragraphs: [
        "Sends friendly DMs before memberships or renewals expire, so fewer surprises and less manual spreadsheet chasing.",
        "Scheduled jobs with asyncio check due dates on a cadence you control—cron-style or interval-based.",
        "Message templates are easy to tweak so the tone always matches your brand.",
      ],
    },
    assistant: {
      title: "Personal assistant",
      paragraphs: [
        "Keeps daily micro-tasks—notes, reminders, pinned snippets—in one Telegram inbox instead of scattered apps.",
        "Slash commands and inline mode make it fast to search or paste saved snippets.",
        "Modular structure so new commands or integrations can be added without rewriting the whole bot.",
      ],
    },
    welcome: {
      title: "Group welcome & rules",
      paragraphs: [
        "Welcomes new members, pins house rules, and can add a simple gate (buttons or captcha-style flow) to cut down on spam accounts.",
        "Handlers built with python-telegram-bot (PTB); privileged commands check admin status before they run.",
        "Anti-flood and rate limits can be tuned as the group grows.",
      ],
    },
    webhook: {
      title: "Webhook → Telegram bridge",
      paragraphs: [
        "Accepts signed webhooks from payments, forms, or your store, validates the payload, and posts a rich update to a private admin channel.",
        "Small HTTPS endpoint on FastAPI or Flask; token or signature checks to keep bogus traffic out.",
        "Straightforward deploy and logging so production issues are easy to trace.",
      ],
    },
  };

  (function portfolioModal() {
    const modal = document.getElementById("portfolio-modal");
    const titleEl = document.getElementById("portfolio-modal-title");
    const bodyEl = document.getElementById("portfolio-modal-body");
    if (!modal || !titleEl || !bodyEl) return;

    function openPortfolioModal(key) {
      const data = PORTFOLIO_DETAILS[key];
      if (!data) return;
      titleEl.textContent = data.title;
      bodyEl.innerHTML = "";
      data.paragraphs.forEach(function (text) {
        const p = document.createElement("p");
        p.textContent = text;
        bodyEl.appendChild(p);
      });
      modal.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
    }

    document.querySelectorAll(".portfolio-card__link[data-project]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const key = btn.getAttribute("data-project");
        if (key) openPortfolioModal(key);
      });
    });

    modal.querySelectorAll("[data-close-portfolio-modal]").forEach(function (el) {
      el.addEventListener("click", function () {
        closePortfolioModal();
      });
    });
  })();

  const sectionIds = ["home", "about", "services", "portfolio", "contact"];
  const sections = sectionIds
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          links.forEach(function (l) {
            l.classList.toggle(
              "active",
              l.getAttribute("href") === "#" + id
            );
          });
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (sec) {
      observer.observe(sec);
    });
  }

})();
