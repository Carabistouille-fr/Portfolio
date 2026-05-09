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
                    if (status)
                        status.innerHTML =
                            "Merci pour l'envoi du formulaire, je vous réponds sous peu !";
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
                                    "Il y a eu un problème avec l'envoi du formulaire.. essayer de me contacter par mail si ça ne fonctionne pas.. je règle ce problème au plus vite.";
                            }
                        }
                    });
                }
            })
            .catch(() => {
                const status = document.getElementById("my-form-status");
                if (status) {
                    status.innerHTML =
                        "Il y a eu un problème avec l'envoi du formulaire.. essayer de me contacter par mail si ça ne fonctionne pas.. je règle ce problème au plus vite.";
                }
            });
    }

    form.addEventListener("submit", handleSubmit);
});
