document.addEventListener("DOMContentLoaded", () => {
  // เพิ่ม/ลดปุ่มเมนูที่อาร์เรย์นี้ได้เลย ทุกหน้าจะปรับตามอัตโนมัติ
  const navLinks = [
    { name: "โปรไฟล์", href: "index.html", icon: "fa-solid fa-user" },
    { name: "ประสบการณ์", href: "experience.html", icon: "fa-solid fa-briefcase" },
    { name: "ผลงาน", href: "projects.html", icon: "fa-solid fa-code" },
    { name: "การศึกษา", href: "education.html", icon: "fa-solid fa-graduation-cap" },
    { name: "ทักษะ", href: "skills.html", icon: "fa-solid fa-bolt" },
    { name: "ติดต่อ", href: "contact.html", icon: "fa-solid fa-paper-plane" }
  ];

  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  const navContainer = document.createElement("div");
  navContainer.className = "water-nav-container";

  const nav = document.createElement("nav");
  nav.className = "water-nav";

  const indicator = document.createElement("div");
  indicator.className = "nav-indicator";
  nav.appendChild(indicator);

  const mainContainer = document.querySelector("main.container");
  let activeElement = null;
  const itemElements = [];

  function moveIndicator(targetEl, animate = true) {
    if (!targetEl) return;
    if (!animate) {
      indicator.style.transition = "none";
    } else {
      indicator.style.transition = "transform 0.38s cubic-bezier(0.25, 1, 0.3, 1), width 0.38s cubic-bezier(0.25, 1, 0.3, 1)";
    }

    const navRect = nav.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const leftOffset = targetRect.left - navRect.left;

    indicator.style.width = `${targetRect.width}px`;
    indicator.style.transform = `translateX(${leftOffset}px)`;
    indicator.style.opacity = "1";
  }

  navLinks.forEach(link => {
    const a = document.createElement("a");
    a.href = link.href;
    a.className = "nav-item";
    a.innerHTML = `<i class="${link.icon}"></i> <span>${link.name}</span>`;

    const isCurrent = (currentPath === link.href);
    if (isCurrent) {
      a.classList.add("active");
      activeElement = a;
    }

    a.addEventListener("click", (e) => {
      if (currentPath === link.href) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      itemElements.forEach(el => el.classList.remove("active"));
      a.classList.add("active");
      moveIndicator(a, true);

      sessionStorage.setItem("prevNavLeft", indicator.style.transform);
      sessionStorage.setItem("prevNavWidth", indicator.style.width);

      if (mainContainer) {
        mainContainer.classList.add("page-exit");
      }

      setTimeout(() => {
        window.location.href = link.href;
      }, 260);
    });

    nav.appendChild(a);
    itemElements.push(a);
  });

  navContainer.appendChild(nav);
  document.body.appendChild(navContainer);

  requestAnimationFrame(() => {
    const prevLeft = sessionStorage.getItem("prevNavLeft");
    const prevWidth = sessionStorage.getItem("prevNavWidth");

    if (prevLeft && prevWidth && activeElement) {
      indicator.style.transition = "none";
      indicator.style.transform = prevLeft;
      indicator.style.width = prevWidth;
      indicator.style.opacity = "1";

      setTimeout(() => {
        moveIndicator(activeElement, true);
        sessionStorage.removeItem("prevNavLeft");
        sessionStorage.removeItem("prevNavWidth");
      }, 30);
    } else if (activeElement) {
      moveIndicator(activeElement, false);
    }
  });

  window.addEventListener("resize", () => {
    if (activeElement) moveIndicator(activeElement, false);
  });
});