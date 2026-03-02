document.addEventListener("DOMContentLoaded", () => {

    const textarea = document.querySelector("textarea");
    const formulaire_key = document.querySelector("#formulaire_contact");

    if (textarea && formulaire_key) {
        textarea.addEventListener("keydown", function (e) {
            if (e.ctrlKey && e.key === "Enter") {
                e.preventDefault();
                formulaire_key.submit();
            }
        });
    }

    const form = document.getElementById("my-form");

    if (!form) return;

    async function handleSubmit(event) {
        event.preventDefault();

        const status = document.getElementById("my-form-status");
        const data = new FormData(event.target);

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    if (status) status.innerHTML = "Thanks for your submission!";
                    form.reset();
                } else {
                    response.json().then((data) => {
                        if (status) {
                            if (Object.hasOwn(data, "errors")) {
                                status.innerHTML = data.errors
                                    .map((error) => error.message)
                                    .join(", ");
                            } else {
                                status.innerHTML =
                                    "Oops! There was a problem submitting your form";
                            }
                        }
                    });
                }
            })
            .catch(() => {
                const status = document.getElementById("my-form-status");
                if (status) {
                    status.innerHTML =
                        "Oops! There was a problem submitting your form";
                }
            });
    }

    form.addEventListener("submit", handleSubmit);

});