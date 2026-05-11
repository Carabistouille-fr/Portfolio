const PROFILE_PHOTO = "./assets/pp/pp.png";
const PROFILE_INITIAL = "L";
const PROFILE_NAME = "Léo · Dev & Designer";
const PROFILE_STATUS = "Disponible pour de nouveaux projets";

const QA = [
    {
        icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>`,
        q: "Quel type de projets préfères-tu ?",
        a: "Je préfère créer des sites web modernes et efficaces pour <strong>mettre en valeur</strong> des projets professionnels ainsi que des entreprises locales.",
    },
    {
        icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`,
        q: "Quelles sont tes disponibilités actuelles ?",
        a: "Je suis <strong>actuellement disponible</strong> pour travailler sur de nouveaux projets.",
    },
    {
        icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>`,
        q: "Tu fais quel type de sites web ?",
        a: "Je crée des <strong>sites web modernes</strong>, rapides et <strong>optimisés</strong> pour le référencement (SEO Google), afin d’améliorer la visibilité sur Google.",
    },
    {
        icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="21" x2="9" y2="9"/><line x1="15" y1="21" x2="15" y2="9"/></svg>`,
        q: "Pour qui crées-tu des sites web ?",
        a: "Je travaille principalement avec des <strong>entreprises locales</strong>, indépendants et petites structures qui veulent améliorer leur <strong>présence en ligne</strong>.",
    },
    {
        icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></svg>`,
        q: "Peux-tu m’aider à avoir plus de clients ?",
        a: "Oui, un site bien conçu <strong>améliore votre visibilité</strong> sur Google et permet d’attirer plus de clients.",
    },
    {
        icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
        q: "Comment vous contacter ?",
        a: "Vous pouvez me contacter via le <strong>formulaire</strong> en bas du site ou par email à <a href='mailto:leomagnien07@gmail.com'>leomagnien07@gmail.com</a>. Je vous répondrai <strong>rapidement</strong>.",
    },
];

let chatOpen = false;
let initialized = false;

if (PROFILE_PHOTO) {
    const av = document.getElementById("avatarEl");
    av.innerHTML = `<img src="${PROFILE_PHOTO}" alt="Photo de profil" style="
                                object-position: 100% 40%;
                            ">`;
} else {
    document.getElementById("avatarEl").textContent = PROFILE_INITIAL;
}

function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById("chatBtn").classList.toggle("open", chatOpen);
    document.getElementById("chatPanel").classList.toggle("visible", chatOpen);
    document.getElementById("chatToast").classList.toggle("hidden", chatOpen);

    if (chatOpen && !initialized) {
        initialized = true;
        initChat();
    }
}

function initChat() {
    addAI(
        "Bonjour ! 👋 Je suis l'assistant automatique de Léo. Choisissez une question ci-dessous, je suis là pour vous aider.",
    );
    renderQuestions();
}

function renderQuestions() {
    const list = document.getElementById("questionsList");
    list.innerHTML = "";
    QA.forEach((item, i) => {
        const btn = document.createElement("button");
        btn.className = "q-chip";
        btn.innerHTML = `${item.icon}<span>${item.q}</span>`;
        btn.onclick = () => askQuestion(i);
        list.appendChild(btn);
    });
}

function askQuestion(index) {
    const item = QA[index];
    addUser(item.q);

    const typingEl = addTyping();
    setTimeout(() => {
        typingEl.remove();
        addAI(item.a);
    }, 500);
}

function addUser(text) {
    const d = document.createElement("div");
    d.className = "msg user";
    d.innerHTML = `<div class="bubble">${esc(text)}</div>`;
    document.getElementById("messages").appendChild(d);
    scrollDown();
}

function addAI(html) {
    const d = document.createElement("div");
    d.className = "msg ai";
    d.innerHTML = `<div class="bubble">${html}</div>`;
    document.getElementById("messages").appendChild(d);
    scrollDown();
}

function addTyping() {
    const d = document.createElement("div");
    d.className = "typing-wrap";
    d.innerHTML = `<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
    document.getElementById("messages").appendChild(d);
    scrollDown();
    return d;
}

function scrollDown() {
    const m = document.getElementById("messages");
    setTimeout(() => (m.scrollTop = m.scrollHeight), 60);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatOpen) toggleChat();
});

function esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
