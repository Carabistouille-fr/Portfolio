const PROFILE_PHOTO = "../assets/pp/pp.png";
const PROFILE_INITIAL = "A";
const PROFILE_NAME = "Léo · Dev &amp; Designer";
const PROFILE_STATUS = "Disponible pour de nouveaux projets";

const QA = [
    {
        icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
        q: "QUESTION",
        a: "REPONSE",
    },
    {
        icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
        q: "QUESTION",
        a: "REPONSE",
    },
    {
        icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
        q: "QUESTION",
        a: "REPONSE",
    },
    {
        icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
        q: "QUESTION",
        a: "REPONSE",
    },
    {
        icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
        q: "QUESTION",
        a: "REPONSE",
    },
    {
        icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
        q: "Comment vous contacter ?",
        a: "Vous pouvez m'écrire via le <strong>formulaire</strong> en bas de ce site, ou bien en m'envoyant un mail directement à <a href='mailto:contact@leo-magnien.fr'>contact@leo-magnien.fr</a>. Je vous répondrez au plus <strong>vite</strong>.",
    },
];

// ══════════════════════════════════════════
let chatOpen = false;
let initialized = false;

if (PROFILE_PHOTO) {
    const av = document.getElementById("avatarEl");
    av.innerHTML = `<img src="${PROFILE_PHOTO}" alt="Photo de profil">`;
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
        "Bonjour ! 👋 Je suis l'assistant de Léo. Choisissez une question ci-dessous, je suis là pour vous aider.",
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
    // Typing indicator
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
