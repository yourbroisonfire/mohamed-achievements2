document.addEventListener("DOMContentLoaded", () => {

    console.log("Mohamed Ahmed Iskander Portfolio Loaded!");


    /* ================= REVEAL ANIMATIONS ================= */

    const revealElements = document.querySelectorAll(
        ".section, .achievement-card, .certificate-card, .preview-card, .video-card, .stat, .gallery-item"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* ================= IMAGE LIGHTBOX ================= */

    const images = document.querySelectorAll(
        ".achievement-image img, .certificate-card img, .preview-image img, .gallery-item img"
    );


    const lightbox = document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close image">
            ×
        </button>

        <img src="" alt="Expanded image">
    `;

    document.body.appendChild(lightbox);


    const lightboxImage = lightbox.querySelector("img");

    const closeButton =
        lightbox.querySelector(".lightbox-close");


    images.forEach(image => {

        image.addEventListener("click", () => {

            if (!image.complete || image.naturalWidth === 0) {
                return;
            }

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    function closeLightbox() {

        lightbox.classList.remove("active");

        lightboxImage.src = "";

        document.body.style.overflow = "";

    }


    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeLightbox();
            }

        }
    );


    /* ================= SCROLL TO TOP ================= */

    const scrollButton =
        document.createElement("button");

    scrollButton.className = "scroll-top";

    scrollButton.innerHTML = "↑";

    scrollButton.setAttribute(
        "aria-label",
        "Scroll to top"
    );

    document.body.appendChild(scrollButton);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            scrollButton.classList.add("show");

        } else {

            scrollButton.classList.remove("show");

        }

    });


    scrollButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* ================= IMAGE ERROR HANDLING ================= */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            console.warn(
                "Image could not be loaded:",
                image.src
            );

            image.classList.add("image-error");

        });

    });


    /* ================= VIDEO CONTROL ================= */

    document.querySelectorAll("video").forEach(video => {

        video.addEventListener("play", () => {

            document.querySelectorAll("video").forEach(otherVideo => {

                if (
                    otherVideo !== video &&
                    !otherVideo.paused
                ) {

                    otherVideo.pause();

                }

            });

        });

    });


    /* ================= SMOOTH ANCHORS ================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                targetId &&
                targetId !== "#"
            ) {

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }

        });

    });


    /* ================= ACTIVE PAGE ================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage =
            href
                .split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();


        if (
            linkPage &&
            linkPage === currentPage &&
            !href.includes("#")
        ) {

            link.classList.add("active");

        }

    });

});